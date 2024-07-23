import { Link } from "react-router-dom";
import { BsArrowLeft, BsBoxArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-10 py-1 rounded-lg w-fit transition duration-300 ease-in-out transform hover:scale-110"
      >
        <BsBoxArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
