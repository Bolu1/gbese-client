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

  const loginHandler = async (e): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    try {
      //nsole.log(email, password);
      const { data } = await axios.post(
        "https://gbese-client.herokuapp.com/auth/signin",
        { email, password }
      );
      localStorage.setItem("gbeseprofile", data.profile);
      const payload = {
        ...data,
        profile: null,
      };
      //nsole.log(payload);
      Cookies.set("user", JSON.stringify(payload), { expires: 1 / 24 });
      router.push("/dashboard");
    } catch (e) {
      const err = e.toString();
      if (err[err.length - 1] == "1") {
        toast.error(
          "Your account has not yet been verified, please verify your email"
        );
        return setLoading(false);
      }
      toast.error("Invalid login params");

      // //nsole.log(e);
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
          <h1 className="text-3xl font-semibold text-center text-green-500 :text-white">
            Gbese
          </h1>

          <form className="mt-6" onSubmit={loginHandler}>
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
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-800 :text-gray-200">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-600 :text-gray-400 hover:underline"
                >
                  Forget Password?
                </a>
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
                  Login
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
            Don not have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-gray-700 :text-gray-200 hover:underline"
            >
              Create One
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });
