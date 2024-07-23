import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match. Please try again.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:5555/api/users/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        setLoading(false);
        login(response.data);
        enqueueSnackbar("Registered successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Registration failed. Please try again later.", {
          variant: "error",
        });
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">
          Register
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-xl mb-2 text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-sky-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-xl mb-2 text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-sky-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl mb-2 text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-sky-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-xl mb-2 text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-sky-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
