/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { withAuth } from "../components/withAuth";
import { GetServerSideProps } from "next";
import FileBase from "react-file-base64";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (Cookie.get("user")) {
      const u = JSON.parse(Cookie.get("user"));
      setUser(u);
      fetch(u.token);
    }
  }, [setUser]);

  const submitHandler = async (e) => {
    
    console.log(fname, lname, phone, image)
    try {
      setLoading(true)
        const { data } = await axios.patch("http://localhost:8000/user/edit", {
            firstName: fname || undefined,
            lastName: lname || undefined,
            phone: phone || undefined,
            profile: image || undefined
        }, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        Cookie.remove("user");
        router.push("/auth/login");
      } catch (error) {
        console.log(error);
      }
  };

  const setI = (i) =>{
    //  console.log(i)
    const im = JSON.stringify(i.base64)
    setImage(i.base64)
}

  return <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800 my-20">
            <h2 className="text-lg font-semibold text-gray-700 capitalize :text-white">
              Edit Account
            </h2>

            <div className="py-5 ">
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 :text-gray-200"
                  >
                    First Name
                  </label>
                  <input
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                    required
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 :text-gray-200"
                    htmlFor="emailAddress"
                  >
                    Last Name
                  </label>
                  <input
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                    required
                    id="emailAddress"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 :text-gray-200"
                    htmlFor="password"
                  >
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="password"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                {/* <div>
                 
                </div> */}
              </div>

              <fieldset className="w-full space-y-1 pt-4 dark:text-coolGray-100">
                <label htmlFor="files" className="block text-sm font-medium">
                  Upload Profile Photo
                </label>
                <div className="flex  px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800">
                  {/* <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800"/> */}
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setI({ base64 })}
                  />
                </div>
              </fieldset>

              <div className="flex justify-end mt-6">
                <div className="mt-6">
              {!loading ? (
                <button
                  onClick={submitHandler}
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                >
                  Update
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
            </div>
          </section>
  </div>;
};

export default withAuth(Dashboard);
