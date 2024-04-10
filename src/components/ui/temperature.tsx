"use client";

import React, { useContext } from "react";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";
import { UnitContext } from "@/app/context/UnitContext";


 

export type TemperatureProps = React.HTMLAttributes<HTMLSpanElement> & {
    value: number;
    className?: string;
    
};

const Temperature = React.forwardRef<HTMLSpanElement, TemperatureProps>(
    
  ({ className, ...props }, ref) => {

    const {metric, setMetric} = useContext(UnitContext);
    return (<Popover>
        <PopoverTrigger asChild>
            <span className={cn('cursor-pointer text-7xl font-lato', className)} ref={ref}>
                {!metric ? Math.round(((props.value * 1.8) + 32) * 10) / 10 : props.value}
                <sup>
                    °
                    {(!metric ? 'f' : 'c').toUpperCase()}
                </sup>
            </span>
        </PopoverTrigger>
        <PopoverContent className="w-fit flex flex-col items-center gap-1">
            <span className={'font-raleway text-xl'}>Use Metric</span>
            <Switch checked={metric} onCheckedChange={(e) => setMetric?.(e)} id="temperature-switch"/>
        </PopoverContent>
    </Popover>);
  },
);

Temperature.displayName = "Search";


export { Temperature };