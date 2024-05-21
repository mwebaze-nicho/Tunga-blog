"use client";
import "./createPostForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
function CreatePost() {
  const [postDetails, setPostDetails] = useState({
    title: "",
    category: "AI",
    description: "",
  });

  const { data: session } = useSession();

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  //creating new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, description } = postDetails;

    const newPost = { postName: title, category, description };

    try {
      await api.post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      router.push("/");

      //send error
    } catch (error) {
      console.log(error);
    }
  };

  //login if not logged in

  if (!session) return <LoginForm />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        {!session && <LoginForm />}
        <div className="modal">
          <div className="modal__header">
            <span className="modal__title">Create a post</span>
          </div>
          <div className="modal__body">
            <div className="input">
              <label className="input__label">Title</label>
              <input
                className="input__field"
                type="text"
                minLength={10}
                maxLength={30}
                name="title"
                onChange={handleChange}
                required
              />
              <p className="input__description">
                10 minimun and 30 maximum characters
              </p>
            </div>
            <div className="input">
              <label className="input__label">Category</label>
              <select
                name="category"
                onChange={handleChange}
                className="input__field"
              >
                <option value="AI">AI</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="FullStack">FullStack</option>
              </select>
              <p className="input__description">
                Choose the category for the post
              </p>
            </div>

            <div className="input">
              <label className="input__label">Description</label>
              <textarea
                className="input__field input__field--textarea"
                defaultValue={""}
                name="description"
                onChange={handleChange}
                minLength={50}
                maxLength={1000}
                required
              />
              <p className="input__description">
                50 minimum and 1000 maximum characters
              </p>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="button button--primary">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreatePost;
