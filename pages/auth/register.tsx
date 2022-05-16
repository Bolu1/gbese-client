/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const registerHandler = async (e): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 6) {
      toast.error("Pasword too short");
      return setLoading(false);
    }
    try {
      const response = await axios.post(
        "https://gbese-client.herokuapp.com/auth/signup",
        { email, password, lastName, firstName, phone }
      );
      //nsole.log(response);
      router.push("/notification/confirm");
    } catch (e) {
      toast.error("Email already in use");
      //nsole.log(e);
    }

    setLoading(false);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeOnClick
      />
      <div
        style={{ minHeight: "100vh" }}
        className="flex justify-center bg-gray-100"
      >
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md :bg-gray-800">
          <h1 onClick={()=>router.push("/")} className="text-3xl font-semibold text-center cursor-pointer text-green-500 :text-white">
            Gbese
          </h1>

          <form className="mt-6" onSubmit={registerHandler}>
            <div>
              <label className="block text-sm text-gray-800 :text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-800 :text-gray-200">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm  text-gray-800 :text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm  text-gray-800 :text-gray-200">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-800 :text-gray-200">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              {!loading ? (
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-gray-600">
                  Register
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                </div>
              )}
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-gray-700 :text-gray-200 hover:underline"
            >
              login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });
