"use client";
import React, { useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { GeolocationPayload } from "@/lib/types/GeolocationPayload";
import { geolocate } from "@/app/actions/geolocate";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export type SearchListProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  value?: GeolocationPayload;
  change?: (val: GeolocationPayload) => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  };

const SearchList = React.forwardRef<HTMLInputElement, SearchListProps>(
  ({ className, ...props }, ref) => {

    const [locations, setLocations] = React.useState<GeolocationPayload[] | undefined>(undefined);
    const [val, setVal] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
      const updateLocations = async () => {
        if (val.length > 2) {
          const updatedLocs = await geolocate(val);
          setLocations(updatedLocs);
        }

      };

      updateLocations();
    }, [val]);
    if (loading && (locations?.length || 0) > 0) setLoading(false);
    return (<Command>
      <div className="relative h-10 w-full">  
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
  <Input
    type="text"
    placeholder="Search"
    className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
    value={val}
    onChange={(e) => setVal(e.target.value)}
  />
</div>

      <CommandGroup className={"max-h-[300px]"}>
      {loading ? <h1 className="font-lato text-lg text-center">Loading from location...</h1> : null}
       {!loading && (!locations || locations.length < 0) ? <h1 className="font-lato text-lg text-center">No results found.</h1> : null}
       {locations?.map((loc) => (
          <CommandItem
            key={loc.url}
            value={loc.url}
            
            className={"flex items-center gap-2 hover:bg-gray-800 transition-all rounded-none cursor-pointer"}
            onSelect={() => {
              router.push('/weather?loc=' + loc.url)
              props.setOpen?.(false);
            }}
            
          >
            {loc.name}{loc.region ? `, ${loc.region == loc.name ? loc.country : loc.region}` : ''}
          </CommandItem>
        ))}
      </CommandGroup>
      {navigator.geolocation && <Button variant="ghost" className="rounded-t-none" onClick={async () => {
        setLoading(true);
        const pos = await new Promise<GeolocationPosition>((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
        const locs = await geolocate(pos.coords.latitude.toString() + "," + pos.coords.longitude.toString());
        setLocations(locs);
      }}>Use Location</Button>}


      
    </Command>);
  }
);
SearchList.displayName = "SearchList";
export { SearchList }
