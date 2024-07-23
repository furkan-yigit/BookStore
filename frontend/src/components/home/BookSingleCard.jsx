import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={book._id}
      className=" border-2 border-gray-200 rounded-lg px-6 py-8 m-4 relative hover:shadow-2xl transition-shadow duration-300 bg-white"
    >
      <h2 className="absolute top-2 right-2 px-4 py-1 bg-primary-light text-primary-dark rounded-lg shadow-md">
        {book.publishYear}
      </h2>
      <h4 className="my-2 text-gray-500 text-xs">{book._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-primary-dark text-2xl" />
        <h2 className="my-1 text-lg font-semibold">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-primary-dark text-2xl" />
        <h2 className="my-1 text-md">{book.author}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-6 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer transition-transform duration-200 transform hover:scale-125"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black cursor-pointer transition-transform duration-200 transform hover:scale-125" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black cursor-pointer transition-transform duration-200 transform hover:scale-125" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black cursor-pointer transition-transform duration-200 transform hover:scale-125" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
