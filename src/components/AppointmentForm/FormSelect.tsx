import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  className?: string;
}

export function FormSelect({ label, name, options, required, className = '' }: FormSelectProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-800 mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full px-4 py-2 rounded bg-white border-0 focus:ring-2 focus:ring-primary"
        defaultValue=""
      >
        <option value="" disabled>Select the option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}