import React, { Component } from "react";
import SearchBar from "../../components/Index/SearchBar";
// import ThemeToggle from "../../components/Index/ThemeToggle";
import Filter from "../../components/Index/Filter";
import CardList from "../../components/Index/CardList";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

import request from "superagent";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: "",
    };
  }

  searchBook = (e) => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes?maxResults=40")
      .query({ q: this.state.searchField })
      .then((data) => {
        const cleanData = this.cleanData(data);
        this.setState({ books: cleanData });
      });
  };

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };
  handleSort = (e) => {
    console.log(e.target.value);
    this.setState({ sort: e.target.value });
  };

  cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      }

      return book;
    });
    return cleanedData;
  };

  render() {
    const sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest") {
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          a.volumeInfo.publishedDate.substring(0, 4)
        );
      } else if (this.state.sort === "Oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          b.volumeInfo.publishedDate.substring(0, 4)
        );
      }
    });
    return (
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <div className="bg-cream dark:bg-light-purple w-[100%] min-h-screen py-[15%] px-[12%] pb-24 m-auto">
          {/* Flex wrapper pour aligner les éléments au centre */}
          <div id="wrapper" className="flex flex-col items-center w-[100%] gap-8">
            {/* Container messages + toggle mode sombre/clair */}
            <div id="header_container"
                        className="flex flex-col gap-3 w-[100%]">
                        <div id="message_and_theme"
                            className="flex flex-col items-start">
                            <p className="font-Poppins text-orange text-4xl tracking-tight font-bold text-left">Welcome </p>
                            <p className="font-Poppins text-orange text-4xl tracking-tight font-bold text-left">Back!</p>


                        </div>



                        <p className="text-left font-Poppins font-medium text-lg text-light-purple dark:text-cream">Start typing, we're owl ears.</p>

                    </div>

            {/* Search bar */}
            <SearchBar
              searchBook={this.searchBook}
              handleSearch={this.handleSearch}
            />

            {/* Filters */}
            <Filter handleSort={this.handleSort} />

            {/* Card Container */}
            <div
              id="card_container"
              className="flex flex-wrap items-center justify-center w-[100%] gap-5"
            >
              <CardList books={sortedBooks} />
            </div>

            <Navbar />
          </div>
        </div>
      </motion.div>
    );
  }
}

export default Books;
