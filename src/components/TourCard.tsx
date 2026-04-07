'use client';

import { ConfirmationStatusBadge } from './ui/ConfirmationStatusBadge';
import { QuorumProgressBar } from './ui/QuorumProgressBar';
import Image from 'next/image';
import { useState } from 'react';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface TourCardProps {
  title: string;
  operatorName: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  quorum: number;
  capacity: number;
  date: string;
  location: string;
  href?: string;
  speciesHighlight?: string;
  /** Tour image - place in /public/images/tours/ */
  image?: string;
}

export function TourCard({
  title,
  operatorName,
  status,
  currentParticipants,
  quorum,
  capacity,
  date,
  location,
  href = '#',
  speciesHighlight,
  image,
}: TourCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = image && !imageError;

  return (
    <a
      href={href}
      className="
        block
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        overflow-hidden
        transition-all duration-200
        hover:border-[var(--color-primary)]
        hover:shadow-[var(--shadow-card-hover)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        group
      "
    >
      {/* Tour image */}
      {showImage && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={image}
            alt={`${title} - ${location}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
          {/* Status badge overlaid on image */}
          <div className="absolute top-3 left-3">
            <ConfirmationStatusBadge status={status} />
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Status - Only show here if no image */}
        {!showImage && (
          <div className="mb-4">
            <ConfirmationStatusBadge status={status} />
          </div>
        )}

        {/* Title */}
        <h3 className="
          font-display text-xl font-semibold text-[var(--color-ink)]
          mb-2
          group-hover:text-[var(--color-primary)]
          transition-colors duration-200
        ">
          {title}
        </h3>

        {/* Operator */}
        <p className="text-sm text-[var(--color-ink-muted)] mb-4">
          with {operatorName}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-ink-subtle)] mb-6">
          <span>{date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{location}</span>
        </div>

        {/* Species pills - optional */}
        {speciesHighlight && (() => {
          const allSpecies = speciesHighlight.split(',').map(s => s.trim()).filter(Boolean);
          const visible = allSpecies.slice(0, 3);
          const overflow = allSpecies.length - visible.length;
          return (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {visible.map(species => (
                <span
                  key={species}
                  className="px-2 py-0.5 text-xs bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-[var(--radius-sm)]"
                >
                  {species}
                </span>
              ))}
              {overflow > 0 && (
                <span className="px-2 py-0.5 text-xs bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] rounded-[var(--radius-sm)]">
                  +{overflow} more
                </span>
              )}
            </div>
          );
        })()}

        {/* Progress - Non-urgent display */}
        <QuorumProgressBar
          current={currentParticipants}
          quorum={quorum}
          capacity={capacity}
        />
      </div>
    </a>
  );
}
