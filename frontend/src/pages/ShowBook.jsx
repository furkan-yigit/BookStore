import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-4xl font-bold my-8 text-center text-sky-600">
        Show Book
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-xl mx-auto p-6 shadow-lg">
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Id:
            </span>
            <span className="text-lg text-gray-900">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Title:
            </span>
            <span className="text-lg text-gray-900">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Author:
            </span>
            <span className="text-lg text-gray-900">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Publish Year:
            </span>
            <span className="text-lg text-gray-900">{book.publishYear}</span>
          </div>
          {book.coverImage && (
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Cover Image:
              </span>
              <img
                src={book.coverImage}
                alt="Cover"
                className="w-full max-w-md"
              />
            </div>
          )}
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Summary:
            </span>
            <span className="text-lg text-gray-900">{book.summary}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Genre:
            </span>
            <span className="text-lg text-gray-900">{book.genre}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Ratings:
            </span>
            <span className="text-lg text-gray-900">{book.ratings}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Publisher:
            </span>
            <span className="text-lg text-gray-900">{book.publisher}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Create Time:
            </span>
            <span className="text-lg text-gray-900">
              {new Date(book.createdAt).toString()}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold mr-4 text-gray-700">
              Last Update Time:
            </span>
            <span className="text-lg text-gray-900">
              {new Date(book.updatedAt).toString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
