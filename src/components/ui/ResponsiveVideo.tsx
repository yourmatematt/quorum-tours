'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

function TextPoster({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-sunken)]">
      <div className="px-8 text-center">
        <p className="font-display text-[clamp(1.25rem,3vw,2rem)] leading-tight text-[var(--color-ink-muted)]">
          {title}
        </p>
      </div>
    </div>
  );
}

interface ResponsiveVideoProps {
  /** Video slug - maps to /videos/{slug}/{slug}-{aspect}.mp4 */
  slug: string;
  /** Accessible title for the video */
  title: string;
  /** Optional override for desktop poster */
  posterDesktop?: string;
  /** Optional override for mobile poster */
  posterMobile?: string;
  /** Optional className for the container */
  className?: string;
  /** Force a specific aspect ratio on all breakpoints */
  aspect?: 'responsive' | 'square' | 'video';
  /** Hide the title overlay */
  hideTitle?: boolean;
}

/**
 * ResponsiveVideo - Displays videos with responsive aspect ratios
 *
 * Desktop (md+): 16:9 aspect ratio
 * Mobile (<md): 1:1 aspect ratio
 *
 * Videos are lazy-loaded on user interaction (click to play).
 * Shows poster image until play is triggered.
 *
 * File structure expected:
 * /public/videos/{slug}/
 *   ├── {slug}-16x9.mp4       (desktop)
 *   ├── {slug}-1x1.mp4        (mobile)
 *   ├── poster-16x9.webp      (desktop thumbnail)
 *   └── poster-1x1.webp       (mobile thumbnail)
 */
export function ResponsiveVideo({
  slug,
  title,
  posterDesktop,
  posterMobile,
  className = '',
  aspect = 'responsive',
  hideTitle = false,
}: ResponsiveVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Construct paths
  const basePath = `/videos/${slug}`;
  const videoDesktop = `${basePath}/${slug}-16x9.mp4`;
  const videoMobile = `${basePath}/${slug}-1x1.mp4`;
  const defaultPosterDesktop = posterDesktop || `${basePath}/poster-16x9.webp`;
  const defaultPosterMobile = posterMobile || `${basePath}/poster-1x1.webp`;

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    // Small delay to ensure video element is mounted
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
    }, 100);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []);

  // Determine which video/poster to use based on aspect
  const useSquare = aspect === 'square';
  const useVideo = aspect === 'video';
  const videoSrc = useSquare ? videoMobile : videoDesktop;
  const posterSrc = useSquare ? defaultPosterMobile : defaultPosterDesktop;
  const aspectClass = useSquare ? 'aspect-square' : 'aspect-video';

  if (hasError) {
    return (
      <div className={`
        relative bg-[var(--color-surface-sunken)]
        rounded-[var(--radius-lg)] overflow-hidden
        ${className}
      `}>
        {aspect === 'responsive' ? (
          <>
            <div className="hidden md:block aspect-video" />
            <div className="md:hidden aspect-square" />
          </>
        ) : (
          <div className={aspectClass} />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[var(--color-ink-muted)] text-sm">
            Video unavailable
          </p>
        </div>
      </div>
    );
  }

  // Forced aspect ratio (square or video)
  if (aspect !== 'responsive') {
    return (
      <div className={`relative rounded-[var(--radius-lg)] overflow-hidden ${className}`}>
        <div className={`relative ${aspectClass} bg-[var(--color-surface-sunken)]`}>
          {!isPlaying ? (
            <>
              {posterError ? (
                <TextPoster title={title} />
              ) : (
                <Image
                  src={posterSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  onError={() => setPosterError(true)}
                />
              )}
              <button
                onClick={handlePlay}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  bg-black/20
                  cursor-pointer
                "
                aria-label={`Play video: ${title}`}
              >
                <div className="
                  w-16 h-16
                  rounded-full
                  bg-white/10
                  flex items-center justify-center
                  shadow-lg
                  transition-none
                ">
                  <svg
                    className="w-7 h-7 text-[var(--color-primary)] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              onEnded={handleVideoEnd}
              onError={handleVideoError}
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {!isPlaying && !hideTitle && (
          <div className="
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-black/60 to-transparent
            px-4 py-3
            pointer-events-none
          ">
            <p className="text-white text-sm font-medium truncate">
              {title}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Responsive aspect ratio — detect screen size and render a single video element
  return (
    <ResponsiveVideoPlayer
      title={title}
      videoDesktop={videoDesktop}
      videoMobile={videoMobile}
      defaultPosterDesktop={defaultPosterDesktop}
      defaultPosterMobile={defaultPosterMobile}
      className={className}
      hideTitle={hideTitle}
    />
  );
}

/**
 * Responsive video player that renders a single video element.
 * Detects screen size via matchMedia to pick the right source and aspect ratio.
 */
function ResponsiveVideoPlayer({
  title,
  videoDesktop,
  videoMobile,
  defaultPosterDesktop,
  defaultPosterMobile,
  className = '',
  hideTitle = false,
}: {
  title: string;
  videoDesktop: string;
  videoMobile: string;
  defaultPosterDesktop: string;
  defaultPosterMobile: string;
  className?: string;
  hideTitle?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
    }, 100);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []);

  const currentVideo = isMobile ? videoMobile : videoDesktop;
  const currentPoster = isMobile ? defaultPosterMobile : defaultPosterDesktop;
  const aspectClass = isMobile ? 'aspect-square' : 'aspect-video';

  if (hasError) {
    return (
      <div className={`relative bg-[var(--color-surface-sunken)] rounded-[var(--radius-lg)] overflow-hidden ${className}`}>
        <div className={aspectClass} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[var(--color-ink-muted)] text-sm">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-[var(--radius-lg)] overflow-hidden ${className}`}>
      <div className={`relative ${aspectClass} bg-[var(--color-surface-sunken)]`}>
        {!isPlaying ? (
          <>
            {posterError ? (
              <TextPoster title={title} />
            ) : (
              <Image
                src={currentPoster}
                alt={title}
                fill
                className="object-cover"
                sizes={isMobile ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                onError={() => setPosterError(true)}
              />
            )}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
              aria-label={`Play video: ${title}`}
            >
              <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16 lg:w-20 lg:h-20'} rounded-full bg-white/10 flex items-center justify-center shadow-lg transition-none`}>
                <svg
                  className={`${isMobile ? 'w-6 h-6' : 'w-6 h-6 lg:w-8 lg:h-8'} text-[var(--color-primary)] ml-1`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        ) : (
          <video
            ref={videoRef}
            src={currentVideo}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          >
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {!isPlaying && !hideTitle && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 pointer-events-none">
          <p className="text-white text-sm font-medium truncate">{title}</p>
        </div>
      )}
    </div>
  );
}
