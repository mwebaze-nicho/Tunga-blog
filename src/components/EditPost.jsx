"use client";
import "./createPostForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";

function EditPost({ id, title, category, description }) {
  const [newTitle, setNewTitle] = useState(title && title);
  const [newCategory, setNewCategory] = useState(category && category);
  const [newDescription, setNewDescription] = useState(
    description && description
  );

  const { data: session, status } = useSession();

  const router = useRouter();

  //creating new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      postName: newTitle,
      category: newCategory,
      description: newDescription,
    };

    try {
      await api.patch(`/api/posts/${id}`, updatedPost);

      router.push("/");

      //send error
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated" || !session) {
    return <LoginForm />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
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
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
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
                onChange={(e) => setNewCategory(e.target.value)}
                className="input__field"
                value={newCategory}
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
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
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
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default EditPost;
