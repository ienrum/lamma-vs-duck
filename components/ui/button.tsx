import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 [&>svg]:hover:scale-110 [&>svg]:transition-transform',
        destructive:
          'bg-destructive text-destructive-foreground hover:opacity-90 hover:shadow-lg [&>svg]:hover:scale-110 [&>svg]:transition-transform',
        outline:
          'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground [&>svg]:hover:text-primary [&>svg]:hover:scale-110 [&>svg]:transition-all',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md [&>svg]:hover:scale-110 [&>svg]:transition-transform',
        ghost:
          'hover:bg-accent hover:text-accent-foreground [&>svg]:hover:text-primary [&>svg]:hover:scale-110 [&>svg]:transition-all',
        link: 'text-primary underline-offset-4 hover:underline [&>svg]:hover:scale-110 [&>svg]:transition-transform',
      },
      size: {
        default: 'h-11 px-6 text-base',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5 hover:[&>svg]:h-[22px] hover:[&>svg]:w-[22px] [&>svg]:transition-all',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSticker?: boolean;
  containerClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isSticker = false, containerClassName, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const button = <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;

    if (isSticker) {
      return (
        <div className={cn('relative', containerClassName)}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20" />
          {button}
        </div>
      );
    }

    return button;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
