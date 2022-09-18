import React from "react";
import logo from '../images/logo/YOWL_logo_light_purple.png';

export default function Home() {
    return (
        <div className="flex items-center justify-center bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]">

            {/* Flex wrapper pour aligner les éléments au centre */}
            <div id="wrapper"
                className="flex flex-col gap-5 animate-pulse">

                {/* Logo */}
                <img src={logo} alt="Logo" className="h-[52px] object-contain" />
                <p className="font-Poppins text-light-purple font-semibold">The nest of bookowlics</p>

            </div>

        </div>

    )
}