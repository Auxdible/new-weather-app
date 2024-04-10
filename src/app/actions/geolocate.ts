'use server';

import { GeolocationPayload } from "@/lib/types/GeolocationPayload";

export async function geolocate(loc: string) {

    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHERAPI_KEY}&q=${loc}`)
        .then<GeolocationPayload[]>(async (res) => {
            return res.status == 200 ? await res.json() : [];
        })
        .catch(() => {
            return [];
        });
    return response;

}