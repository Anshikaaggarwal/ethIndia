import React from 'react';
import { cn } from '@/lib/utils';

export const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
