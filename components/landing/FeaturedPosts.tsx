import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FeaturedPosts = () => {
  return (
    <section className="my-24">
      <h2 className="pr-3 text-6xl font-bold text-center">Featured Posts</h2>
      <div>
        <div className="max-w-4xl mx-auto pt-24">
          <div className="space-y-8 lg:divide-y lg:divide-rangoon">
            <div className="pt-8 sm:flex lg:items-end group">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <Image
                  width="128px"
                  height="128px"
                  className="w-full rounded-md lg:h-32 lg:w-32"
                  src="https://images.unsplash.com/photo-1616651181620-9906d6e43fc3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGF0dGVybnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="text"
                />
              </div>
              <div>
                <span className="text-sm">October 26th 2021</span>
                <p className="mt-3 text-lg font-medium leading-6">
                  <Link href="/blog/greatness-from-small-beginnings">
                    <a className="text-xllg:text-2xl from-white to-white">
                      Greatness from small beginnings
                    </a>
                  </Link>
                </p>
                <p className="mt-2 text-lg text-magnesium">
                  How to build something great
                </p>
              </div>
            </div>
            <div className="pt-8 sm:flex lg:items-end group">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <Image
                  width="128px"
                  height="128px"
                  className="w-full rounded-md lg:h-32 lg:w-32"
                  src="https://images.unsplash.com/photo-1558865869-c93f6f8482af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80"
                  alt="text"
                />
              </div>
              <div>
                <span className="text-sm text-dim">Nov 12th 2020</span>
                <p className="mt-3 text-lg font-medium leading-6">
                  <Link href="/blog/how-i-built-my-own-course-platform">
                    <a className="text-xl bg-clip-text bg-gradient-to-r group-hover:from-heart group-hover:via-ice group-hover:to-wickedblue lg:text-2xl from-white to-white">
                      Why and how I built my own course Platform
                    </a>
                  </Link>
                </p>
                <p className="mt-2 text-lg text-magnesium">
                  How I built my own course platform and why I did it
                </p>
              </div>
            </div>
          </div>
          <Link href="/blog">
            <a className="mt-14 max-w-xs w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              All Posts
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
