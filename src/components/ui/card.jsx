import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={cn('rounded-xl bg-gray-800/50 border border-green-500/20', className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};

export const CardHeader = ({ className, children }) => {
  return <div className={cn('p-4 border-b border-gray-700', className)}>{children}</div>;
};

export const CardTitle = ({ className, children }) => {
  return <h3 className={cn('text-lg font-bold', className)}>{children}</h3>;
};
