import { ArrowLeftIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import defaultAvatar from "../../../images/logo/default_avatar_2.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function Account() {
  
    const [user, setUser] = useState([]);
    const [commentNum, setCommentNum] = useState(0);
    const [updatedUserName, setUpdatedUserName] = useState('');
    const [updatedUserEmail, setUpdatedUserEmail] = useState('');
    const [updatedUserPassword, setUpdatedUserPassword] = useState('');
    
    function updateUser(e) {
      e.preventDefault();
        let updatedUserInfo = {}

        if(updatedUserName !== '')
            updatedUserInfo.username = updatedUserName
        if(updatedUserEmail !== '')
            updatedUserInfo.email = updatedUserEmail
        if(updatedUserPassword !== '')
            updatedUserInfo.password = updatedUserPassword
        console.log(updatedUserInfo)

      axios.put(
        "https://yowl-project-api.herokuapp.com/users/" + Cookies.get("userId"), updatedUserInfo
      );
    }

  
    useEffect(() => {
        
      axios
        .get("https://yowl-project-api.herokuapp.com/users/user/" + Cookies.get("userId"))
        .then((res) => {

          console.log(res.data);
          if (commentNum < 1) {
            setUser(res.data);
            console.log(user);
            setCommentNum(1);
        }
    })
    .catch((err) => {
        console.log(err);
    });
});
return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]">
            <div id="wrapper"
                className="flex flex-col items-center justify-between gap-10">
                <div id="back_and_theme"
                    className="flex flex-row w-full justify-between items-center">

                    <Link to="/Index">
                        <ArrowLeftIcon className="object-contain w-[40px] text-light-purple" />
                    </Link>

                    <CheckIcon className="w-[40px] object-contain text-orange" onClick={e => updateUser(e)}/>

                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                    <img src={defaultAvatar} alt="avatar" className="h-[70px] object-contain" />
                    <button className="text-light-purple text-lg font-Poppins font-bold">Change avatar</button>
                </div>


                <div className="flex flex-col items-start w-full gap-1">
                    <p className="font-Poppins text-orange font-bold text-lg">Username</p>
                    <input type="text" placeholder={user.username}
                        className="py-1.5 w-full text-light-purple font-Poppins font-semibold bg-cream outline-none border-b-[3px] border-b-light-purple border-dashed placeholder:text-light-purple placeholder:font-Poppins placeholder:font-semibold" 
                        onChange={(e) => setUpdatedUserName(e.target.value)}/>
                </div>

                <div className="flex flex-col items-start w-full gap-1">
                    <p className="font-Poppins text-orange font-bold text-lg">Email address</p>
                    <input type="text" placeholder={user.email}
                    onChange={(e) => setUpdatedUserEmail(e.target.value)}
                        className="py-1.5 w-full text-light-purple font-Poppins font-semibold bg-cream outline-none border-b-[3px] border-b-light-purple border-dashed placeholder:text-light-purple placeholder:font-Poppins placeholder:font-semibold" />
                </div>

                <div className="flex flex-col items-start w-full">
                    <p className="font-Poppins text-orange font-bold text-lg">Password</p>
                </div>

                <p className="text-left font-Poppins text-light-purple">
                    Your password must contain 8 to 24 characters, at least one special character (!$@#%_), an uppercase letter, a lowercase letter, and a number.
                </p>


        
                <div className="flex flex-col items-start w-full gap-1">
                    <p className="font-Poppins text-orange font-bold text-lg">New password</p>
                    <input type="password" placeholder=""
                        className="py-1.5 w-full text-light-purple font-Poppins font-semibold bg-cream outline-none border-b-[3px] border-b-light-purple border-dashed placeholder:text-light-purple placeholder:font-Poppins placeholder:font-semibold" onChange={(e) => setUpdatedUserPassword(e.target.value)} />
                </div>

                <div className="flex flex-col items-start w-full gap-1">
                    <p className="font-Poppins text-orange font-bold text-lg">Confirm new password</p>
                    <input type="password" placeholder=""
                        className="py-1.5 w-full text-light-purple font-Poppins font-semibold bg-cream outline-none border-b-[3px] border-b-light-purple border-dashed placeholder:text-light-purple placeholder:font-Poppins placeholder:font-semibold" />
                </div>


                <div className="flex flex-col items-center w-full mt-6">
                    <Link to="/AllComments">
                        <p className="font-Poppins bg-orange text-white font-semibold py-4 px-6 w-full rounded-lg text-lg">All your comments</p>
                    </Link>
                </div>

            </div>

        </motion.div >



    )
}