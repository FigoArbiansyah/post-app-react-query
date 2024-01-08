// import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";

interface PostInterface {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const { VITE_BASE_URL } = import.meta.env;

  const { isLoading, error, data } = useQuery("postData", async () => {
    const response = await fetch(VITE_BASE_URL);
    const data = await response.json();
    return data;
  });

  const simplifyTextBody = (text: string) => {
    return `${text.substring(0, 150)}...`;
  };

  if (isLoading) {
    return (
      <ErrorPage>
        <span>Loading...</span>
      </ErrorPage>
    );
  }

  if (error) {
    return (
      <ErrorPage>
        <span>Ada kesalahan pada aplikasi...</span>
      </ErrorPage>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 md:p-10 p-5">
      <section className="grid md:grid-cols-4 gap-4">
        {data?.posts?.map((post: PostInterface, index: number) => {
          return (
            <div
              key={index}
              className="p-4 b-white drop-shadow bg-white hover:-translate-y-2 transition-all ease duration-300"
            >
              <Link to={`/posts/${post?.id}`}>
                <h3 className="font-bold text-lg hover:underline">
                  {post?.title}
                </h3>
              </Link>
              <p className="text-slate-700 mt-3">
                {simplifyTextBody(post?.body)}
                <Link
                  to={`/posts/${post?.id}`}
                  className="text-black cursor-pointer hover:text-indigo-400"
                >
                  {" "}
                  Selengkapnya
                </Link>
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
