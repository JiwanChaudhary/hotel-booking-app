"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginScreen = () => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      router.push("/home");
    } catch (error) {
      console.log(error.response.data.message);
      setIsError(true);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold">Login</h1>
      <form
        className="flex flex-col items-center justify-between"
        onSubmit={handleSubmit}
      >
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="email"
          name="email"
          required
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="password"
          name="password"
          required
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        {isError && (
          <>
            <p>{error}</p>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <div className="flex flex-col items-center justify-between">
        <p>
          Do not have an account?{" "}
          <span>
            <Link href={"/register"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
