'use client';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import default styles if needed

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter phone number',
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <PhoneInput
        value={value}
        onChange={onChange}
        inputClass={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
          disabled ? 'text-[#858585] cursor-not-allowed' : ''
        } ${className}`}
        containerClass={`flex bg-white w-full h-12`}
        dropdownClass={`z-10`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneInputComponent;
