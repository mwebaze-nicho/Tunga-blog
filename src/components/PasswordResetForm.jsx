"use client";
import Link from "next/link";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/config/axiosConfig";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  //get token from the query
  const searchparams = useSearchParams();
  const token = searchparams.get("token");

  if (!token) {
    alert("Request token to use this page");
    router.push("/users/forgotpassword");
    return;
  }

  //get user details from the token
  const { user } = jwt.decode(token);

  if (!user) {
    seterror("No user specified");
    router.push("/");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await api.patch(
        "/api/users/reset",
        {
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.error) {
        seterror("Failed to update password");
        return null;
      }

      setTimeout(() => {
        alert(res.data.message);
        router.push("/users/login");
      }, 1000);
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
            New Password
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="User name"
              name="userName"
              type="text"
              value={user && user.userName.toUpperCase()}
              disabled
            />
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="New password"
              name="updatedPassword"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {error && <p className="text-red-500 text-left">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Updating" : "Update Password"}
            </button>

            {/* Create account if not yet registered */}
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
export default PasswordReset;
