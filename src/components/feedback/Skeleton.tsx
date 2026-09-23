import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'rect';
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  count = 1,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'text':
        return 'h-4 rounded-md';
      case 'card':
        return 'h-48 rounded-xl';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={`skel-${i}`}
          className={`animate-pulse bg-[#EAEFF5] dark:bg-[#0E3A66]/40 ${getVariantStyles()} ${className}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
};
