import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My Books App
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-gray-300">
                Books
              </Link>
              <Link to="/favorites" className="hover:text-gray-300">
                Favorites
              </Link>
              <Link to="/admin" className="hover:text-gray-300">
                AdminPanel
              </Link>
              <button
                onClick={() => logout()}
                className="hover:text-gray-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
