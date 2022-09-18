import { motion } from "framer-motion";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

class ReplyButton extends React.Component {
  state = { show: true };

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      currentComment: {
        content: "",
        user_id: "",
        book_id: "",
        parent: "",
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentComment: {
        content: e.target.value,
        user_id: Cookies.get("userId"),
        username: Cookies.get("username"),
        book_id: this.props.book_id,
        parent: this.props.commentId,
      },
    });
  }
  addComment(e) {
    e.preventDefault();
    const newComment = this.state.currentComment;
    console.log(newComment);

    axios.post("https://yowl-project-api.herokuapp.com/comments", newComment);
    this.props.setComments((current) => [...current, newComment]);
    this.handleToggle();
  }
  render() {
    return (
      <div>
        {!this.state.show ? (
          <button
            onClick={this.handleToggle}
            className="bg-orange font-Poppins text-white px-3 py-1 rounded-md text-lg font-semibold"
          >
            Reply
          </button>
        ) : null}

        {this.state.show ? (
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            className="flex flex-col items-start text-left border-[3px] rounded-md border-light-purple dark:border-cream border-dashed p-3"
          >
            <div onClick={this.handleToggle}>X</div>
            <form onSubmit={this.addComment}>
              <textarea
                type="text"
                placeholder="Write a comment..."
                className="h-[120px] bg-cream rounded text-purple text-lg font-Poppins outline-none placeholder:text-light-purple placeholder:text-opacity-75 "
                value={this.state.currentComment.content}
                onChange={this.handleInput}
              />
              <button
                type="submit"
                className="mt-2 bg-orange font-Poppins rounded-md text-white px-3 py-1 text-lg font-semibold"
              >
                Send
              </button>
            </form>
          </motion.div>
        ) : null}
      </div>
    );
  }
}

export default ReplyButton;
