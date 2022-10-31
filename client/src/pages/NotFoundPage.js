import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center text-3xl text-white">
      <h1>Error 404 - Not Found</h1>
      <Link
        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none"
        to="/"
      >
        Go Home!
      </Link>
    </div>
  );
}
