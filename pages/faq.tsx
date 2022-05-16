import React from "react";
import Layout from "../components/Layout";

const Faq = () => {
  return (
      <Layout title="About">
    <div>
      <div>
        <section className=":bg-coolGray-800 :text-coolGray-100">
          <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
            <h1 className="text-3xl font-bold leading-none text-center sm:text-4xl">
              FAQ
            </h1>
            <div className="relative mt-6 mb-12">
              <span className="absolute inset-y-0 flex items-center pl-2 mx-auto"></span>
            </div>
            <div className="flex flex-col w-full divide-y sm:flex-row sm:divide-y-0 sm:divide-x sm:px-8 lg:px-12 xl:px-32 divide-coolGray-700">
              <div className="flex flex-col w-full divide-y divide-coolGray-700">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Billing
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Support
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Account
                </a>
              </div>
              <div className="flex flex-col w-full divide-y divide-coolGray-700">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Features
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Contact us
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  My orders
                </a>
              </div>
              <div className="hidden w-full divide-y sm:flex-col sm:flex divide-coolGray-700">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Enterprise
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Privacy
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
                >
                  Developers
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </Layout>
  );
};

export default Faq;
