import { GeolocationPayload } from "./GeolocationPayload"

type Condition = {
    text: string;
    icon: string;
    code: number;
};

type CurrentWeatherPayload = {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
};

type ForecastPayload = {
    forecastday: {
        date: string;
        day: {
            maxtemp_c: number;
            mintemp_c: number;
            avgtemp_c: number;
            maxwind_mph: number;
            maxwind_kph: number;
            totalprecip_mm: number;
            totalprecip_in: number;
            totalsnow_cm: number;
            avgvis_km: number;
            avgvis_miles: number;
            avghumidity: number;
            daily_will_it_rain: number;
            daily_chance_of_rain: number;
            daily_will_it_snow: number;
            daily_chance_of_snow: number;
            condition: Condition;
            uv: number;
        };
        astro: {
            sunrise: string;
            sunset: string;
            moonrise: string;
            moonset: string;
            moon_phase: string;
            moon_illumination: number;
            is_moon_up: number;
            is_sun_up: number;
        };
        hour: {
            time_epoch: number;
            temp_c: number;
            is_day: number;
            condition: Condition;
            wind_mph: number;
            wind_kph: number;
            wind_degree: number;
            wind_dir: string;
            pressure_mb: number;
            pressure_in: number;
            precip_mm: number;
            precip_in: number;
            snow_cm: number;
            humidity: number;
            cloud: number;
            feelslike_c: number;
            windchill_c: number;
            heatindex_c: number;
            dewpoint_c: number;

            will_it_rain: number;
            chance_of_rain: number;
            will_it_snow: number;
            chance_of_snow: number;
            vis_km: number;
            vis_miles: number;
            gust_mph: number;
            gust_kph: number;
            uv: number;
        }[];
    }[];
};

type AlertsPayload = {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    desc: string;
    instruction: string;
    effective: string;
    expires: string;
    event: string;

};

export interface WeatherPayload {
    location: Omit<GeolocationPayload, 'url'> & {
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: CurrentWeatherPayload;
    forecast: ForecastPayload;
    alerts: { alert: AlertsPayload[] };
}


