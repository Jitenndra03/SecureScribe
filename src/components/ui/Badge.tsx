import React from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ 
  className, 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": variant === 'default',
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300": variant === 'secondary',
          "border border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-100": variant === 'outline',
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": variant === 'success',
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": variant === 'warning',
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": variant === 'danger',
        },
        className
      )}
      {...props}
    />
  );
}