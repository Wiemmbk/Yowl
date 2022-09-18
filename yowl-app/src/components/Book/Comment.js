import defaultAvatar from "../../images/logo/default_avatar_2.png";
// import { HeartIcon } from "@heroicons/react/solid";
// import { HeartIcon  as SansBordure } from "@heroicons/react/outline";
import ReplyButton from "./ReplyButton";
import Reply from "./Reply";
import { Link } from "react-router-dom";

const Comment = (props) => {
  return (
    <>
      {props.comments.map((comment) => {
        if (comment.book_id === props.book_id && comment.parent === 0) {
          return (
            <div
              key={comment.id}
              className="flex items-center justify-between w-full border-b-[3px] border-light-purple dark:border-cream border-dashed px-1 pb-4"
            >
              <div className="flex flex-row items-start gap-2">
                {/* Avatar de l'utilisateur */}
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  className="h-[40px] object-contain"
                />
                <div className="flex flex-col text-left gap-3">
                  <div>
                    <h1 className="text-orange font-Poppins font-semibold text-lg">
                      {comment.username}
                    </h1>
                    <Link to={`/AllComments/${comment.id}/${comment.book_id}`}>
                      <p className="text-purple font-Poppins">
                        {comment.content}
                      </p>
                    </Link>
                  </div>

                  {/* Nom de l'utilisateur */}

                  {/* Commentaire */}

                  <div className="flex flex-row items-center justify-between">
                    {/* Date de publication du commentaire */}
                    <p className="font-Poppins text-light-purple tracking-tighter text-sm">
                      {comment.publication_date}
                    </p>
                    {/* { comment.rate ? ( 
                        <div className="flex flex-col items-center">
                        <HeartIcon className="text-light-purple w-[30px]" />
                      </div>) : (<div className="flex flex-col items-center">
                        <SansBordure className="text-light-purple w-[30px]" />
                      </div>)} */}
                  </div>

                  <Reply
                    comments={props.comments}
                    book_id={props.book_id}
                    comment_id={comment.id}
                  />

                  <div>
                    <ReplyButton
                      commentId={comment.id}
                      book_id={props.book_id}
                      setComments={props.setComments}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Comment;
