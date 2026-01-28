'use client';

// import Image from 'next/image'; // Uncomment when real images are available
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface StageImage {
  src: string;
  alt: string;
  aspectRatio: '16:9' | '4:3' | '3:1';
  frameStyle: 'browser' | 'ui-snippet' | 'photo';
}

interface Stage {
  number: number;
  title: string;
  description: string;
  clarification: string;
  image: StageImage;
}

const stages: Stage[] = [
  {
    number: 1,
    title: 'Browse and find a tour',
    description:
      'Explore our curated tours led by verified guides. Each tour displays its quorum, available spots, current interest, and commitment deadline.',
    clarification: 'All tour details are transparent upfront—no hidden mechanics or surprise requirements.',
    image: {
      src: '/images/how-it-works/step-1-browse-tours.jpg',
      alt: 'Screenshot of the Quorum Tours browse page showing available birding tours with their quorum status',
      aspectRatio: '16:9',
      frameStyle: 'browser',
    },
  },
  {
    number: 2,
    title: 'Express interest (no charge)',
    description:
      'Signal that you want this tour to happen. Your interest joins the aggregate count visible to everyone. No account required, no payment, no obligation.',
    clarification: "This is pure signal. You're saying \"I would go\" not \"I will go.\"",
    image: {
      src: '/images/how-it-works/step-2-express-interest.jpg',
      alt: 'Close-up of the Express Interest button on a tour detail page',
      aspectRatio: '4:3',
      frameStyle: 'ui-snippet',
    },
  },
  {
    number: 3,
    title: 'Commit to the tour',
    description:
      "Agree to join the tour if quorum is reached. You can commit to up to 3 tours at a time, as long as they're at least 2 weeks apart. Your commitment is conditional—it only becomes binding when quorum is reached.",
    clarification:
      "Your commitment count depends on your trust level. New members start with 3 slots. The strike system adjusts this based on your history.",
    image: {
      src: '/images/how-it-works/step-3-commit-payment.jpg',
      alt: 'Screenshot of the commitment page showing tour details',
      aspectRatio: '4:3',
      frameStyle: 'browser',
    },
  },
  {
    number: 4,
    title: 'Tour confirms when quorum reached',
    description:
      'Quorum is reached by the commitment deadline. The tour is now guaranteed to run. You have 24 hours to pay the balance. Your deposit is applied to the total.',
    clarification:
      'Confirmation means certainty for everyone—birders know the tour runs, operators know they have participants.',
    image: {
      src: '/images/how-it-works/step-4-quorum-reached.jpg',
      alt: 'Progress bar showing quorum has been reached with a confirmed status badge',
      aspectRatio: '3:1',
      frameStyle: 'ui-snippet',
    },
  },
  {
    number: 5,
    title: 'You go birding',
    description:
      'Join your confirmed tour with the guide and fellow birders. The tour runs as scheduled with the guaranteed group size.',
    clarification:
      'No last-minute cancellations. Everyone committed, everyone shows up, the tour happens.',
    image: {
      src: '/images/how-it-works/step-5-birding-experience.jpg',
      alt: 'Group of birders with binoculars enjoying a guided tour in natural habitat',
      aspectRatio: '16:9',
      frameStyle: 'photo',
    },
  },
];

// Aspect ratio mappings for responsive images
const aspectRatioClasses: Record<StageImage['aspectRatio'], string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '3:1': 'aspect-[3/1]',
};

// Frame style components for different image types
function ImageFrame({ image, stepNumber }: { image: StageImage; stepNumber: number }) {
  const aspectClass = aspectRatioClasses[image.aspectRatio];

  // Placeholder gradient based on step number for visual variety before real images
  const placeholderGradients = [
    'from-[var(--color-primary)]/10 to-[var(--color-primary)]/5',
    'from-[var(--color-accent)]/10 to-[var(--color-accent)]/5',
    'from-[var(--color-confirmed)]/10 to-[var(--color-confirmed)]/5',
    'from-[var(--color-forming)]/10 to-[var(--color-forming)]/5',
    'from-[var(--color-primary)]/10 to-[var(--color-accent)]/5',
  ];
  const gradient = placeholderGradients[stepNumber - 1];

  if (image.frameStyle === 'browser') {
    return (
      <div className="
        mt-[var(--space-lg)]
        rounded-[var(--radius-organic)]
        overflow-hidden
        border border-[var(--color-border)]
        shadow-[var(--shadow-card)]
        bg-[var(--color-surface-raised)]
      ">
        {/* Browser chrome */}
        <div className="
          flex items-center gap-[var(--space-xs)]
          px-[var(--space-sm)] py-[var(--space-xs)]
          bg-[var(--color-surface-sunken)]
          border-b border-[var(--color-border)]
        ">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <div className="
            flex-1 mx-[var(--space-md)]
            px-[var(--space-sm)] py-1
            bg-[var(--color-surface)]
            rounded text-[10px]
            text-[var(--color-ink-subtle)]
            text-center
            truncate
          ">
            quorumtours.com.au
          </div>
        </div>
        {/* Image area */}
        <div className={`${aspectClass} relative bg-gradient-to-br ${gradient}`}>
          <div className="
            absolute inset-0
            flex items-center justify-center
            text-[var(--color-ink-subtle)]
          ">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-[var(--text-xs)] opacity-60">Screenshot placeholder</span>
            </div>
          </div>
          {/* Uncomment when real images are available:
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          */}
        </div>
      </div>
    );
  }

  if (image.frameStyle === 'ui-snippet') {
    return (
      <div className={`
        mt-[var(--space-lg)]
        ${aspectClass}
        relative
        rounded-[var(--radius-organic)]
        overflow-hidden
        border-2 border-[var(--color-border)]
        border-dashed
        bg-gradient-to-br ${gradient}
      `}>
        <div className="
          absolute inset-0
          flex items-center justify-center
          text-[var(--color-ink-subtle)]
        ">
          <div className="text-center">
            <svg
              className="w-10 h-10 mx-auto mb-2 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            <span className="text-[var(--text-xs)] opacity-60">UI element</span>
          </div>
        </div>
        {/* Uncomment when real images are available:
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 500px"
        />
        */}
      </div>
    );
  }

  // Photo style - lifestyle images
  return (
    <div className={`
      mt-[var(--space-lg)]
      ${aspectClass}
      relative
      rounded-[var(--radius-organic)]
      overflow-hidden
      shadow-[var(--shadow-card)]
      bg-gradient-to-br ${gradient}
    `}>
      <div className="
        absolute inset-0
        flex items-center justify-center
        text-[var(--color-ink-subtle)]
      ">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto mb-2 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          <span className="text-[var(--text-xs)] opacity-60">Lifestyle photo</span>
        </div>
      </div>
      {/* Uncomment when real images are available:
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />
      */}
    </div>
  );
}

