'use client';

import { useState } from 'react';

interface ShareTourProps {
  tourName: string;
  tourDate: string;
  tourLocation: string;
  operatorName: string;
  targetSpecies: string;
  spotsNeeded: number;
  tourUrl: string;
  sharerName?: string;
}

// Generate share content for each platform
function generateShareContent(props: ShareTourProps) {
  const {
    tourName,
    tourDate,
    tourLocation,
    operatorName,
    targetSpecies,
    spotsNeeded,
    tourUrl,
  } = props;

  const spotsText = spotsNeeded === 1 ? '1 more person' : `${spotsNeeded} more people`;

  // X (Twitter) - Keep under 200 chars to leave room for URL
  const xText = `Heading out ${tourDate} to spot ${targetSpecies} at ${tourLocation} with ${operatorName}. Need ${spotsText}.`;

  // Messenger - Direct message with link
  const messengerText = `I'm joining ${operatorName}'s ${tourName} tour on ${tourDate} at ${tourLocation}, and ${spotsText} are welcome to come along. We're looking for ${targetSpecies}. If you're interested, details here:`;

  // WhatsApp - Personal, direct
  const whatsappText = `Hey, joining a birding tour ${tourDate} at ${tourLocation} with ${operatorName}. We're tracking ${targetSpecies}. Need ${spotsText} for it to run. You keen? ${tourUrl}`;

  // Email
  const emailSubject = `Join us for ${tourName} on ${tourDate}`;
  const emailBody = `Hi,

I'm heading out on a birding tour ${tourDate} at ${tourLocation} and thought you might be interested.

The tour is led by ${operatorName} and we're specifically looking to see ${targetSpecies}. It's a good opportunity if you've been wanting to get out and explore the area properly.

We just need ${spotsText} to confirm the booking. If you're keen, you can sign up here: ${tourUrl}

Cheers`;

  return {
    x: xText,
    messenger: messengerText,
    whatsapp: whatsappText,
    emailSubject,
    emailBody,
  };
}

// Build share URLs for each platform
function buildShareUrls(content: ReturnType<typeof generateShareContent>, tourUrl: string) {
  const encodedUrl = encodeURIComponent(tourUrl);

  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.x)}&url=${encodedUrl}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=966242223397117&redirect_uri=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(content.whatsapp)}`,
    email: `mailto:?subject=${encodeURIComponent(content.emailSubject)}&body=${encodeURIComponent(content.emailBody)}`,
  };
}

export function ShareTour(props: ShareTourProps) {
  const [copied, setCopied] = useState(false);
  const content = generateShareContent(props);
  const urls = buildShareUrls(content, props.tourUrl);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(props.tourUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = props.tourUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: props.tourName,
          text: content.x,
          url: props.tourUrl,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="
      p-[var(--space-lg)]
      bg-[var(--color-surface-raised)]
      border-2 border-[var(--color-border)]
      rounded-[var(--radius-organic)]
    ">
      <h3 className="
        font-display
        text-[var(--text-lg)]
        text-[var(--color-ink)]
        mb-[var(--space-sm)]
      ">
        Help this tour reach quorum
      </h3>
      <p className="
        text-[var(--text-sm)]
        text-[var(--color-ink-muted)]
        mb-[var(--space-lg)]
      ">
        This tour needs {props.spotsNeeded} more {props.spotsNeeded === 1 ? 'person' : 'people'} to run.
        Know someone who&apos;d be interested?
      </p>

      {/* Share buttons */}
      <div className="flex flex-wrap gap-[var(--space-sm)]">
        {/* Native share button (mobile) */}
        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="
              inline-flex items-center gap-[var(--space-sm)]
              px-[var(--space-md)] py-[var(--space-sm)]
              bg-[var(--color-primary)]
              text-white
              font-medium text-[var(--text-sm)]
              rounded-[var(--radius-organic)]
              hover:opacity-90
              transition-opacity
              min-h-[44px]
            "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        )}

        {/* X (Twitter) */}
        <a
          href={urls.x}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-[var(--space-sm)]
            px-[var(--space-md)] py-[var(--space-sm)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            text-[var(--color-ink)]
            font-medium text-[var(--text-sm)]
            rounded-[var(--radius-organic)]
            hover:border-[var(--color-primary)]
            hover:text-[var(--color-primary)]
            transition-colors
            min-h-[44px]
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </a>

        {/* Messenger */}
        <a
          href={urls.messenger}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-[var(--space-sm)]
            px-[var(--space-md)] py-[var(--space-sm)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            text-[var(--color-ink)]
            font-medium text-[var(--text-sm)]
            rounded-[var(--radius-organic)]
            hover:border-[var(--color-primary)]
            hover:text-[var(--color-primary)]
            transition-colors
            min-h-[44px]
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.2l3.13 3.259L19.76 8.2l-6.567 6.763z"/>
          </svg>
          Messenger
        </a>

        {/* WhatsApp */}
        <a
          href={urls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-[var(--space-sm)]
            px-[var(--space-md)] py-[var(--space-sm)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            text-[var(--color-ink)]
            font-medium text-[var(--text-sm)]
            rounded-[var(--radius-organic)]
            hover:border-[var(--color-primary)]
            hover:text-[var(--color-primary)]
            transition-colors
            min-h-[44px]
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>

        {/* Email */}
        <a
          href={urls.email}
          className="
            inline-flex items-center gap-[var(--space-sm)]
            px-[var(--space-md)] py-[var(--space-sm)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            text-[var(--color-ink)]
            font-medium text-[var(--text-sm)]
            rounded-[var(--radius-organic)]
            hover:border-[var(--color-primary)]
            hover:text-[var(--color-primary)]
            transition-colors
            min-h-[44px]
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          Email
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="
            inline-flex items-center gap-[var(--space-sm)]
            px-[var(--space-md)] py-[var(--space-sm)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            text-[var(--color-ink)]
            font-medium text-[var(--text-sm)]
            rounded-[var(--radius-organic)]
            hover:border-[var(--color-primary)]
            hover:text-[var(--color-primary)]
            transition-colors
            min-h-[44px]
          "
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
