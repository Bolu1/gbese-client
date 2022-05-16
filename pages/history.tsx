/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { withAuth } from "../components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallet = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const logoutHandler = () => {
    Cookie.remove("user");
    router.push("/");
  };
  const [profile, setProfile] = useState("");

  const transferHandler = async () => {
    setLoading(true);
    try {
      //nsole.log(user.token);
      const response = await axios.get(
        "https://gbese-client.herokuapp.com/transaction/history",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      //nsole.log(response.data);
      setLoading(false);
      toast.success("Transaction Successful");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      //nsole.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetch = async (token: any) => {
      try {
        const { data } = await axios.get(
          "https://gbese-client.herokuapp.com/transaction/history",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data);
        //nsole.log(data);
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
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeOnClick
      />
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
                    className="w-20 h-20 m-auto rounded-full object-cover lg:w-28 lg:h-28"
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
                  onClick={() => router.push("/wallet")}
                  className="px-4 py-3 flex items-center space-x-4 cursor-pointer rounded-md text-gray-600 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-430 :fill-slate-600"
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
                  href="#"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-green-500"
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
                  onClick={() => router.push("/account")}
                  className="px-4 py-3 flex items-center space-x-4 cursor-pointer rounded-md text-gray-600 group"
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

        <div className="ml-auto mb-16 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          {/* content */}

          <div className="p-8">
            <p className="text-2xl font-medium">Transaction History</p>
          </div>

          <div>
            <div className="container px-8">
              <table className="text-left w-full">
                <thead className="bg-white flex text-black shadow-md w-full">
                  <tr className="flex w-full mb-4">
                    <th className="p-4 w-1/4">Amount</th>
                    <th className="p-4 w-1/4">Debitor/Creditor</th>
                    <th className="p-4 invisible lg:visible w-1/4">Date</th>
                    <th className="p-4  w-1/4">Type</th>
                  </tr>
                </thead>

                <tbody
                  className="bg-grey-light flex flex-col items-center  overflow-x-scroll w-full"
                  style={{ height: "50vh", overflow: "scroll" }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center mt-8 space-x-2">
                      <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                      <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                      <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
                    </div>
                  ) : (
                    <>
                      {data.length ? (
                        <>
                          {data.map((d) => (
                            <tr key={d.id} className="flex w-full ">
                              <td className="p-4 w-1/4">{d.amount}</td>
                              <td className="p-4 w-1/4">
                                {" "}
                                {d.debitorAccount == "0"
                                  ? "Fund Wallet"
                                  : d.debitorAccount}{" "}
                                / {d.creditorAccount}
                              </td>
                              <td className="p-4 w-1/4 invisible lg:visible ">
                                {d.createdAt}
                              </td>
                              {d.debitorAccount == user.number ? (
                                <td className="pt-2 w-1/4">
                                  <button className="bg-red-200 text-red-600 font-bold py-2 px-4 rounded-full">
                                    Debit
                                  </button>
                                </td>
                              ) : (
                                <td className=" pt-2 w-1/4">
                                  <button className="bg-green-200  text-green-600 font-bold py-2 px-4 rounded-full">
                                    Credit
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <div className="flex justify-center mt-8 text-lg ">
                          No records found
                        </div>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* bottom nav for mobile */}

        <div
            style={{ top: "100vh" }}
            className=" flex space-x-5 lg:hidden  w-full px-5 py-4 mt-5 flex-shrink-0 justify-between rounded-md text-indigo-600"
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
    </div>
  );
};

export default withAuth(Wallet);
