'use client';

import {
  Label as LabelPrimitive,
  LabelContext,
  type LabelProps,
} from 'react-aria-components';

import { cn } from '@/utils/styles';

function Label({ className, htmlFor, slot, ...props }: LabelProps) {
  const label = (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        'cn-label cn-label-aria flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
        className,
      )}
      htmlFor={htmlFor}
      slot={slot}
      {...props}
    />
  );

  if (htmlFor && slot === undefined) {
    return <LabelContext value={null}>{label}</LabelContext>;
  }

  return label;
}

export { Label };
