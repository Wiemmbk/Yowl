import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { motion } from 'framer-motion'
const SearchBar = (props) => {
  
  const [scale, setScale] = React.useState(false);
  return (
    <motion.div id="searchbar_container"
        className="relative" animate={{ scale: scale ? 1.1 : 1 }} onClick={() => {setScale(!scale)}}>
      <input
        type="text"
        onChange={props.handleSearch}
        placeholder="Title, genre, author..."
        className="bg-light-purple dark:bg-purple py-3 px-4 pl-6 pr-12 rounded-full w-[275px] text-cream text-lg font-Poppins outline-none focus:ring-2 focus:ring-orange dark:focus:ring-cream placeholder:text-cream placeholder:text-opacity-80 dark:placeholder:text-light-purple"
      />

      <SearchIcon 
      onClick={props.searchBook}
      className="absolute top-[13px] left-[235px] text-orange object-contain w-[25px]" />
    </motion.div>
  );
};

export default SearchBar;
