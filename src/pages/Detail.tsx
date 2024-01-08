// import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";

const Detail = () => {
  const { VITE_BASE_URL } = import.meta.env;
  const { id } = useParams();

  const { isLoading, error, data } = useQuery("postData", async () => {
    const url = `${VITE_BASE_URL}/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  console.log(data);

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
    <main className="md:p-10 p-5 bg-white">
      <section>
        <Link
          to="/"
          className="flex items-center gap-1 hover:gap-2 transition-all ease"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span>Kembali</span>
        </Link>
        <h2 className="text-xl font-semibold mt-3">{data?.title}</h2>
        <p className="mt-3 text-slate-800">{data?.body}</p>
      </section>
    </main>
  );
};

export default Detail;
