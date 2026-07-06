import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import type * as React from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{
      error: <OctagonXIcon className="size-4" />,
      info: <InfoIcon className="size-4" />,
      loading: <Loader2Icon className="size-4 animate-spin" />,
      success: <CircleCheckIcon className="size-4" />,
      warning: <TriangleAlertIcon className="size-4" />,
    }}
    style={
      {
        '--normal-bg': 'var(--popover)',
        '--normal-border': 'var(--border)',
        '--normal-text': 'var(--popover-foreground)',
      } as React.CSSProperties
    }
    {...props}
  />
);

export { Toaster };
