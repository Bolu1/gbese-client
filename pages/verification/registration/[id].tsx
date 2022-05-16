import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const tokenHandler = async (id) => {
    try {
      const response = await axios.get(
        "https://gbese-client.herokuapp.com/auth/confirm",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${id}`,
          },
        }
      );
      router.push("/auth/login");
      console.log(response);
    } catch (error) {
      // return toast.error("Invalid or expired link")
      console.log(error);
    }
  };
  const router = useRouter();
  const { id } = router.query;
  tokenHandler(id);

  return (
    <div>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeOnClick
      />
      <div
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        className="absolute text-center top-50"
      >
        <h1 className="text-xl ">
          Thank you for confirming your email, you will be redirected shortly if
          the link is valid
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

export default VerifyEmail;
