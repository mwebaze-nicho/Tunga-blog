"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function LandingPage() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (session?.user) {
      const name =
        (session?.user?.userName).charAt(0).toUpperCase() +
        (session?.user?.userName).slice(1);

      setUserName(name);
    }
  }, [session]);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-gradient-to-tr from-blue-800/90 via-blue-300 to-blue-800/85 px-6 py-52 md:py-32 lg:px-8 relative">
        {userName && (
          <p className="absolute left-6 top-6 text-gray-800">
            ✨✨ Hello, {userName} ✨✨
          </p>
        )}
        <span className="flex flex-col md:flex-row justify-around items-center  h-full w-full">
          <div className="text-center flex items-center justify-center flex-col md:w-1/2 ">
            <h1 className="my-4 text-6xl font-bold tracking-tight text-gray-800 sm:text-8xl">
              <span className="ml-[-100px]">
                DAILY <span className="text-white">DEV</span>{" "}
              </span>
              <span className="ml-[100px]">INSIGHTS</span>
            </h1>
            <p className="mt-4 text-lg leading-7 text-gray-800">
              Dive into the world of technology with insights on AI, Backend,
              Frontend, and Fullstack development.
            </p>
            <div className="mt-10 gap-x-6">
              <Link
                href={"#blogs"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="text-center">
            <Image
              className="opacity-80 hidden md:flex"
              src={"/dev-digest.png"}
              alt="logo"
              width={400}
              height={400}
            />

            <span className="md:hidden py-6 w-full flex justify-center items-center">
              <Image
                className="opacity-80"
                src={"/dev-digest.png"}
                alt="logo"
                width={250}
                height={250}
              />
            </span>
          </div>
        </span>
        <section className="mt-16 md:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              What You&apos;ll Find Here
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              Explore the latest trends, tips, and best practices in the world
              of technology.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">AI</h3>
              <p className="mt-4 text-gray-600">
                Discover the fascinating world of Artificial Intelligence. From
                machine learning algorithms to neural networks, stay updated on
                the latest advancements.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Backend Development
              </h3>
              <p className="mt-4 text-gray-600">
                Learn about robust backend technologies, database management,
                and server-side logic that power modern applications.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Frontend Development
              </h3>
              <p className="mt-4 text-gray-600">
                Get insights on crafting beautiful and responsive user
                interfaces using the latest frontend frameworks and libraries.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Fullstack Development
              </h3>
              <p className="mt-4 text-gray-600">
                Understand how to integrate frontend and backend technologies to
                build complete web applications from scratch.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
