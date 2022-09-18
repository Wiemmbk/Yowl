import { ArrowLeftIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import { PencilAltIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import request from "superagent";

import axios from "axios";
import Cookies from "js-cookie";
function AllComments() {
    
  const navigate = useNavigate();
  const { id } = useParams();
  const { book_id } = useParams();
  const [isPTag, setPTag] = useState(true);

  const [book, setBook] = useState([]);
  const [comment, setComment] = useState([]);
  const [number, setNumber] = useState(0);
  const [commentNum, setCommentNum] = useState(0);
  const [updatedComm, setUpdatedComm] = useState("");
  const [isCommentFromUser, setIsCommentFromUser] = useState()

  function updateComment(e) {
    e.preventDefault();

    console.log(updatedComm);
    let contentToUpload = {
      content: updatedComm,
    };

    axios.put(
      "https://yowl-project-api.herokuapp.com/comments/" + id,
      contentToUpload
    );
    setComment(contentToUpload);
    setPTag(true);
  }
  function deleteComment() {
    axios.delete(
      "https://yowl-project-api.herokuapp.com/comments/" + id,
    );
    navigate(`/Book/${book_id}`, {replace: true});
  }

  useEffect(() => {
    request
      .get("https://www.googleapis.com/books/v1/volumes/" + book_id)
      .then((res) => {
        if (number < 1) {
          setBook(res.body.volumeInfo);
        }
        setNumber(1);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://yowl-project-api.herokuapp.com/comments/" + id)
      .then((res) => {
        res.data.publication_date = res.data.publication_date
          .replace(/T/g, " at ")
          .replace(/Z/g, "")
          .substring(0, res.data.publication_date.length - 3);

        if(res.data.user_id == Cookies.get('userId')){
          console.log(true)
          setIsCommentFromUser(true)
        }else if(res.data.user_id != Cookies.get('userId')){
          console.log(res.data.user_id)
          console.log(false)
        }
        if (commentNum < 1) {
          setComment(res.data);
          setCommentNum(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });


  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[20%] px-[15%]"
    >
      <div
        id="wrapper"
        className="flex flex-col items-center justify-between gap-10"
      >
        <div
          id="back_and_theme"
          className="flex flex-row w-full justify-between items-center"
        >
          <Link to={`/Book/${book_id}`}>
            <ArrowLeftIcon className="object-contain w-[40px] text-light-purple" />
          </Link>
        </div>

        <div id="comment_container" className="flex flex-col w-full gap-4">
          {/* Nom du livre sur lequel le commentaire a été posté (à faire: tronquer le texte) */}
          <div className="flex flex-row items-center justify-end">
            <p className="font-Poppins font-medium text-light-purple dark:text-cream pr-1.5">
              about
            </p>
            <p className="font-Poppins font-semibold text-orange text-lg">
              {book.title}
            </p>
          </div>

          <div
            id="comment"
            className="flex bg-light-purple dark:bg-purple rounded-lg py-4 px-4"
          >
            {isPTag ? (
              <p className="text-cream font-Poppins font-medium text-left">
                {comment.content}
              </p>
            ) : (
              <form onSubmit={(e) => updateComment(e)}>
                <textarea
                  type="text"
                  placeholder="Edit your comment..."
                  className="h-full w-full bg-light-purple dark:bg-purple outline-none text-cream font-Poppins text-left"
                  value={updatedComm}
                  onChange={(e) => setUpdatedComm(e.target.value)}
                />
                <button type="submit">
                  <CheckIcon className="w-[40px] object-contain text-orange" />
                </button>
              </form>
            )}
          </div>


      {/* Button */}
      {
        isCommentFromUser ? (          <div className="flex flex-row w-full justify-between items-center">
            <TrashIcon
              onClick={() => deleteComment()}
              className="bg-[#FF7657] w-[40px] px-1 py-1 rounded-lg text-white font-Poppins text-xl"
            />

            <PencilAltIcon
              onClick={() => setPTag(false)}
              className="bg-orange w-[40px] px-1 py-1 rounded-lg text-white font-Poppins text-xl"
            />
          </div>) : (<></>)
      }




        </div>
      </div>
    </motion.div>
  );
}

export default AllComments;