export function MechanicSection() {
  return (
    <section className="
      py-20
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header - center aligned */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-16 text-center">
            <h2 className="
              font-display
              text-[clamp(1.75rem,4vw,2.5rem)]
              leading-tight
              text-[var(--color-ink)]
              mb-[var(--space-md)]
            ">
              For Birders: Your Journey
            </h2>
            <p className="
              text-[var(--color-ink-muted)]
              text-[var(--text-base)]
            ">
              Five clear steps from browsing to birding. You control how far you go at each stage.
            </p>
          </div>
        </ScrollReveal>

        {/* Vertical timeline with images */}
        <div>
          {stages.map((stage, index) => (
            <ScrollReveal
              key={stage.number}
              variant="fade-up"
              delay={index * 100}
              duration={500}
            >
            <div className="relative">
              {/* Step container with horizontal layout */}
              <div className="flex gap-[var(--space-lg)]">
                {/* Number badge on left */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="
                    w-10 h-10
                    bg-[var(--color-primary)]
                    text-white
                    font-mono font-medium
                    rounded-full
                    flex items-center justify-center
                    text-base
                    flex-shrink-0
                  ">
                    {stage.number}
                  </div>

                  {/* Vertical connecting line */}
                  {index < stages.length - 1 && (
                    <div className="
                      w-0.5
                      flex-1
                      bg-[var(--color-border)]
                      my-[var(--space-sm)]
                      min-h-[var(--space-2xl)]
                    " aria-hidden="true" />
                  )}
                </div>

                {/* Content on right */}
                <div className="flex-1 pb-[var(--space-2xl)]">
                  <h3 className="
                    font-display
                    text-[clamp(1.25rem,3vw,1.5rem)]
                    leading-tight
                    text-[var(--color-ink)]
                    mb-[var(--space-sm)]
                  ">
                    {stage.title}
                  </h3>

                  <p className="
                    text-[var(--color-ink-muted)]
                    text-[var(--text-base)]
                    leading-relaxed
                    mb-[var(--space-md)]
                  ">
                    {stage.description}
                  </p>

                  <p className="
                    text-[var(--color-ink-subtle)]
                    text-[var(--text-sm)]
                    leading-relaxed
                    pl-[var(--space-md)]
                    border-l-2 border-[var(--color-border)]
                  ">
                    {stage.clarification}
                  </p>

                  {/* Visual image for this step */}
                  <div className="max-w-md">
                    <ImageFrame image={stage.image} stepNumber={stage.number} />
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Commitment limits clarification */}
        <ScrollReveal variant="fade-up" delay={500} duration={500}>
          <div className="
            mt-16
            p-8
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
          ">
            <p className="
              text-[var(--color-ink)]
              text-[var(--text-base)]
              font-medium
              mb-[var(--space-sm)]
            ">
              How many tours can I commit to?
            </p>
            <p className="text-[var(--color-ink-muted)] text-[var(--text-sm)] mb-[var(--space-md)]">
              You can commit to up to 3 tours at a time, provided they&apos;re at least 2 weeks apart.
              This ensures you can realistically attend each tour you commit to.
            </p>
            <p className="
              text-[var(--color-ink)]
              text-[var(--text-base)]
              font-medium
              mb-[var(--space-sm)]
            ">
              The strike system
            </p>
            <p className="text-[var(--color-ink-muted)] text-[var(--text-sm)]">
              Your commitment slots depend on your history. Members with no strikes can commit to 3 tours.
              One strike reduces this to 2 tours. Two strikes means you can only commit to 1 tour at a time.
              Strikes are issued for no-shows on confirmed tours—because when you don&apos;t show up,
              everyone else&apos;s experience is affected.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
