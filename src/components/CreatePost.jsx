"use client";
import "./createPostForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import { CldUploadWidget, CldImage } from "next-cloudinary";
function CreatePost() {
  const [postDetails, setPostDetails] = useState({
    title: "",
    category: "AI",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

    setIsLoading(true);

    const { title, category, description } = postDetails;

    const newPost = {
      postName: title,
      category,
      description,
      postImage: imageUrl,
    };

    try {
      await api.post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);

      //send error
    } catch (error) {
      console.log(error);
    }
  };

  //login if not logged in

  if (!session) return <LoginForm />;

  return (
    <form
      className="flex min-h-full  w-full p-6 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex items-center justify-center">
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
                name="title"
                minLength={6}
                onChange={handleChange}
                required
              />
              <p className="input__description">6 minimun characters</p>
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
                minLength={30}
                onChange={handleChange}
                required
              />
              <p className="input__description">30 minimun characters</p>
            </div>
            <div className="input">
              <label className="input__label">Post Image</label>

              <CldUploadWidget
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                resourceType="image"
                multiple={false}
                clientAllowedFormats={["jpg", "jpeg", "png"]}
                maxFileSize={5000000}
              >
                {({ open, results, widget }) => {
                  if (results) {
                    const imageUrl = results.info.secure_url;
                    setImageUrl(imageUrl);

                    widget.close();
                  }
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      disabled={imageUrl !== ""}
                      className={`input__field w-full h-full text-left  ${
                        imageUrl !== "" && "cursor-not-allowed text-blue-600"
                      }`}
                    >
                      {imageUrl === "" ? "Upload Image" : "Image uploaded"}
                    </button>
                  );
                }}
              </CldUploadWidget>

              <p className="input__description">
                Must be jpg, jpeg and png formats{" "}
              </p>
            </div>
          </div>
          <div className="modal__footer">
            <button
              type="submit"
              className="button button--primary"
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreatePost;
