import React from "react";
import logo from "../images/logo/owl_logo_orange.png";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { motion } from "framer-motion";

const LOGIN_URL = "https://yowl-project-api.herokuapp.com/users/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [cookie, setCookie] = useState(Cookies.get("connection"));

  // const cookie = () => {
  //   if(Cookies.get("connection") === true){
  //       return true
  //   }
  //   return true
  // }

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tmp = { username: username, password: password };

    try {
      console.log(tmp);
      axios.post(LOGIN_URL, tmp).then((response) => {
        console.log(response.data);
        setCookie(true);
        Cookies.set("connection", true);
        Cookies.set("username", response.data.username);
        Cookies.set("userId", response.data.id);
      });

      //   setAuth({ username, password});
      console.log("ok");
      //   setSuccess(true);

      navigate("/Index", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {cookie ? (
        <Navigate push to="/Index" />
      ) : (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]"
        >
          {/* Flex wrapper pour aligner les éléments au centre */}
          <div id="wrapper" className="flex flex-col items-center gap-20">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-[52px] object-contain" />

            {/* Login container */}
            <div
              id="login_container"
              className="flex flex-col items-center w-full gap-10"
            >
              {/* Message */}
              <div id="message" className="flex flex-col gap-2">
                <p className="font-Poppins text-orange text-3xl font-semibold text-left">
                  Login
                </p>
                <p className="font-Poppins text-light-purple dark:text-cream text-xl font-semibold text-left tracking-tight">
                  Please sign in to continue.
                </p>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-end w-auto gap-3"
              >
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-[255px] rounded-xl px-3.5 py-2 bg-light-purple dark:bg-purple text-cream font-Poppins outline-none focus:ring-2 ring-orange dark:ring-cream ring-offset-1 placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple placeholder:font-Poppins text-xl"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[255px] rounded-xl px-3.5 py-2 bg-light-purple dark:bg-purple text-cream font-Poppins outline-none focus:ring-2 ring-orange dark:ring-cream ring-offset-1 placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple placeholder:font-Poppins text-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <br />
                <button
                  type="submit"
                  className="bg-orange font-Poppins text-white px-6 py-2 rounded-md text-xl font-semibold"
                >
                  Enter
                </button>
              </form>

              {/* Redirection Sign Up */}
              <div
                id="signup_redirection"
                className="flex flex-col gap-1 mt-16"
              >
                <p className="font-Poppins text-light-purple dark:text-cream">
                  Don't have an account?
                </p>
                <Link to="/SignUp">
                  <p className="font-Poppins text-orange font-semibold">
                    Sign up here!
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Login;
