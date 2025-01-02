import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
}

export function FormTextarea({ label, name, required, className = '' }: FormTextareaProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-800 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={4}
        className="w-full px-4 py-2 rounded bg-white border-0 focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}