import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="flex space-x-24  items-center">
      <div className="flex flex-col justify-center flex-1 px-4 py-20  sm:px-10 lg:flex-none">
        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-3xl text-left">
            <h1
              data-animate="title"
              className="py-7 text-5xl font-bold leading-none lg:text-6xl"
            >
              The best resources. <br /> Right in your inbox
            </h1>
            <p
              data-animate="subtitle"
              className="max-w-md text-base sm:text-lg md:mt-5 md:text-2xl md:max-w-xl"
            >
              High signal, low noise newsletter. Sent out every Saturday, so you
              can enjoy it with your favorite drink.
            </p>
            <form className="mt-8 sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 placeholder-gray-500 focus:ring-gray-500 focus:border-gray-500 sm:max-w-xs border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Notify me
                </button>
              </div>
            </form>

            <p className="text-xs mt-5">We will never spam you</p>
          </div>
        </div>
      </div>
      <Image
        alt="email icon"
        width="450px"
        height="450px"
        src="/images/email.svg"
        className="max-w-xs hidden md:block"
      />
    </section>
  );
};
