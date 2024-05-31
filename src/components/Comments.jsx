"use client";
import Image from "next/image";

function Comments({ comments }) {
  return (
    <div className="card">
      <span className="title">Comments</span>
      <div className="comments">
        <div className="comment-container">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => {
              return (
                <span key={index} className="mb-3 md:mb-6">
                  <div className="user">
                    <div className="user-pic">
                      <Image
                        src={"/person.jpeg"}
                        alt="poster"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="user-info">
                      <span>{comment.commentor}</span>
                      <span className=" font-light ">{comment.date}</span>
                    </div>
                  </div>
                  <p className="comment-content">{comment.comment}</p>
                </span>
              );
            })
          ) : (
            <p>No comments</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Comments;
