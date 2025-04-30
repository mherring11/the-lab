import React from 'react';

interface ProgressChartProps {
  data: {
    label: string;
    value: number;
    max: number;
    color: string;
  }[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-sm font-medium text-gray-700">
              {item.value}/{item.max}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${item.color} h-2.5 rounded-full`}
              style={{ width: `${(item.value / item.max) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}