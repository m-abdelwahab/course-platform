import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import { useSession, signOut } from 'next-auth/react';

import { lessonFilePaths, LESSONS_PATH } from '../../utils/mdxUtils';
import { LockClosedIcon } from '@heroicons/react/outline';

interface Props {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    [key: string]: any;
  };
}

const components = {
  Head,
};

export default function LessonPage({ source, frontMatter }: Props) {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="max-w-screen-md mx-auto my-24">
        <h1 className="font-bold text-xl mb-3">{frontMatter.title}</h1>
        <p className="text-lg mb-5">{frontMatter.description}</p>
        {status === 'authenticated' ? (
          <main className="prose">
            <MDXRemote {...source} components={components} />
          </main>
        ) : (
          <div className="rounded-md bg-gray-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <LockClosedIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-md text-gray-700">
                  Please log in to access your course or purchase a license
                </p>
                <p className="mt-3 text-md md:mt-0 md:ml-6">
                  <Link href="/course">
                    <a className="whitespace-nowrap font-medium text-gray-700 hover:text-gray-600">
                      Details <span aria-hidden="true">&rarr;</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(LESSONS_PATH, `${params.lesson}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = lessonFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((lesson) => ({ params: { lesson } }));

  return {
    paths,
    fallback: false,
  };
};
