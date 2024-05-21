"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";

function CreateComment(props) {
  const [comment, setComment] = useState("");

  const { data: session } = useSession();

  const router = useRouter();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  //creating new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      router.push("/users/login");
      return;
    }

    if (comment === "") {
      alert("Type comment");
      return;
    }

    try {
      const newComment = { comment: comment };
      const comm = await api.post(`/api/posts/${props.postId}/comment`, newComment, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      console.log(comm);

      setComment("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="text-box">
        <form onSubmit={handleSubmit}>
          <div className="box-container">
            <textarea
              placeholder="Comment"
              rows={6}
              value={comment}
              onChange={handleChange}
              required
            />
            <span className="formatting">
              <button type="submit" className="send" title="Post">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height={18}
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    stroke="#ffffff"
                    d="M12 5L12 20"
                  />
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    stroke="#ffffff"
                    d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                  />
                </svg>
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateComment;
