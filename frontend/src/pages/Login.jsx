import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      enqueueSnackbar("Logged in successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Login failed. Please check your credentials.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-600">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
