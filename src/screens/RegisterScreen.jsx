"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Success from "@/components/Success";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/register", user);
      setLoading(false);
      setSuccess(true);
      setUser("");
      router.push("/login");
    } catch (error) {
      console.log(error);
      setMatchPassword(true);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message={"Registration successfull"} />}
      <h1 className="text-center font-bold">Register</h1>
      <form
        className="flex flex-col items-center justify-between"
        onSubmit={handleSubmit}
      >
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="name"
          name="name"
          required
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      <div className="flex flex-col items-center justify-between">
        <p>
          Already have an account?{" "}
          <span>
            <Link href={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
