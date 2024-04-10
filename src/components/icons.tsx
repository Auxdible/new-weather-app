
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";



const MainIcon = React.forwardRef<HTMLImageElement, Omit<ImageProps, 'alt' | 'src'>>(
  ({ className, ...props }, ref) => {
    return (
      <Image
       src="/logo512.png"
       alt="Weather Website Logo"
       className={cn("", className)}
       ref={ref}
       width={512}
       height={512}
       {...props}
      />
    );
  },
);

MainIcon.displayName = "MainIcon";

const AuxdibleIcon = React.forwardRef<HTMLImageElement, Omit<ImageProps, 'alt' | 'src'>>(
  ({ className, ...props }, ref) => {
    return (
      <Image
       src="/auxdible.png"
       alt="Auxdible's Icon"
       className={cn("", className)}
       ref={ref}
       width={512}
       height={512}
       {...props}
      />
    );
  },
);

AuxdibleIcon.displayName = "AuxdibleIcon";

export { MainIcon, AuxdibleIcon };