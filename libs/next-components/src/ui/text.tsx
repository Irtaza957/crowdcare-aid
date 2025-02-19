import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@crowdcareaid-frontend/utils';

const textVariants = cva('select-none transition-colors', {
  variants: {
    variant: {
      primary: 'text-black text-3xl font-bold font-pt_serif',
      secondary: 'text-[#858585] text-base font-medium font-poppins',
      danger: 'text-red-600 font-semibold',
      sub: 'text-[#858585] text-sm font-normal font-poppins',
      success: 'text-green-600 font-semibold',
      warning: 'text-yellow-600 font-semibold',
      profile: 'text-xl text-black font-bold font-pt_serif',
      edit: 'text-sm font-normal font-poppins text-black',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {}

const Text: React.FC<TextProps> = ({ className, variant, ...props }) => {
  return (
    <span className={cn(textVariants({ variant, className }))} {...props} />
  );
};

Text.displayName = 'Text';

export { Text, textVariants };
