"use client";
import { Distance } from "@/components/ui/distance";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Temperature } from "@/components/ui/temperature";
import { ConditionIcons } from "@/lib/constants/ConditionIcons";
import { WeatherPayload } from "@/lib/types/WeatherPayload";
import { motion } from "framer-motion";
import { CircleAlert, Clock, CloudRain, Eye, Flame, Snowflake, Wind } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { forecastData } from "../actions/data";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Weather() {
    "use client";
    const queryParams = useSearchParams();
    const location = queryParams.get("loc");
    const [data, setData] = useState<WeatherPayload | null>(null);
    const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
    useEffect(() => {
        const fetchData = async () => {
            if (!location) return;
            const data = await forecastData(location);
            setData(data);
        };
        fetchData();
    }, [location]);
    if (!data) return <></>;
    const icons = ConditionIcons[data.current.condition.code];
    const ConditionIcon = data.current.is_day ? icons.sun : icons.moon;


    return (
        <main className={'flex flex-col'}>
            <header className="min-h-screen flex items-center justify-center bg-background-gradient">
                <div className="flex flex-col max-w-6xl w-full justify-center items-center text-center gap-2">

                    <span className={'flex gap-4 max-sm:flex-col items-center justify-center sm:w-full'}>
                        <motion.span initial={false} whileInView={{ transform: 'translateX(0)', opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex-1 shrink-0 text-right max-sm:translate-y-4 sm:translate-x-4 opacity-0"><Temperature className="my-5 text-right w-fit" value={data.current.temp_c} /></motion.span>
                        <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1, }} viewport={{ once: true }} className="flex-1 grow-0 self-stretch flex origin-center"><Separator orientation={isMobile ? "horizontal" : "vertical"} className=" max-sm:min-h-[1px] self-stretch bg-black dark:bg-white h-auto" /></motion.span>
                        <motion.span initial={false} whileInView={{ transform: 'translateX(0)', opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-4xl flex-1 text-left shrink-0 font-raleway max-sm:-translate-y-4 sm:-translate-x-4 opacity-0 flex flex-col max-sm:items-center">
                            <ConditionIcon size={"60"} />
                            {data.current.condition.text}
                        </motion.span>
                    </span>
                    <span className={'font-lato text-lg flex gap-2 items-center max-md:flex-col'}>
                        <span className="flex gap-2 items-center"><Flame /> Feels like <Temperature className="text-lg" value={data.current.feelslike_c} /></span><span className="max-md:hidden">|</span>
                        <span className="flex gap-2 items-center"><Wind /> <span>{data.current.wind_dir} {data.current.wind_degree}<sup>°</sup></span> <Distance value={data.current.wind_kph} className="text-lg" /></span>
                    </span>
                    <h1 className={"font-raleway text-5xl"}>{data.location.name}{data.location.region && data.location.region != data.location.name ? `, ${data.location.region}` : ""}</h1>
                    <h2 className={"font-raleway font-bold text-3xl"}>{data.location.country}</h2>
                    <span className="font-lato text-2xl flex gap-2 items-center"><Clock /> {new Date().toLocaleTimeString('en-US', { timeZone: data.location.tz_id })}</span>
                    <div className="flex max-sm:flex-col text-center gap-2 font-lato">
                        <span className="flex items-center max-sm:justify-center gap-2"><Flame /> {data.current.humidity}% Humidity</span>
                        <span className="flex items-center max-sm:justify-center gap-2"><Eye />  <Distance value={data.current.vis_km} className="text-lg" /> Visibility</span>
                    </div>


                </div>
            </header>
            <section className="flex flex-col items-center gap-20 py-20">
                <div className="flex flex-col gap-1 items-center text-4xl font-lato">
                    <h1 className="text-6xl font-raleway font-bold text-center">Hourly Forecast</h1>
                    Today: {new Date().toLocaleDateString('en-US')}
                </div>
                <ul className="flex gap-2 max-2xl:grid max-2xl:grid-cols-12 max-xl:grid-cols-8 max-md:grid-cols-6 max-sm:grid-cols-3">

                    {data.forecast.forecastday[0].hour.map((hour, index) => {
                        const HourIcons = ConditionIcons[hour.condition.code];
                        const HourIcon = hour.is_day ? HourIcons.sun : HourIcons.moon;
                        return (<>

                            <span key={index} className="flex flex-col gap-2 items-center font-lato text-lg">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="flex flex-col items-center cursor-pointer">
                                            <span className="font-bold font-raleway">{new Date(hour.time_epoch * 1000).toLocaleTimeString('en-US').replace(':00:00', '')}</span>
                                            <span><HourIcon /></span>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="font-lato flex flex-col gap-2">
                                        <span className="text-lg font-raleway font-bold">{hour.condition.text}</span>
                                        {hour.chance_of_rain > 0 && <span className="flex items-center gap-1"><CloudRain /> {hour.chance_of_rain}% Rain Chance</span>}
                                        {hour.chance_of_snow > 0 && <span className="flex items-center gap-1"><Snowflake /> {hour.chance_of_snow}% Snow Chance</span>}
                                        <span className="flex items-center gap-1"><Flame /> {hour.humidity}% Humidity</span>

                                        <span className="flex gap-2 items-center"><Wind /> <span>{hour.wind_dir} {hour.wind_degree}<sup>°</sup></span> <Distance value={hour.wind_kph} className="text-lg" /></span>
                                    </PopoverContent>
                                </Popover>
                                <Temperature value={hour.temp_c} className="text-lg" />
                            </span>

                            {index >= data.forecast.forecastday[0].hour.length - 1 ? null : <Separator orientation="vertical" className=" max-2xl:hidden self-stretch h-auto" />}
                        </>
                        );
                    })}

                </ul>
            </section>
            {data.alerts.alert && data.alerts.alert.length > 0 ? <section className="flex flex-col items-center gap-20 py-20">
                <div className="flex flex-col gap-1 items-center text-4xl font-lato">
                    <h1 className="text-6xl font-raleway font-bold text-center">Weather Alerts</h1>
                </div>
                <ul className="flex flex-col gap-5 2xl:grid 2xl:grid-cols-3 content-center justify-center">

                    {data.alerts.alert.map((alert, index) => {
                        return (<li key={index}>
                            <Dialog>
                            <DialogTrigger asChild>
                            <div className="flex flex-col gap-2 cursor-pointer items-center m-auto font-lato text-lg border-yellow-500 rounded-2xl p-4 w-64 text-center border relative">
                            <CircleAlert className="absolute -top-4 bg-white dark:bg-slate-950" size={30}/>
                            {alert.urgency && <span className="font-bold font-raleway">{alert.urgency}</span>}
                            <span className="font-bold font-raleway">{alert.headline}</span>
                            </div>
                            
                            
                            </DialogTrigger>
                            <DialogContent className="max-h-[98dvh] text-sm">
                                
                                <DialogTitle>{alert.headline} | Effective {new Date(alert.effective).toLocaleDateString()}<br/>{alert.urgency ?? ""}{alert.urgency && alert.severity ? " | " : ""}{alert.severity ?? ""}</DialogTitle>
                                {alert.desc}
                                {alert.instruction && <>
                                    <h2 className="font-raleway font-bold">Instructions</h2>
                                    {alert.instruction}
                                </>}
                                {alert.areas && <>
                                    <h2 className="font-raleway font-bold">Areas Affected</h2>
                                    {alert.areas}
                                </>}

                               <DialogFooter>
                                {alert.event} | Expires {new Date(alert.expires).toLocaleDateString()}
                               </DialogFooter>
                            </DialogContent>
                            </Dialog>
                            </li>);

                    })}
                </ul>
            </section> : null}

        </main>
    );
}
