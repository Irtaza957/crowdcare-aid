'use client';

import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

interface DatePickerProps {
  value: Date | Date[];
  onChange: (selectedDates: Date[]) => void;
  placeholder?: string;
  className?: string;
  options?: Record<string, any>;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  options = {},
  disabled = false,
}) => {
  // Convert Date or Date[] to a string representation
  const valueAsString = Array.isArray(value)
    ? value
        .map((date) => (date instanceof Date ? date.toISOString() : ''))
        .join(',')
    : value instanceof Date
    ? value.toISOString()
    : '';

  return (
    <Flatpickr
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
      render={({ defaultValue, ...props }, ref) => {
        // Explicitly define an empty onChange handler
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          // No need to handle the event here as Flatpickr manages the change
        };

        return (
          <input
            {...props}
            ref={ref}
            defaultValue={defaultValue}
            value={valueAsString}
            placeholder={placeholder}
            disabled={disabled}
            className={`block w-full bg-white h-12 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500 ${
              disabled ? 'text-[#858585] cursor-not-allowed' : ''
            } ${className}`}
            onChange={handleChange} // Set an empty change handler
          />
        );
      }}
    />
  );
};

export default DatePicker;
