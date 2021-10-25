import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { postFilePaths, POSTS_PATH } from 'utils/mdxUtils';
import { GetStaticProps } from 'next';

interface Props {
  posts: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
}

const Blog = ({ posts }: Props) => {
  return (
    <div className="prose mx-auto my-24">
      <h1>Blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link
              as={`/blog/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/blog/[slug]`}
            >
              <a>{post.data.title}</a>
            </Link>
            <p>{post.data.description}</p>
            <div className="space-x-4">
              {post.data.categories.map((category: string, i: React.Key) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
};
