import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-accent)]
    text-white
    border-2 border-transparent
    hover:bg-[var(--color-accent-hover)]
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
  `,
  secondary: `
    bg-transparent
    text-[var(--color-ink)]
    border-2 border-[var(--color-ink-muted)]
    hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
  `,
  ghost: `
    bg-transparent
    text-[var(--color-ink-muted)]
    border-2 border-transparent
    hover:text-[var(--color-accent)]
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
  `,
};

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sharedClasses = `
    inline-flex items-center justify-center
    px-6 py-3
    min-h-[48px]
    font-medium text-base text-left
    rounded-[var(--radius-md)]
    transition-all duration-[var(--transition-normal)]
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${className}
  `;

  // Render as anchor if href is provided
  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a
        href={href}
        className={sharedClasses}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      className={sharedClasses}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  );
}
