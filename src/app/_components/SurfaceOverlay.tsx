import type { ComponentPropsWithoutRef } from 'react';

const SURFACE_OVERLAY_BASE_CLASS_NAME = 'pointer-events-none absolute inset-0';

type SurfaceOverlayProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'aria-hidden' | 'children'
>;

export function SurfaceOverlay({
  className,
  ...props
}: SurfaceOverlayProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={
        className
          ? `${SURFACE_OVERLAY_BASE_CLASS_NAME} ${className}`
          : SURFACE_OVERLAY_BASE_CLASS_NAME
      }
    />
  );
}
