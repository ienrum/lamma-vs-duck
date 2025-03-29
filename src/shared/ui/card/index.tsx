import { Card as ShadcnCard, CardHeader as ShadcnCardHeader, CardTitle as ShadcnCardTitle, CardDescription as ShadcnCardDescription, CardContent as ShadcnCardContent, CardFooter as ShadcnCardFooter } from "@/components/ui/card";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/src/shared/config/theme/colors";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
  color?: keyof typeof colors;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", color = "primary", children, ...props }, ref) => {
    return (
      <div className="relative">
        {/* 스티커 접힘 효과 */}
        <div className="absolute -right-1 -top-1 w-4 h-4 bg-black/10 rotate-12 z-10" />
        <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-black/10 -rotate-12 z-10" />
        <div className="absolute -left-1 -top-1 w-4 h-4 bg-black/10 -rotate-12 z-10" />
        <div className="absolute -left-1 -bottom-1 w-4 h-4 bg-black/10 rotate-12 z-10" />

        <ShadcnCard
          ref={ref}
          style={{
            backgroundColor: colors[color].DEFAULT,
            borderColor: colors[color].border,
            boxShadow: colors[color].shadow,
          }}
          className={cn(
            "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
            "transition-all duration-200",
            "border-2",
            "rounded-sm",
            "overflow-hidden",
            className
          )}
          {...props}
        >
          {/* 스티커 질감 효과 */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20" />
          {children}
        </ShadcnCard>
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnCardHeader
        ref={ref}
        className={cn("border-b-2 border-black", className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnCardTitle
        ref={ref}
        className={cn("text-black", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnCardDescription
        ref={ref}
        className={cn("text-black/70", className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnCardContent
        ref={ref}
        className={cn("pt-0", className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnCardFooter
        ref={ref}
        className={cn("pt-0", className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter"; 