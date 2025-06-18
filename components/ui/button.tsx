import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-bold transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border-4 border-black',
  {
    variants: {
      variant: {
        default: 'comic-blue text-white hover:brightness-110 comic-shadow comic-shadow-hover comic-shadow-active',
        destructive: 'comic-red text-white hover:brightness-110 comic-shadow comic-shadow-hover comic-shadow-active',
        outline:
          'bg-white text-black hover:bg-blue-500 hover:text-white comic-shadow comic-shadow-hover comic-shadow-active',
        secondary: 'comic-yellow text-black hover:brightness-110 comic-shadow comic-shadow-hover comic-shadow-active',
        ghost: 'bg-white text-black hover:bg-blue-500 hover:text-white border-2 border-black',
        link: 'text-black underline-offset-4 hover:underline border-none shadow-none',
        success: 'comic-green text-white hover:brightness-110 comic-shadow comic-shadow-hover comic-shadow-active',
        warning: 'comic-orange text-white hover:brightness-110 comic-shadow comic-shadow-hover comic-shadow-active',
      },
      size: {
        default: 'h-12 px-6 text-lg',
        sm: 'h-10 px-4 text-base',
        lg: 'h-16 px-8 text-xl',
        icon: 'h-12 w-12 [&>svg]:h-6 [&>svg]:w-6',
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
