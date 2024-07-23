import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-6 flex flex-col relative shadow-lg"
      >
        <AiOutlineClose
          className="absolute right-4 top-4 text-3xl text-red-600 cursor-pointer hover:text-red-800 transition-colors"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-primary-light rounded-lg text-lg font-semibold">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500 text-sm">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <PiBookOpenTextLight className="text-primary-light text-2xl" />
          <h2 className="text-xl font-bold">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2 mt-2">
          <BiUserCircle className="text-primary-light text-2xl" />
          <h2 className="text-lg">{book.author}</h2>
        </div>
        <div className="mt-4">
          <h3>Genre:</h3>
          <p className="text-gray-700"> {book.genre}</p>
          <hr />
          <h3>Summary:</h3>
          <p className="my-2 text-gray-600"> {book.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
