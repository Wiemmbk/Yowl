import { CogIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import Cookies from "js-cookie";

function Navbar() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [rotate, setRotate] = React.useState(false);

    function deconnexion () {
        Cookies.remove('connection')
        Cookies.remove('username')
        Cookies.remove('userId')

        navigate('/', {replace: true})
    }

    return (
        <div className="fixed bottom-0 flex flex-row-reverse justify-start items-center w-[100%] h-16 px-[10%] bg-cream border-t-[3px] border-light-purple dark:border-cream border-dashed">
            <motion.div animate={{ rotate: rotate ? 360 : 0 }} onClick={() => {setRotate(!rotate)}}>
                <CogIcon onClick={() => setShow(!show)} className="w-[40px] text-light-purple" />
            </motion.div>
            {
                show ?
                    <motion.div animate={{ x: -30 }} className="flex justify-center items-center gap-4">


                        <Link to="/Account">
                            <div className="bg-light-purple text-cream text-lg font-Poppins px-3 py-1 rounded-xl">
                                <p>Account</p>
                            </div>
                        </Link>

                        <div className="bg-light-purple text-cream text-lg font-Poppins px-3 py-1 rounded-xl" onClick={() => deconnexion()}>
                            <p>Logout</p>
                        </div>
                    </motion.div>
                    : null
            }




        </div>
    )
}

export default Navbar;