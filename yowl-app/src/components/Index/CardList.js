import React from "react";
import BookCard from "./Card";
import { Link } from "react-router-dom";

const CardList = (props) => {


  return (
    <div className="list">
      {props.books.map((book, i) => {

        return (
        <Link to={'/Book/' + book.id} key={i}>
            <BookCard
                
                image={book.volumeInfo.imageLinks}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors}
                description={book.volumeInfo.description}
                published={book.volumeInfo.publishedDate}
            />
        </Link>

        );
      })}
    </div>
  );
};

export default CardList;
