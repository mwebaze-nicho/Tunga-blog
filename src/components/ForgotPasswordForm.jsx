"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/config/axiosConfig";

function ForgotPassword() {
  const [userName, setUserName] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const confirmed = confirm(
        "Are you sure you want to reset your password?"
      );

      if (confirmed) {
        const res = await api.post("/api/users/reset", { userName });

        if (res.error) {
          seterror("Password change request failed");
          return null;
        }

        setTimeout(() => {
          alert("Check your email and reset password.");
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log("An error occured registering user");
    }
  };

  return (
    <div className="h-96 flex items-center justify-center mt-24 ">
      <div className="relative">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 shadow-lg animate-pulse"></div>
        <div
          id="form-container"
          className="bg-white p-8 md:p-10 rounded-lg shadow-2xl w-80 relative transform transition duration-500 ease-in-out"
        >
          <h2
            id="form-title"
            className="text-center text-3xl font-bold mb-10 text-gray-800"
          >
            Submit Request
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Registered username"
              name="userName"
              type="text"
              required
              minLength={6}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {error && <p className="text-red-500 text-left">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Submitting" : "Forgot Password"}
            </button>
            <div>
              <p>
                No account:{" "}
                <Link
                  className="text-blue-500 hover:text-blue-800 text-sm"
                  href="/users/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
