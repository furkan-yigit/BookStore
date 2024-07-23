import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineStar } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const BooksTable = ({ books }) => {
  const { user, addToFavorites } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddToFavorites = (bookId) => {
    if (user) {
      addToFavorites(bookId)
        .then(() => {
          enqueueSnackbar("Book added favorites succesfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar("Error", { variant: "error" });
        });
    } else {
      enqueueSnackbar("User not logged in!", { variant: "error" });
    }
  };
  return (
    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-sky-600 text-white">
          <th className="py-3 px-4">No</th>
          <th className="py-3 px-4">Title</th>
          <th className="py-3 px-4 max-md:hidden">Author</th>
          <th className="py-3 px-4 max-md:hidden">Publish Year</th>
          <th className="py-3 px-4">Genre</th>
          <th className="py-3 px-4">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="even:bg-gray-100 odd:bg-white">
            <td className="py-2 px-4 text-center">{index + 1}</td>
            <td className="py-2 px-4 text-center">{book.title}</td>
            <td className="py-2 px-4 text-center max-md:hidden">
              {book.author}
            </td>
            <td className="py-2 px-4 text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="py-2 px-4 text-center max-md:hidden">
              {book.genre}
            </td>
            <td className="py-2 px-4 text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600 transition-colors duration-300 transition-transform duration-200 transform hover:scale-125" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400 transition-colors duration-300 transition-transform duration-200 transform hover:scale-125" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400 transition-colors duration-300 transition-transform duration-200 transform hover:scale-125" />
                </Link>
                <AiOutlineStar
                  onClick={() => handleAddToFavorites(book._id)}
                  className="text-2xl text-gray-600 hover:text-yellow-500 transition-colors duration-300 transition-transform duration-200 transform hover:scale-125 cursor-pointer"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
