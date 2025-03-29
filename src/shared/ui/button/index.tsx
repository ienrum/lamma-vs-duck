import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/src/shared/config/theme/colors";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  color?: keyof typeof colors;
  containerClassName?: string;
  isSticker?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, containerClassName, variant = "default", size = "default", isLoading, color = "primary", children, isSticker = true, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {isSticker && (
          <>
            {/* 스티커 접힘 효과 */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-4 h-4 bg-black/10 rotate-12 z-10" />
          </>
        )}

        <ShadcnButton
          ref={ref}
          style={{
            backgroundColor: colors[color].DEFAULT,
            color: colors[color].text,
            borderColor: colors[color].border,
            boxShadow: colors[color].shadow,
          }}
          className={cn(
            "relative font-medium w-full",
            "hover:opacity-90 active:opacity-90",
            "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
            "active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]",
            "transition-all duration-200",
            "border-2",
            "rounded-sm",
            "select-none",
            "touch-manipulation",
            "overflow-hidden",
            "active:scale-[0.98]",
            "hover:scale-[1.02]",
            isLoading && "cursor-not-allowed opacity-70",
            className
          )}
          variant={variant}
          size={size}
          disabled={isLoading}
          {...props}
        >
          {/* 스티커 질감 효과 */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20" />

          {isLoading && (
            <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          )}
          <span className={cn(isLoading && "invisible")}>{children}</span>
        </ShadcnButton>
      </div>
    );
  }
);

Button.displayName = "Button"; 