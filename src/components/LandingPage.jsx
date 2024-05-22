import Image from "next/image";
import Link from "next/link";
function LandingPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-gradient-to-tr from-blue-400/90 via-blue-300 to-blue-800/85 px-6  py-52 md:py-32 lg:px-8 ">
        <span className="flex flex-col md:flex-row h-full w-full justify-around item-center">
          <div className="text-center flex items-center justify-center flex-col">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
              Tech Blog
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Final project at Tunga BE cohort 2
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
      </main>
    </>
  );
}
export default LandingPage;
