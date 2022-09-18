
import DefaultBook from "../../images/logo/default_book_cover_light.png";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
// import FilterComment from "../../components/Book/FilterComment";
import Comment from "../../components/Book/Comment";
import AddComment from "../../components/Book/AddComment";

import request from "superagent";
import { useEffect, useState } from "react";

import axios from "axios";
import { motion } from 'framer-motion'
const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState([]);
  const [comments, setComments] = useState([]);
  const [number, setNumber] = useState(0);
  const [commentNum, setCommentNum] = useState(0);

  useEffect(() => {
    request
      .get("https://www.googleapis.com/books/v1/volumes/" + id)
      .then((res) => {
        if (number < 1) {
          console.log(res.body.volumeInfo);
          setBook(res.body.volumeInfo);
        }
        setNumber(1);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://yowl-project-api.herokuapp.com/comments")
      .then((res) => {
        res.data.forEach((element) => {
          element.publication_date = element.publication_date
            .replace(/T/g, " at ")
            .replace(/Z/g, "")
            .substring(0, element.publication_date.length - 3);
          console.log(element.publication_date);
        });
        if (commentNum < 1) {
          setComments(res.data);
          console.log(comments);
          setCommentNum(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="bg-cream dark:bg-light-purple w-screen min-h-screen py-[15%] px-[12%] pb-24">
        <div
          id="wrapper"
          className="flex flex-col justify-center items-center gap-10"
        >
          {/* Container navigation + toggle mode sombre/clair */}
          <div
            id="back_and_theme"
            className="flex flex-row w-full justify-between items-center"
          >
            <Link to="/Index">
              <ArrowLeftIcon className="object-contain w-[40px] text-light-purple" />
            </Link>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {/* Titre du livre */}
            <h1 className="text-left font-Poppins text-orange font-bold text-3xl">
              {book.title}
            </h1>

            <div className="flex flex-col justify-center items-end gap-3 bg-light-purple p-6 rounded-xl">
              <div className="flex flex-row w-full gap-5">
                {/* Couverture du livre */}

                {typeof book.imageLinks !== "undefined" ? (
                  <img
                    src={book.imageLinks.thumbnail}
                    alt="bookImage"
                    className="rounded-lg h-[110px] object-contain"
                  ></img>
                ) : (
                  <img
                    src={DefaultBook}
                    alt="Book"
                    className="rounded-lg h-[110px] object-contain"
                  />
                )}

                <div className="flex flex-col items-start justify-between gap-2">
                  {/* Titre du livre */}
                  <h1 className="font-Poppins text-cream font-semibold text-left text-lg">
                    {book.authors}
                  </h1>

                  {/* Genre du livre */}

                  <h2 className="font-Poppins text-purple font-semibold text-left text-lg">
                    {book.categories}
                  </h2>
                </div>
              </div>

              {/* Résumé du livre */}
              <p className="text-left font-Poppins text-cream">
                {book.description}
              </p>

              {/* Année de publication du livre */}
              <p className="font-Poppins text-purple font-semibold">
                {book.publishedDate}
              </p>
            </div>
          </div>

          {/* {comments.map} */}

          <Comment comments={comments} book_id={id} setComments={setComments} />

          <AddComment bookId={id} setComments={setComments} />
        </div>
      </div>
    </motion.div>
  );
};

export default Book;
