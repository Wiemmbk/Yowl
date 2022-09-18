import React from "react";
import logo from "../images/logo/yowl_logo.png";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]">
      {/* Flex wrapper pour aligner les éléments au centre */}
      <div id="wrapper" className="flex flex-col items-center gap-20">
        {/* Logo */}
        <motion.img src={logo} alt="Logo" className="h-[52px] object-contain" />

        {/* Commentaire mis en avant */}
        <div id="comment_container" className="flex flex-col w-full gap-4">
          {/* Nom de l'utilisateur qui a posté le commentaire */}
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 300, opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-row items-center justify-start"
          >
            <p className="font-Poppins font-semibold text-orange text-lg pr-1.5">
              SmartOwl
            </p>
            <p className="font-Poppins font-medium text-light-purple dark:text-cream">
              said:
            </p>
          </motion.div>

          {/* Commentaire posté (à faire: tronquer le texte) */}
          <motion.div
            id="comment"
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -300, opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-light-purple dark:bg-purple rounded-lg max-h-[156px] py-4 px-4 overflow-hidden"
          >
            <p className="text-cream font-Poppins font-medium text-left">
              Read this incred-hoo-ble book on a lazy starry night and wasn't
              disappointed, made all my feathers go brrrrrp!
            </p>
          </motion.div>

          {/* Nom du livre sur lequel le commentaire a été posté (à faire: tronquer le texte) */}
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 300, opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-row items-center justify-end"
          >
            <p className="font-Poppins font-medium text-light-purple dark:text-cream pr-1.5">
              about
            </p>
            <p className="font-Poppins font-semibold text-orange text-lg">
              An Amazing Book
            </p>
          </motion.div>
        </div>

        {/* Login */}
        <div id="login_container" className="flex flex-col gap-8">
          {/* Bouton Login */}
          <motion.div
            id="login_button"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Link to="/Login">
              <button className="bg-orange text-white font-Poppins font-semibold text-xl rounded-md py-2 px-6">
                Login
              </button>
            </Link>
          </motion.div>

          {/* Redirection Sign Up */}
          <motion.div
            id="signup_redirection"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-1"
          >
            <p className="font-Poppins text-light-purple dark:text-cream">
              Don't have an account?
            </p>
            <Link to="/SignUp">
              <p className="font-Poppins text-orange font-semibold">
                Sign up here!
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
