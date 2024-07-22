import { UserData } from "@/data/UserData";
import moment from "moment";
import { useRef, useState } from "react";

interface Comment {
  comment: string;
  userId: string;
  date: Date;
}

const Comment = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Array<Comment>>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      if (comment.trim() === "") {
        return;
      }
      const newComment: Comment = {
        comment: comment,
        userId: "user1",
        date: new Date(),
      };

      const newComments = [...comments, newComment];

      const sortedComments = newComments.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });

      setComments(sortedComments);

      setComment("");
    }
  };

  return (
    <>
      <div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <textarea
            className="w-full h-full p-5 rounded-lg border border-gray-200"
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            disabled={comment.trim() === ""}
            className="w-full h-fit px-5 py-2 rounded-lg bg-gray-3 text-primary disabled:text-gray-4"
          >
            Comment
          </button>
        </form>

        <div className="flex flex-col gap-5 mt-5" ref={commentContainerRef}>
          {comments.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

type CommentProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentProps) => {
  const user = UserData.find((user) => user.userId === comment.userId);
  return (
    <>
      <div className="flex flex-col gap-5 p-5 rounded-lg border border-gray-200">
        <div className="flex gap-5 items-center">
          <picture className="w-13 h-13">
            <img
              src={`/images/${user?.profileImage}`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <div>
            <p>{user?.name}</p>
            <p className="text-gray-500">
              {moment(comment.date).format("MMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
        <p>{comment.comment}</p>
      </div>
    </>
  );
};

export default Comment;
