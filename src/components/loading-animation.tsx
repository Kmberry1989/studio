"use client";

import { Cog, Wrench, Screw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingAnimation({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <div className="relative w-32 h-32">
        <style>
            {`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
            }
            .cog-1 {
                animation: spin 8s linear infinite;
            }
            .cog-2 {
                animation: spin-reverse 6s linear infinite;
            }
            .cog-3 {
                animation: spin 10s linear infinite;
            }
            `}
        </style>
        <Cog className="cog-1 absolute top-0 left-0 w-16 h-16 text-primary opacity-70" />
        <Cog className="cog-2 absolute bottom-0 right-0 w-20 h-20 text-muted-foreground opacity-50" />
        <Cog className="cog-3 absolute top-14 left-14 w-10 h-10 text-primary opacity-60" />

        <Wrench className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-4 w-8 h-8 text-foreground -rotate-45" />
        <Screw className="absolute top-1/2 left-1/2 translate-x-4 -translate-y-10 w-6 h-6 text-foreground rotate-12" />
        </div>
    </div>
  );
}
