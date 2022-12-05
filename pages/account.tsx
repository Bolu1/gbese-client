/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { withAuth } from "../components/withAuth";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [profile, setProfile] = useState("");

  const logoutHandler = () => {
    Cookie.remove("user");
    router.push("/");
  };

  const refreshHandler = async () => {
    try {
      setRefresh(true);
      const { data } = await axios.get(
        "https://gbese-server.onrender.com/user/me",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBalance(data.balance);
      setRefresh(false);
    } catch (error) {
      //nsole.log(error);
      setRefresh(false);
    }
  };

  useEffect(() => {
    const fetch = async (token: any) => {
      try {
        const { data } = await axios.get(
          "https://gbese-server.onrender.com/user/me",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(data.balance);
        setLoading(false);
      } catch (error) {
        //nsole.log(error);
        setLoading(false);
      }
    };
    if (Cookie.get("user")) {
      const u = JSON.parse(Cookie.get("user"));
      setUser(u);
      fetch(u.token);
    }
    setProfile(localStorage.getItem("gbeseprofile"));
  }, [setUser]);

  return (
    <div>
      {loading ? (
        <div
          style={{ minHeight: "100vh" }}
          className="flex items-center justify-center space-x-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full  animate-pulse bg-green-400"></div>
            <div className="w-4 h-4 rounded-full  animate-pulse bg-green-400"></div>
            <div className="w-4 h-4 rounded-full  animate-pulse bg-green-400"></div>
          </div>
        </div>
      ) : (
        <>
          {/* <!-- component --> */}
          <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
              <div className="-mx-6 px-6 py-4 mt-4 text-center">
                <a href="#" className="text-3xl " title="home">
                  Gbese
                </a>
              </div>

              <div className="mt-8 text-center">
                {profile == "" ? (
                  <p className="text-8xl">🙆🏾‍♂️</p>
                ) : (
                  <>
                    <img
                      src={profile}
                      alt=""
                      className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                    />
                  </>
                )}
                <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                  {user.name}
                </h5>
              </div>

              <ul className="space-y-2 tracking-wide mt-8">
                <li>
                  <a
                    href="#"
                    aria-label="dashboard"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600"
                    onClick={() => router.push("/dashboard")}
                  >
                    <svg
                      className="-ml-1 h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                        className="fill-current text-green-400 :fill-slate-600"
                      ></path>
                      <path
                        d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                        className="fill-current text-green-200 group-hover:text-green-300"
                      ></path>
                      <path
                        d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                        className="fill-current group-hover:text-sky-300"
                      ></path>
                    </svg>
                    <span className="-mr-1 font-medium">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        className="fill-current text-gray-400 :fill-slate-600"
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clip-rule="evenodd"
                      />
                      <path
                        className="fill-current text-gray-600 group-hover:text-green-600"
                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                      />
                    </svg>
                    <span className="group-hover:text-gray-700">Wallet</span>
                  </a>
                </li>
                <li>
                  <a
                    className="px-4 py-3 flex items-center cursor-pointer space-x-4 rounded-md text-gray-600 group"
                    onClick={() => router.push("/history")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        className="fill-current text-gray-600 group-hover:text-green-600"
                        fill-rule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clip-rule="evenodd"
                      />
                      <path
                        className="fill-current text-gray-300 group-hover:text-green-300"
                        d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                      />
                    </svg>
                    <span className="group-hover:text-gray-700">History</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-green-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fill-current text-gray-600 group-hover:text-green-600"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="group-hover:text-gray-700">Account</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <button
                onClick={logoutHandler}
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 hover:text-red-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className=" text-gray-700 group-hover:text-red-600">
                  Logout
                </span>
              </button>
            </div>
          </aside>
          {/* end of side bar */}

          <div className="ml-auto px-5 mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            <div>
              <div className="mt-16 text-center">
                {profile == "" ? (
                  <p className="text-8xl">🙆🏾‍♂️</p>
                ) : (
                  <>
                    <img
                      src={profile}
                      alt=""
                      className="w-28 h-28 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                    />
                  </>
                )}
                <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                  {user.name}
                </h5>
              </div>
              <div className="mt-6 flex justify-center">
                {!loading ? (
                  <button
                    onClick={() => router.push("/edit")}
                    className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-gray-600"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                    <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                    <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid mt-5 grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-2">
              <div className="flex justify-between p-6 border rounded-lg sm:p-8 dark:bg-coolGray-900 dark:text-coolGray-100">
                <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <p className="text-gray-600 md:ml-6">Account Number</p>
                  <p className="text-green-600 font-bold text-3xl">
                    {user.number}
                  </p>
                </div>
              </div>

              <div className="flex justify-between p-6 border rounded-lg sm:p-8 dark:bg-coolGray-900 dark:text-coolGray-100">
                <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <p className="text-gray-600 md:ml-6">Account Name</p>
                  <p className="text-green-600 font-bold text-3xl">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-between p-6 border rounded-lg sm:p-8 dark:bg-coolGray-900 dark:text-coolGray-100">
                <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <p className="text-gray-600 md:ml-6">Account Name</p>
                  <p className="text-green-600 font-bold text-3xl">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-between p-6 border rounded-lg sm:p-8 dark:bg-coolGray-900 dark:text-coolGray-100">
                <button
                  onClick={logoutHandler}
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 text-red-600 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className=" text-gray-700 text-xl text-red-600">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            style={{ top: "90vh" }}
            className=" flex space-x-5 lg:hidden  w-full px-5 py-4 flex-shrink-0 justify-between  bg-white rounded-md text-indigo-600"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => router.push("/dashboard")}
            >
              <path
                strokeLinecap="round"
                className="fill-current text-gray-600 cursor-pointer hover:text-green-500"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => router.push("/wallet")}
            >
              <path
                className="fill-current text-gray-300 cursor-pointer hover:text-green-500"
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                className="fill-current text-gray-600 group-hover:text-green-600"
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => router.push("/history")}
            >
              <path
                className="fill-current text-gray-600 cursor-pointer hover:text-green-500"
                fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clip-rule="evenodd"
              />
              <path
                className="fill-current text-gray-300 group-hover:text-green-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => router.push("/account")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-current text-gray-600 cursor-pointer hover:text-green-500"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(Dashboard);
