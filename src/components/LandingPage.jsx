import Image from "next/image";
import Link from "next/link";

function LandingPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-gradient-to-tr from-blue-400/90 via-blue-300 to-blue-800/85 px-6 py-52 md:py-32 lg:px-8">
        <span className="flex flex-col md:flex-row h-full w-full justify-around items-center">
          <div className="text-center flex items-center justify-center flex-col md:w-1/2">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
              Tech 🧑🏽‍💻 Blog
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Final project at Tunga BE cohort 2
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Dive into the world of technology with insights on AI, Backend, Frontend, and Fullstack development.
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
          <Image
            className="opacity-80 hidden md:flex"
            src={"/code.png"}
            alt="code"
            width={400}
            height={400}
          />
        </span>
        <section className="mt-16 md:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              What You'll Find Here
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore the latest trends, tips, and best practices in the world of technology.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">AI</h3>
              <p className="mt-4 text-gray-600">
                Discover the fascinating world of Artificial Intelligence. From machine learning algorithms to neural networks, stay updated on the latest advancements.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Backend Development</h3>
              <p className="mt-4 text-gray-600">
                Learn about robust backend technologies, database management, and server-side logic that power modern applications.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Frontend Development</h3>
              <p className="mt-4 text-gray-600">
                Get insights on crafting beautiful and responsive user interfaces using the latest frontend frameworks and libraries.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Fullstack Development</h3>
              <p className="mt-4 text-gray-600">
                Understand how to integrate frontend and backend technologies to build complete web applications from scratch.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
