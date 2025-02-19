'use client';

import * as React from 'react';
import { cn } from '@crowdcareaid-frontend/utils';
import { SVGS } from '@crowdcareaid-frontend/assets';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  passcode?: boolean;
  isSearch?: boolean;
  isTable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', passcode, isTable, isSearch, ...props },
    ref
  ) => {
    const [showPasscode, setShowPasscode] = React.useState(false);

    const toggleShowPasscode = () => setShowPasscode(!showPasscode);

    const inputRef = React.useRef();

    const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (inputRef.current) {
        console.log('searched for ===', inputRef.current?.value);
      }
    };

    return (
      <div className="relative">
        {isSearch ? (
          <input
            type={type}
            className={cn(
              'flex h-10 w-[260px] rounded-[25px] bg-[#F0F4F7] bg-opacity-55 px-6 py-3 text-sm placeholder:text-[#858585] focus:outline-none border-none',
              'font-poppins',
              className
            )}
            ref={ref}
            {...props}
          />
        ) : isTable ? (
          <input
            type="text"
            className={cn(
              'flex h-12 w-full rounded-[10px] bg-transparent px-4 py-3 text-sm font-normal placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border',
              'font-poppins',
              className
            )}
            ref={ref}
            {...props}
          />
        ) : (
          <input
            type={passcode ? (showPasscode ? 'text' : 'password') : type}
            className={cn(
              'flex h-12 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-[#efefef]',
              'font-poppins',
              className
            )}
            ref={ref}
            {...props}
          />
        )}

        {passcode && (
          <button
            type="button"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={toggleShowPasscode}
          >
            {showPasscode ? <SVGS.ShowPassword /> : <SVGS.HidePassword />}{' '}
            {/* Replace with an icon if preferred */}
          </button>
        )}

        {isSearch && (
          <button
            type="button"
            className="absolute right-[23px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleSearchClick}
          >
            <SVGS.Search width={20} />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
