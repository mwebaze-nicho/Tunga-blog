// import Link from "next/link";
// import { fetcher } from "@/controllers/fetchers/postsFetcher";
// import NotFoundPage from "./NotFoundPage";
// const { tokenInfo } = require("../controllers/tokenInfo");

// async function UserPosts() {
//   const { statusInfo, user } = await tokenInfo();

//   if (user) {
//     console.log(user);
//   }
//   // if (!userId) {
//   //   return <NotFoundPage />;
//   // }

//   // const res = await fetcher(`/posts/userposts?userId=${userId}`);
//   const res = "";

//   if (!res) {
//     return <p>No previous posts</p>;
//   }

//   const posts = await res.data;

//   return (
//     <div className="bg-white py-4">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//           {Array.isArray(posts) &&
//             posts.map((post, index) => {
//               const postDescription = post.description.slice(0, 150);
//               return (
//                 <article
//                   key={index}
//                   className="flex max-w-xl flex-col items-start justify-between"
//                 >
//                   <Link href={`post/${post._id}`}>
//                     <div className="group relative">
//                       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                         <a href="#">
//                           <span className="absolute inset-0" />
//                           {post.postName}
//                         </a>
//                       </h3>
//                       <p className="mt-5 text-sm leading-6 text-gray-600">
//                         {`${postDescription} ...`}
//                       </p>
//                     </div>
//                   </Link>
//                   <div className="flex items-center gap-x-4 text-xs">
//                     <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
//                       {post.category}
//                     </span>
//                   </div>
//                   <div className="relative mt-4 mb-6 flex items-center gap-x-4"></div>
//                 </article>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default UserPosts;
