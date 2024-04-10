"use client";

import { ChevronsUpDown, Globe } from "lucide-react";
import React, { Suspense } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { GeolocationPayload } from "@/lib/types/GeolocationPayload";

import { SearchList } from "./SearchList";
 

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  
  ({ className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
    const [value, setValue] = React.useState<GeolocationPayload | undefined>(undefined);
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    if (isDesktop) {
    return (<Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
           {hasMounted && <Globe className="h-4 w-4 shrink-0 mr-2" />}
           {props.placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <SearchList value={value} setOpen={setOpen} change={(val: GeolocationPayload) => {
            setValue(val)
          }}/>
        </PopoverContent>
      </Popover>
)
    }
    return (<Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value ? <>{value.name}{value.region ? `, ${value.region}` : ''}</> : props.placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full h-[300px] p-0">
        <SearchList value={value} setOpen={setOpen} change={(val: GeolocationPayload) => {
            setValue(val)
          }}/>
        </DrawerContent>
      </Drawer>);
  },
);

Search.displayName = "Search";


export { Search };