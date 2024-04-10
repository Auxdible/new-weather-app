
import { Metadata } from "next";
import { geolocate } from "../actions/geolocate";
import Weather from "./data";

export async function generateMetadata({ searchParams }: { searchParams: { loc?: string }}): Promise<Metadata> {
    if (!searchParams?.loc) return {
        title: "Not Found",
        description: "The location you are looking for was not found.",

    };
    const data = await geolocate(searchParams?.loc);
    return {
        title: `Weather for ${data[0].name}${data[0].region ? `, ${data[0].region}` : ""}`,
        description: `Weather data from Auxdible's Weather App for ${data[0].name}${data[0].region ? `, ${data[0].region}` : ""}.`,

        openGraph: {
            title: `Weather for ${data[0].name}${data[0].region ? `, ${data[0].region}` : ""}`,
            description: `Weather data from Auxdible's Weather App for ${data[0].name}${data[0].region ? `, ${data[0].region}` : ""}.`,
            images: [
                {
                    url: `/logo512.png`,
                    width: 512,
                    height: 512,
                    alt: `Auxdible's Weather App Logo`,
                },
            ],
            type: "website",
        },

    }
}


export default function WeatherPage() {
    return <Weather/>;
}