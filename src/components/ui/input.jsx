import React from 'react';
import { cn } from '@/lib/utils';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'w-full px-4 py-2 rounded-md bg-gray-800 border border-green-500/30 text-white placeholder-gray-400',
        className
      )}
      {...props}
    />
  );
};
