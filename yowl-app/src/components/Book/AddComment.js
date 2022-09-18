import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

class AddComment extends React.Component {
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
    
    this.handleInput = this.handleInput.bind(this)
    this.addComment = this.addComment.bind(this)
}

handleInput(e){  
    this.setState({
        currentComment:{
            content: e.target.value,
            user_id: Cookies.get('userId'),            
            username: Cookies.get('username'),
            book_id: this.props.bookId,
            parent: 0
        }
    })
}
addComment(e){
    e.preventDefault()
    const newComment = this.state.currentComment
    console.log(newComment)

    axios.post('https://yowl-project-api.herokuapp.com/comments', newComment)
    this.props.setComments(current => [...current, newComment])
    this.handleToggle()
  }

  render() {
    return (
      <div className="w-full">
        {this.state.show ? (
          <div
            onClick={this.handleToggle}
            className="flex items-center w-full bg-light-purple rounded-full py-2 px-2 gap-3"
          >
            <PlusIcon className="text-cream bg-orange rounded-full p-1 object-contain w-[40px]" />
            <button className="font-Poppins text-cream">
              Join the conversation!
            </button>
          </div>
        ) : null}

        {!this.state.show ? (
          <div className="flex flex-col items-start text-left border-[3px] rounded-md border-light-purple bg-cream dark:border-cream border-dashed p-3">
            <form onSubmit={this.addComment}>
              <textarea
                type="text"
                placeholder="Add a comment..."
                className="h-[120px] w-full bg-cream rounded text-purple text-lg font-Poppins outline-none placeholder:text-light-purple placeholder:text-opacity-75 "
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
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddComment;
