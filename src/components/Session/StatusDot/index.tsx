import React from 'react'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'red' | 'green' | 'blue' | 'yellow'
}

export const StatusDot: React.FC<Props> = ({ size = 'md', color = 'green' }) => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  }

  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
  }

  return (
    <div
      className={`ml-auto rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-2 border-white dark:border-gray-800 animate-pulse`}
      aria-label={`${color} status dot`}></div>
  )
}
