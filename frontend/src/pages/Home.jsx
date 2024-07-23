import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg transition-transform duration-200 transform hover:scale-125 ${
            showType === "table"
              ? "bg-sky-600 text-white"
              : "bg-sky-300 text-black"
          }`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-transform duration-200 transform hover:scale-125 ${
            showType === "card"
              ? "bg-sky-600 text-white"
              : "bg-sky-300 text-black"
          }`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-5xl hover:text-sky-600 transition-colors duration-300 transition-transform  transform hover:scale-110" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
