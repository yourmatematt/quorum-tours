'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

interface ProfilePhotoCropModalProps {
  file: File;
  onSave: (croppedBlob: Blob) => Promise<void>;
  onClose: () => void;
}

const CANVAS_SIZE = 600; // output px
const CIRCLE_RADIUS_RATIO = 0.38; // circle radius as fraction of viewport

export function ProfilePhotoCropModal({ file, onSave, onClose }: ProfilePhotoCropModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Load image from file
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);

      // Auto-fit: scale so the smaller dimension fills the circle
      const container = containerRef.current;
      if (!container) return;
      const viewSize = Math.min(container.clientWidth, container.clientHeight);
      const circleD = viewSize * CIRCLE_RADIUS_RATIO * 2;
      const scale = circleD / Math.min(img.width, img.height);
      setZoom(scale);
    };
    img.src = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(img.src);
  }, [file]);

  // Draw preview
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    if (!canvas || !container || !img) return;

    const viewW = container.clientWidth;
    const viewH = container.clientHeight;
    canvas.width = viewW;
    canvas.height = viewH;

    const ctx = canvas.getContext('2d')!;
    const cx = viewW / 2;
    const cy = viewH / 2;
    const circleR = Math.min(viewW, viewH) * CIRCLE_RADIUS_RATIO;

    // Draw image centered + offset + zoom
    const drawW = img.width * zoom;
    const drawH = img.height * zoom;
    const drawX = cx - drawW / 2 + offset.x;
    const drawY = cy - drawH / 2 + offset.y;

    ctx.clearRect(0, 0, viewW, viewH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Dim outside circle
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, viewW, viewH);
    ctx.arc(cx, cy, circleR, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fill();
    ctx.restore();

    // Circle border
    ctx.beginPath();
    ctx.arc(cx, cy, circleR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [zoom, offset]);

  useEffect(() => {
    if (imgLoaded) draw();
  }, [imgLoaded, draw]);

  // Mouse/touch drag handlers
  function handlePointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  // Zoom with scroll wheel
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.02 : 0.02;
    setZoom((prev) => Math.max(0.1, Math.min(5, prev + delta)));
  }

  function handleZoomChange(value: number) {
    setZoom(Math.max(0.1, Math.min(5, value)));
  }

  async function handleSave() {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    setIsSaving(true);

    const viewW = container.clientWidth;
    const viewH = container.clientHeight;
    const cx = viewW / 2;
    const cy = viewH / 2;
    const circleR = Math.min(viewW, viewH) * CIRCLE_RADIUS_RATIO;

    // Create output canvas at CANVAS_SIZE x CANVAS_SIZE
    const out = document.createElement('canvas');
    out.width = CANVAS_SIZE;
    out.height = CANVAS_SIZE;
    const octx = out.getContext('2d')!;

    // Clip to circle
    octx.beginPath();
    octx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
    octx.clip();

    // Map from view coords to output coords
    const scale = CANVAS_SIZE / (circleR * 2);
    const drawW = img.width * zoom * scale;
    const drawH = img.height * zoom * scale;
    const drawX = (cx - img.width * zoom / 2 + offset.x - (cx - circleR)) * scale;
    const drawY = (cy - img.height * zoom / 2 + offset.y - (cy - circleR)) * scale;

    octx.drawImage(img, drawX, drawY, drawW, drawH);

    // Try WebP first, fall back to JPEG (Safari doesn't support WebP canvas encoding)
    function tryExport(mime: string, quality: number) {
      out.toBlob(
        async (blob) => {
          if (!blob && mime === 'image/webp') {
            // WebP not supported, fall back to JPEG
            tryExport('image/jpeg', 0.9);
            return;
          }
          if (!blob) {
            setIsSaving(false);
            return;
          }
          try {
            await onSave(blob);
          } finally {
            setIsSaving(false);
          }
        },
        mime,
        quality,
      );
    }
    tryExport('image/webp', 0.85);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-[var(--color-surface)] rounded-[var(--radius-organic)] shadow-xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <h2 className="font-display text-lg text-[var(--color-ink)]">Edit photo</h2>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas area */}
        <div
          ref={containerRef}
          className="relative w-full bg-[var(--color-ink)] cursor-grab active:cursor-grabbing select-none"
          style={{ aspectRatio: '4 / 3' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-3 px-5 py-3 border-t border-[var(--color-border)]">
          <ZoomOut className="w-4 h-4 text-[var(--color-ink-muted)] shrink-0" />
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.01"
            value={zoom}
            onChange={(e) => handleZoomChange(Number(e.target.value))}
            className="flex-1 accent-[var(--color-primary)]"
            aria-label="Zoom"
          />
          <ZoomIn className="w-4 h-4 text-[var(--color-ink-muted)] shrink-0" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !imgLoaded}
            className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              'Save photo'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
