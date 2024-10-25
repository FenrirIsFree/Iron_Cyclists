import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { MagicButton } from './MagicButton'
import { FaLocationArrow } from 'react-icons/fa'

const Hero = () => {
    return (
      <div className="pb-2 pt-20">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        <div
          className="h-screen w-full dark:bg-rust bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
         absolute top-0 left-0 flex items-center justify-center"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-rust
           bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,rust)]"
          />
        </div>
  
        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <h1 className="uppercase tracking-widest text-s text-center text-blue-100 max-w-80">
              Iron Cyclists
            </h1>
  
            {/* Link: https://ui.aceternity.com/components/text-generate-effect */}
            <TextGenerateEffect
              words="Never a Day Off in the Fight Against ALS"
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />
  
            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              {/* Hi! I&apos;m Steve, I ride for a better tomorrow. */}
              Iron Cyclists is focused on spreading Awareness and Supporting the ALS Community through Cycling. The name is based on Lou Gehrig&apos;s nickname of the &quot;Iron Horse&quot; and his ability to play every game despoite injuries. This is a reminder that there is Never a Day Off in the Fight Against ALS. We hope to use this website as a one-stop shop to find out about ALS cycling events across the country and to share stories of the impact of these events.
            </p>
  
            {/* <a href="#about">
              <MagicButton
                title="Learn More"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a> */}
          </div>
        </div>
      </div>
    );
  };

export default Hero