import React from "react";

interface ProgressBarProps {
  progress: number; // Progress value between 0 and 100
  color: string; // Color based on RangeDiseaseRisk enum
}


export enum RangeColorDiseaseRisk {
  low = '#A5D1B0',
  medium = '#FEDC86',
  high = '#FFA1A1',
}

// Calculate progress based on the range values
export const calculateProgress = (rangeRisk: string): number => {
  switch (rangeRisk) {
    case 'low':
      return 33.33;
    case 'medium':
      return 66.66;
    case 'high':
      return 100;
    default:
      return 0;
  }
};

export function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <div className="w-full h-[8px] bg-gray-50 rounded-md overflow-hidden">
      <div
        className="h-full"
        style={{ width: `${progress}%`, backgroundColor: color }}
      >
        {/* Display risk text inside the progress bar */}
        <span className="absolute top-0 left-0 text-xs text-black px-1">
          {color}
        </span>
      </div>
    </div>
  );
}