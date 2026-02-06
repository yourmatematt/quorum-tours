'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

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
}: ResponsiveVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
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

  if (hasError) {
    return (
      <div className={`
        relative bg-[var(--color-surface-sunken)]
        rounded-[var(--radius-lg)] overflow-hidden
        ${className}
      `}>
        {/* Desktop aspect ratio */}
        <div className="hidden md:block aspect-video" />
        {/* Mobile aspect ratio */}
        <div className="md:hidden aspect-square" />

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[var(--color-ink-muted)] text-sm">
            Video unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-[var(--radius-lg)] overflow-hidden ${className}`}>
      {/* Desktop container - 16:9 */}
      <div className="hidden md:block">
        <div className="relative aspect-video bg-[var(--color-surface-sunken)]">
          {!isPlaying ? (
            <>
              {/* Poster image */}
              <Image
                src={defaultPosterDesktop}
                alt={title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              {/* Play button overlay */}
              <button
                onClick={handlePlay}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  bg-black/20 hover:bg-black/30
                  transition-colors duration-200
                  group cursor-pointer
                "
                aria-label={`Play video: ${title}`}
              >
                <div className="
                  w-16 h-16 lg:w-20 lg:h-20
                  rounded-full
                  bg-white/90 group-hover:bg-white
                  flex items-center justify-center
                  shadow-lg
                  transition-all duration-200
                  group-hover:scale-105
                ">
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--color-primary)] ml-1"
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
              src={videoDesktop}
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
      </div>

      {/* Mobile container - 1:1 */}
      <div className="md:hidden">
        <div className="relative aspect-square bg-[var(--color-surface-sunken)]">
          {!isPlaying ? (
            <>
              {/* Poster image */}
              <Image
                src={defaultPosterMobile}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Play button overlay */}
              <button
                onClick={handlePlay}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  bg-black/20 hover:bg-black/30
                  transition-colors duration-200
                  group cursor-pointer
                "
                aria-label={`Play video: ${title}`}
              >
                <div className="
                  w-14 h-14
                  rounded-full
                  bg-white/90 group-hover:bg-white
                  flex items-center justify-center
                  shadow-lg
                  transition-all duration-200
                  group-hover:scale-105
                ">
                  <svg
                    className="w-6 h-6 text-[var(--color-primary)] ml-1"
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
              src={videoMobile}
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
      </div>

      {/* Video title - visible below poster */}
      {!isPlaying && (
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
