import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-[14px] border border-gray-200 p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ className = '', children, ...props }: CardProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  )
}
