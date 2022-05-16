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
  const [balance, setBalance] = useState(0);
  const [fund, setFund] = useState(false);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [pin, setPin] = useState("");
  const [transfer, setTransfer] = useState(false);
  const [message, setMesage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [pay, setPay] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");
  const [profile, setProfile] = useState("");

  const logoutHandler = () => {
    Cookie.remove("user");
    router.push("/");
  };

  const fundHandler = async () => {
    setLoading(true);
    try {
      if (amount < 499) {
        toast.error(
          "Minimum deposit is set to #500(it's not like it's real money )"
        );
        return setLoading(false);
      }
      if (amount > 1000000) {
        toast.error(
          "Maximum deposit is set to #1000000(Take it easy on the fake money )"
        );
        return setLoading(false);
      }
      const response = await axios.post(
        "https://gbese-client.herokuapp.com/payment/init",
        {
          amount: amount.toString(),
          message: "Fund Wallet",
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      router.push(response.data);
    } catch (error) {
      //nsole.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getName = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://gbese-client.herokuapp.com/user/getName",
        {
          account: parseInt(account),
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAccountName(data);
      setLoading(false);
    } catch (error) {
      setAccountName("");
      //nsole.log(error);
      toast.error("This account number is not a Gbese account number");
      setLoading(false);
    }
    setLoading(false);
  };

  const transferHandler = async () => {
    setLoading(true);
    try {
      if (accountName == "") {
        toast.error("Please enter a valid Gbese account number");
        return setLoading(false);
      }
      if (amount > balance) {
        toast.error("I'm afraid you don't have the funds for that");
        return setLoading(false);
      }
      if (amount < 50) {
        toast.error(
          "Minimum transfer is set to #50(it's not like it's real money )"
        );
        return setLoading(false);
      }
      if (amount > 1000000) {
        toast.error(
          "Maximum transfer is set to #1000000(Take it easy on the fake money )"
        );
        return setLoading(false);
      }
      //nsole.log(user.token);
      const response = await axios.post(
        "https://gbese-client.herokuapp.com/transaction/transfer",
        {
          accountNumber: account.toString(),
          amount: amount.toString(),
          message: message || "",
          pin: pin,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      //nsole.log(response.data);
      if (response.data == false) {
        toast.error("Incorrect Pin");
        return setLoading(false);
      }

      setTransfer(false);
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

  const getPname = async () => {
    try {
      setLoading(true);
      const b = banks.find((b) => b.name == bank);
      //nsole.log(b, account);
      const { data } = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=${b.code}`,
        {
          headers: {
            Authorization:
              "Bearer sk_test_c12b45c4a24b3f2822dc455384aae998665807ea",
          },
        }
      );
      setAccountName(data.data.account_name);
      setLoading(false);
    } catch (error) {
      toast.error("This account number doesn't belong to this bank");
      setLoading(false);
      setAccountName("");
      //nsole.log(error);
    }
  };

  useEffect(() => {
    const fetch = async (token: any) => {
      try {
        const { data } = await axios.get(
          "https://gbese-client.herokuapp.com/user/me",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization:
              "Bearer sk_test_c12b45c4a24b3f2822dc455384aae998665807ea",
          },
        });
        setBanks(response.data.data);
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
              {user.profile == null ? (
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
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-green-400 :fill-slate-600"
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
                  className="px-4 py-3 flex items-center space-x-4 cursor-pointer rounded-md text-gray-600 group"
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
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                  onClick={() => router.push("/account")}
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

        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          {/* content */}

          <div className="flex mt-10 mx-5 justify-center p-6 border rounded-lg sm:p-8 bg-green-600 :text-coolGray-100">
            <div className="space-y-4 py-8 text-center md:space-y-0 md:space-x-6 md:flex-row">
              <p className="text-gray-200 md:ml-6">Total Funds</p>
              <p className="text-gray-200 font-bold text-3xl">₦ {balance}.00</p>
            </div>
          </div>

          <div className="flex justify-center">
            <p className="text-gray-600 my-5">
              Hey {user.fn} what's it going to be today? 😎
            </p>
          </div>

          <div className="grid mt-5 grid-cols-1 gap-6 mx-5 mx-auto sm:grid-cols-1 xl:grid-cols-3">
            <div
              onClick={() => setFund(true)}
              className="flex justify-center shadow-md cursor-pointer hover:bg-gray-100 p-6  rounded-lg sm:p-8 :bg-coolGray-900 :text-coolGray-100"
            >
              <div className="space-y-4 text-center md:space-y-0 md:space-x-6 md:flex-row">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-gray-500 hover:text-green-500 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 md:ml-6 hover:text-green-500">
                  Fund wallet
                </p>
              </div>
            </div>

            <div
              onClick={() => setTransfer(true)}
              className="flex justify-center shadow-md cursor-pointer hover:bg-gray-100 p-6  rounded-lg sm:p-8 :bg-coolGray-900 :text-coolGray-100"
            >
              <div className="space-y-4 md:space-y-0  md:space-x-6 md:flex-row">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-gray-500 hover:text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 md:ml-6 hover:text-green-500">
                  Transfer
                </p>
              </div>
            </div>

            <div
              onClick={() => setPay(true)}
              className="flex justify-center shadow-md cursor-pointer hover:bg-gray-100 p-6  rounded-lg sm:p-8 :bg-coolGray-900 :text-coolGray-100"
            >
              <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-gray-500 hover:text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 md:ml-6 hover:text-green-500">
                  Send to bank account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* fund side bar */}

        {fund && (
          <div className="flex justify-end">
            <div
              style={{ width: "60vw", top: "0vh", overflow: "scroll" }}
              className="shadow-2xl space-x-5 justify-between fixed bg-white h-full  text-indigo-600"
              aria-hidden="true"
            >
              <div className="bg-gray-100 flex">
                <svg
                  onClick={() => setFund(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900 mt-6 ml-4 cursor-pointer "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="text-gray-600 p-5 text-xl font-medium">
                  Fund Wallet
                </p>
              </div>
              <div className="mt-5">
                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  step="0.1"
                  min="0"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="mt-6 p-2 flex justify-center">
                  {!loading ? (
                    <button
                      onClick={fundHandler}
                      className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-500"
                    >
                      Pay
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
              <div></div>
            </div>
          </div>
        )}

        {/* transfer side bar */}

        {transfer && (
          <div className="flex justify-end">
            <div
              style={{ width: "60vw", top: "0vh", overflow: "scroll" }}
              className="shadow-2xl space-x-5 justify-between fixed bg-white h-full  text-indigo-600"
              aria-hidden="true"
            >
              <div className="bg-gray-100 flex">
                <svg
                  onClick={() => setTransfer(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900 mt-6 ml-4 cursor-pointer "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="text-gray-600 p-5 text-xl font-medium">
                  Transfer
                </p>
              </div>
              <div className="mt-5">
                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Account
                </label>
                <input
                  type="string"
                  value={account}
                  step="0.1"
                  min="0"
                  onChange={(e) => setAccount(e.target.value)}
                  onBlur={getName}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Account Name
                </label>
                <input
                  type="text"
                  step="0.1"
                  value={accountName}
                  min="0"
                  required
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  step="0.1"
                  min="0"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="w-full mt-4">
                  <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                    Message
                  </label>

                  <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
                </div>
                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Pin( Default pin is your password you can change this later)
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <div className="mt-6 p-2 flex justify-center">
                  {!loading ? (
                    <button
                      onClick={transferHandler}
                      className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-500"
                    >
                      Transfer
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
              <div></div>
            </div>
          </div>
        )}

        {/* pay account side bar */}

        {pay && (
          <div className="flex justify-end">
            <div
              style={{ width: "60vw", top: "0vh", overflow: "scroll" }}
              className="shadow-2xl space-x-5 justify-between fixed bg-white h-full  text-indigo-600"
              aria-hidden="true"
            >
              <div className="bg-gray-100 flex">
                <svg
                  onClick={() => setPay(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900 mt-6 ml-4 cursor-pointer "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="text-gray-600 p-5 text-xl font-medium">
                  Send to account
                  <span className="text-gray-600 text-sm font-medium">
                    (We only support Nigerian banks, and won't be able to send
                    due to demo mode, but account details will be retrived)
                  </span>
                </p>
              </div>
              <div className="mt-5">
                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Bank
                </label>
                <select
                  required
                  className="block  w-full px-4 mb-4 pt-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={bank}
                  onChange={(e) => {
                    setBank(e.target.value);
                    //nsole.log(e.target.value);
                  }}
                  style={{ paddingRight: "300px", paddingBottom: "5px" }}
                >
                  {banks.map((b) => (
                    <option key={b.code} className="bg-white">
                      {b.name}
                    </option>
                  ))}
                </select>

                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Account
                </label>
                <input
                  type="string"
                  value={account}
                  step="0.1"
                  min="0"
                  onChange={(e) => setAccount(e.target.value)}
                  onBlur={getPname}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Account Name
                </label>
                <input
                  type="text"
                  step="0.1"
                  value={accountName}
                  min="0"
                  required
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  step="0.1"
                  min="0"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div className="w-full mt-4">
                  <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                    Message
                  </label>

                  <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
                </div>
                <label className="block text-lg my-3 text-gray-600 :text-gray-200">
                  Pin( Default pin is your password you can change this later)
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <div className="mt-6 p-2 flex justify-center">
                  {!loading ? (
                    <button
                      onClick={transferHandler}
                      className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-500"
                    >
                      Transfer
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
              <div></div>
            </div>
          </div>
        )}

        {/* bottom nav for mobile */}

        <div
          style={{ top: "95vh" }}
          className=" flex space-x-5 lg:hidden  w-full px-5 py-4 flex-shrink-0 justify-between fixed  bg-white rounded-md text-indigo-600"
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
