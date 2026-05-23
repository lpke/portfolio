import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '@/components/skills/shared';

/** Visual treatment. Default: `primary`. */
export type ButtonVariant = 'primary' | 'secondary';
/** Shared button scale. Default: `md`. */
export type ButtonSize = 'sm' | 'md';

type ButtonBaseProps = {
  /** Button or link label/content. */
  children: ReactNode;
  /** Visual treatment. Default: `primary`. Example: `variant="secondary"`. */
  variant?: ButtonVariant;
  /** Shared button scale. Default: `md`. Example: `size="sm"` for header CTAs. */
  size?: ButtonSize;
  /** Extra classes appended after shared variant and size classes. Default: none. */
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Omit `href` to render a native `<button>`. Default: button element. */
    href?: undefined;
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** URL for rendering the component as an `<a>`. Example: `href="https://example.com"`. */
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const BUTTON_VARIANT_CLASS_NAMES = {
  primary:
    'signature-gradient text-on-primary hover:shadow-[0_0_18px_rgba(123,208,255,0.32)] focus-visible:ring-primary/35',
  secondary:
    'border border-primary/45 text-primary hover:border-primary/70 hover:bg-primary/8 focus-visible:ring-primary/35',
} as const satisfies Record<ButtonVariant, string>;
const BUTTON_SIZE_CLASS_NAMES = {
  sm: 'min-h-10 px-6 py-2 text-sm',
  md: 'min-h-12 px-7 py-3 text-base',
} as const satisfies Record<ButtonSize, string>;

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className } = props;
  const classNames = cx(
    'font-headline inline-flex cursor-pointer items-center justify-center rounded-full font-bold transition-all selection:bg-white/25 selection:text-current active:scale-95 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-50 disabled:active:scale-100',
    BUTTON_VARIANT_CLASS_NAMES[variant],
    BUTTON_SIZE_CLASS_NAMES[size],
    className,
  );

  if ('href' in props && props.href) {
    const anchorProps = {
      ...props,
    } as Omit<ButtonAsAnchorProps, 'variant'> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
    };

    delete anchorProps.variant;
    delete anchorProps.size;

    return (
      <a {...anchorProps} className={classNames}>
        {children}
      </a>
    );
  }

  const buttonProps = {
    ...props,
  } as Omit<ButtonAsButtonProps, 'variant'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  };

  delete buttonProps.variant;
  delete buttonProps.size;

  return (
    <button {...buttonProps} className={classNames}>
      {children}
    </button>
  );
}
