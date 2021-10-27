import React from 'react';
import Link from 'next/link';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Course', href: '/course' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.href}>
                <a className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          Made with ❤️ by{' '}
          <a href="https://twitter.com/m-abdelwahab">Mahmoud Abdelwahab</a> -{' '}
          <a
            className="underline"
            href="https://github.com/m-abdelwahab/course-platform"
          >
            code
          </a>
        </p>
      </div>
    </footer>
  );
};
