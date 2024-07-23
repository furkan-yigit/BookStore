import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5555/api/users/favorites`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Favorites fetched:", response.data);
          setFavorites(response.data);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold my-8 text-center text-sky-600">
        Favorites
      </h1>
      <div className="max-w-lg mx-auto">
        <ul className="divide-y divide-gray-200">
          {favorites.map((book) => (
            <li key={book._id} className="py-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold">{book.title}</p>
                  <p className="text-gray-500">{book.author}</p>
                </div>
                {/* Extra  */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
