import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ImageUpload from "../components/ImageUpload";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");
  const [ratings, setRatings] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const {
          title,
          author,
          publishYear,
          coverImage,
          summary,
          genre,
          ratings,
          publisher,
        } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setCoverImage(coverImage);
        setSummary(summary);
        setGenre(genre);
        setRatings(ratings);
        setPublisher(publisher);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check console.", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
      coverImage,
      summary,
      genre,
      ratings,
      publisher,
    };
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check console.", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-4xl font-bold my-8 text-center text-sky-600">
        Edit Book
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <form
          className="max-w-lg mx-auto border-2 border-gray-300 p-6 rounded-xl shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditBook();
          }}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-xl font-semibold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishYear"
              className="block text-xl font-semibold mb-2"
            >
              Publish Year
            </label>
            <input
              type="number"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="summary"
              className="block text-xl font-semibold mb-2"
            >
              Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-xl font-semibold mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ratings"
              className="block text-xl font-semibold mb-2"
            >
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="block text-xl font-semibold mb-2"
            >
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg us:outline-none focus:border-sky-500"
              required
            />
          </div>
          <ImageUpload
            onUploadSuccess={(downloadURL) => setCoverImage(downloadURL)}
            setUploading={setUploading}
          />
          {uploading && <Spinner />}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBook;
