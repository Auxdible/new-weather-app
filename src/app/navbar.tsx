"use client";

import { Search } from "@/components/form/search";
import { MainIcon } from "@/components/icons";
import { ModeToggle } from "@/components/theme-toggle";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,

  } from "@/components/ui/navigation-menu"
import Image from "next/image";
import Link from "next/link";

export function NavigationBar() {
    return (<NavigationMenu className="px-2 flex max-w-none justify-start sticky top-0 w-full bg-white/60 border-b-slate-200 dark:bg-slate-950/60 dark:border-b-slate-800 border-b backdrop-blur-md">
        <div>
        <Link href="/" legacyBehavior passHref>
         <MainIcon
            className="cursor-pointer hover:scale-110 transition-transform" 
            width={50}
            height={50}
            />
        </Link>  
        </div>
        <NavigationMenuList className="gap-2 ml-5 flex">
       
       
        </NavigationMenuList>
        <div className="ml-auto"/>
        <NavigationMenuList className="ml-auto">
        <NavigationMenuItem className="max-[320px]:hidden">
            <Search 
              placeholder="Enter a city/region/ZIP..."
            />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle/>
        </NavigationMenuItem>
        </NavigationMenuList>
        
      </NavigationMenu>)
}