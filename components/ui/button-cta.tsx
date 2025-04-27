import * as React from "react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    className?: string;
    children?: React.ReactNode;
}

function ButtonCta({ label = "Get Access", className, children, ...props }: ButtonCtaProps) {
    return (
        <Button
            variant="default"
            className={cn(
                "group relative w-1/2 px-4 py-6 text-lg overflow-hidden transition-all duration-300 bg-pink-700 hover:bg-pink-800",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 rounded-lg bg-pink-700 hover:bg-pink-800 transition-colors" />
            

            <div className="relative flex items-center justify-center gap-2">
                {children || (
                    <span className="text-lg font-medium text-white">
                        {label}
                    </span>
                )}
            </div>
        </Button>
    );
}

export { ButtonCta }
