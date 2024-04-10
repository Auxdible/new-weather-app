import { Search } from "@/components/form/search";
import { AuxdibleIcon, MainIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { DiscordLogoIcon, EnvelopeOpenIcon, GitHubLogoIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { ArrowDown, Github, Hammer, LinkIcon, Mail, Settings } from "lucide-react";
import Link from "next/link";



export default function Home() {
  return (
    <main className={'flex flex-col gap-20'}>
      <header className="min-h-screen flex items-center justify-center bg-background-gradient">
      <div className="flex flex-col max-w-4xl justify-center items-center text-center gap-2">
        <MainIcon className="w-32 h-32"/>
        <h1 className={"font-raleway text-6xl"}>The weather app that suits your daily needs.</h1>
        <div className="text-xl font-lato">
          Start here!
          <ArrowDown className="w-4 h-4 animate-bounce mx-auto"/>
        </div>
        <Search placeholder="Enter a city/region/ZIP..." className="dark:bg-slate-950 bg-slate-50"/>
      </div>
      

      </header>
      <section className="flex flex-col pb-20 max-w-6xl gap-4 mx-auto text-center justify-center items-center">
      <div className="flex flex-col gap-10">
        <h1 className={"font-raleway text-5xl"}>Features</h1>
        <ul className="flex gap-4 max-md:flex-col items-center">
          <li className="flex flex-col gap-2">
              <Hammer className="w-10 h-10 mx-auto"/>
              <h1 className="font-bold font-raleway text-4xl">Lightweight</h1>
              <p className="font-lato text-xl">This app is designed to be lightweight and easy to use, with a simple interface that is easy to navigate.</p>
          </li>
          <Separator orientation="vertical" className="self-stretch h-auto"/>
          <li className="flex flex-col gap-2">
              <Settings className="w-10 h-10 mx-auto"/>
              <h1 className="font-bold font-raleway text-4xl">Utility</h1>
              <p className="font-lato text-xl">This app includes various built in features, such as toggling between the metric system and more!</p>
          </li>
          <Separator orientation="vertical" className="self-stretch h-auto"/>
          <li className="flex flex-col gap-2">
              <LightningBoltIcon className="w-10 h-10 mx-auto"/>
              <h1 className="font-bold font-raleway text-4xl">Fast</h1>
              <p className="font-lato text-xl">Find out the information you need when you need it. This app provides swift data that is easy to digest.</p>
          </li>

        </ul>
      </div>
      </section>
      <section className="flex flex-col py-20 max-w-6xl gap-4 mx-auto text-center justify-center items-center">
      <h1 className={"font-raleway text-5xl"}>Why a weather app?</h1>
      <p className="font-lato text-xl">This application was created to celebrate Auxdible reaching 100 consecutive days of programming, as a part of freeCodeCamp&apos;s 100 days of code challenge. The first full-stack application I ever developed was more than a year ago, for my first round of 100 days of code, which I regretfully failed 😔 This website was designed, architected, developed and deployed in <b>less than 24 hours</b>.</p>
      </section>
      <section className="flex max-md:flex-col gap-4 py-10 max-w-6xl mx-auto text-center justify-center items-center">
          <div>
            <AuxdibleIcon className="w-96 max-md:w-48"/>
          </div>
          <Separator orientation="vertical" className="self-stretch h-auto"/>
          <div className="flex flex-col gap-4 text-left max-md:text-center">
          <h1 className={"font-raleway text-5xl"}>About the Developer</h1>
          <p className="font-lato text-xl">This application was developed by Auxdible, a full stack developer and student. You can find more information about Auxdible on his website, <a href="https://auxdible.me" className="bg-gradient-to-br from-orange-500 to-red-400 bg-clip-text text-transparent font-bold">auxdible.me</a>.</p>
          </div>
         
        </section>
      <footer className="flex gap-5 items-center text-2xl font-lato py-2 border-t border-t-slate-800 justify-center">
        <Link href={"https://github.com/Auxdible/new-weather-app"}><Github /></Link>
        <Link href={"https://auxdible.me"}><LinkIcon/></Link>
        <Link href={"mailto:steven.primeaux@auxdible.me"}><Mail/></Link>
      </footer>
    </main>
  );
}
