"use client";
import { useFeaturedPosts } from "@/services/queries";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function FeaturedPosts() {
  const { data } = useFeaturedPosts();

  return (
    <>
      {data && Array.isArray(data.data) && (
        <div className="bg-white py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <hr />
            <p className="text-lg text-gray-900 font-bold">Featured Posts</p>
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              navigation={false}
              pagination={{ clickable: true }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {data.data.map((post, index) => {
                const postDescription = post.description.slice(0, 150);
                return (
                  <SwiperSlide key={index}>
                    <article className="flex max-w-xl flex-col items-start justify-between shadow-lg p-4">
                      <Link href={`post/${post._id}`}>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a href="#">
                              <span className="absolute inset-0" />
                              {post.postName}
                            </a>
                          </h3>
                          <p className="mt-5 text-sm leading-6 text-gray-600">
                            {`${postDescription} ...`}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedPosts;
