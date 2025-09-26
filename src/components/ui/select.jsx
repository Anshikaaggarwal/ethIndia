import React from 'react';
import { cn } from '@/lib/utils';

export const Select = ({ value, onValueChange, children }) => {
  return <div className="relative inline-block w-full">{children}</div>;
};

export const SelectTrigger = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        'w-full px-4 py-2 rounded-md bg-gray-800 border border-green-500/30 text-white text-left',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

export const SelectContent = ({ className, children }) => {
  return <div className={cn('absolute mt-1 w-full bg-gray-800 rounded-md border border-green-500/30', className)}>{children}</div>;
};

export const SelectItem = ({ value, children }) => {
  return <div className="px-4 py-2 cursor-pointer hover:bg-green-500/20">{children}</div>;
};
