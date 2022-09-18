import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import logo from "../images/logo/owl_logo_orange.png";

import Cookies from "js-cookie";
import { motion } from "framer-motion";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const REGISTER_URL = "https://yowl-project-api.herokuapp.com/users";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setmatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [ValidEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const postToUpload = {
        username: username,
        email: email,
        password: password,
      };
      axios.post(REGISTER_URL, postToUpload).then((res) => {
        let tmp = {
          username: postToUpload.username,
          password: postToUpload.password,
        };
        axios.post(REGISTER_URL + "/login", tmp).then((response) => {
          console.log(response.data);
          Cookies.set("connection", true);
          Cookies.set("username", response.data.username);
          Cookies.set("userId", response.data.id);
        });
        // document.cookie = "connection=true;"
        // document.cookie = `userId=${res.data.id};`
        // document.cookie = `username=${res.data.username};`
      });
      //clear state and controlled inputs
      setUsername("");
      setPassword("");
      setmatchPassword("");
      setEmail("");

      navigate("/Index", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]"
      >
        {/* Flex wrapper pour aligner les éléments au centre */}
        <div id="wrapper" className="flex flex-col items-center gap-10">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-[52px] object-contain" />

          {/* Login container */}
          <div id="login_container" className="flex flex-col items-center w-full gap-10">
            {/* Message */}
            <div id="message" className="flex flex-col gap-2">
              <p className="font-Poppins text-orange text-3xl font-semibold text-left">
                Sign up
              </p>
              <p className="font-Poppins text-light-purple dark:text-cream text-xl font-semibold text-left tracking-tighter">
                Please sign up to continue.
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
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <input
                type="text"
                placeholder="Email address"
                className="w-[255px] rounded-xl px-3.5 py-2 bg-light-purple dark:bg-purple text-cream font-Poppins outline-none focus:ring-2 ring-orange dark:ring-cream ring-offset-1 placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple placeholder:font-Poppins text-xl"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={ValidEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-[255px] rounded-xl px-3.5 py-2 bg-light-purple dark:bg-purple text-cream font-Poppins outline-none focus:ring-2 ring-orange dark:ring-cream ring-offset-1 placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple placeholder:font-Poppins text-xl"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-[255px] rounded-xl px-3.5 py-2 bg-light-purple dark:bg-purple text-cream font-Poppins outline-none focus:ring-2 ring-orange dark:ring-cream ring-offset-1 placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple placeholder:font-Poppins text-xl"
                onChange={(e) => setmatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <button
                className="bg-orange font-Poppins text-white px-6 py-2 rounded-md text-xl font-semibold mt-4"
                disabled={
                  !validName || !validPassword || !validMatch || !ValidEmail
                    ? true
                    : false
                }
              >
                Submit
              </button>
            </form>

            {/* Redirection Sign Up */}
            <div id="signup_redirection" className="flex flex-col gap-1">
              <p className="font-Poppins text-light-purple dark:text-cream">
                Already have an account?
              </p>
              
            <Link to="/Login">
              <p
                className="font-Poppins text-orange font-semibold"
              >
                Sign in here!
              </p>
              
            </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
