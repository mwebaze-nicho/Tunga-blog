"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/config/axiosConfig";

function RegisterForm() {
  const [userDetails, setuserDetails] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const { data: session } = useSession();

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setuserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session) {
      router.push("/");
      return;
    }

    try {
      const { userName, userEmail, userPassword } = userDetails;

      //new user data
      const userData = {
        username: userName,
        email: userEmail,
        password: userPassword,
      };

      await api.post("/users", userData);

      //push to user login
      router.push("/users/login");
    } catch (error) {
      console.log(error);
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
            Register
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="User name"
              name="userName"
              type="text"
              value={userDetails.userName}
              minLength={6}
              required
              onChange={handleChange}
            />
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Email"
              name="userEmail"
              type="email"
              value={userDetails.userEmail}
              required
              onChange={handleChange}
            />
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Password"
              name="userPassword"
              value={userDetails.userPassword}
              onChange={handleChange}
              required
              minLength={6}
              type="password"
            />
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>

            {/* Login if registered */}
            <div>
              <p>
                Already registered:{" "}
                <Link
                  className="text-blue-500 hover:text-blue-800 text-sm"
                  href="/users/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
