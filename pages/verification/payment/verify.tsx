import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const verify = async (reference, token) => {
    try {
      const response = await axios.post(
        "https://gbese-server.onrender.com/payment/verify",
        {
          ref: reference,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/dashboard");
    } catch (error) {
      toast.error("This transaction was not processed");
      //nsole.log(error);
    }
  };
  const router = useRouter();
  const { reference } = router.query;
  if (Cookie.get("user")) {
    const user = JSON.parse(Cookie.get("user"));
    verify(reference, user.token);
  }

  return (
    <div>
      {/* <ToastContainer 
        position="top-center"
        hideProgressBar={true}
        closeOnClick
      /> */}
      <div
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        className="absolute text-center top-50"
      >
        <h1 className="text-xl ">
          We are processing your payment please wait 👷🏾💰
          <br />
          Please note we will not process the same payment twice
        </h1>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
          <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
          <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-green-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
