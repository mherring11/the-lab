import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  className?: string;
}

export function FormInput({ label, type, name, required, className = '' }: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-800 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className="w-full px-4 py-2 rounded bg-white border-0 focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}