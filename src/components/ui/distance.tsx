"use client";

import React, { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";
import { UnitContext } from "@/app/context/UnitContext";


 

export type DistanceProps = React.HTMLAttributes<HTMLSpanElement> & {
    value: number;
    className?: string;
    
};

const Distance = React.forwardRef<HTMLSpanElement, DistanceProps>(
    
  ({ className, ...props }, ref) => {

    const {metric, setMetric} = useContext(UnitContext);
    return (<Popover>
        <PopoverTrigger asChild>
            <span className={cn('cursor-pointer text-5xl font-lato', className)} ref={ref}>
                {!metric ? Math.round((props.value * 0.6213711922) * 10) / 10 : props.value} {(!metric ? 'mph' : 'kph').toUpperCase()}
            </span>
        </PopoverTrigger>
        <PopoverContent className="w-fit flex flex-col items-center gap-1">
            <span className={'font-raleway text-xl'}>Use Metric</span>
            <Switch checked={metric} onCheckedChange={(e) => setMetric?.(e)} id="temperature-switch"/>
        </PopoverContent>
    </Popover>);
  },
);

Distance.displayName = "Search";


export { Distance };