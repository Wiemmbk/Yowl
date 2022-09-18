import defaultAvatar from "../../images/logo/default_avatar_2.png";
import { Link } from "react-router-dom";
const Reply = (props) => {
  return (
    <>
      {props.comments.map((comment) => {
        if (
          comment.book_id === props.book_id &&
          comment.parent === props.comment_id
        ) {
          return (
            <div
              key={comment.id}
              className="flex items-center justify-between px-1 pb-4 pt-4 border-t-[2px] border-light-purple dark:border-cream border-dashed"
            >
              <div className="flex flex-row-reverse items-start gap-2">
                {/* Avatar de l'utilisateur */}
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  className="h-[35px] object-contain"
                />
                <div className="flex flex-col text-right tracking-tighter gap-2 text-sm">
                  <div className="flex flex-row flex-wrap gap-1 text-sm">
                    {/* Nom de l'utilisateur */}
                    <p className="text-orange font-Poppins font-semibold ">
                      {comment.username}
                    </p>

                    <p className="text-light-purple font-Poppins">replied :</p>
                  </div>

                  {/* Commentaire */}
                  <Link to={`/AllComments/${comment.id}/${comment.book_id}`}>
                  <p className="text-purple font-Poppins tracking-normal">
                    {comment.content}
                  </p>
                  </Link>

                  {/* Date de publication du commentaire */}
                  <p className="font-Poppins text-light-purple tracking-tighter text-sm">
                    Published on {comment.publication_date}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Reply;
