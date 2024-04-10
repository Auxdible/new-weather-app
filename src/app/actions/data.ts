'use server';

import { WeatherPayload } from "@/lib/types/WeatherPayload";

export async function forecastData(loc: string) {

    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${loc}&alerts=yes`)
        .then<WeatherPayload>(async (res) => {
            return res.status == 200 ? await res.json() : null;
        })
        .catch((x) => {
            return null;
        });
    return response;

}