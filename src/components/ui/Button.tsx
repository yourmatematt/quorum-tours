import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

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
    border-2 border-[var(--color-border-strong)]
    hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
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
  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-6 py-3
        font-medium text-base
        rounded-[var(--radius-md)]
        transition-all duration-[var(--transition-normal)]
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
