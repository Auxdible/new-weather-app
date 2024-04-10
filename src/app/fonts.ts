import { Raleway, Lato } from "next/font/google";

export const raleway = Raleway({ 
    subsets: ["latin"],
    variable: "--font-raleway",
});
export const lato = Lato({ 
    subsets: ["latin"], 
    weight: "300", 
    variable: "--font-lato" 
});