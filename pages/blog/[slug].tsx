import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import path from 'path';
import { CodeBlock } from 'components/MDX';
import { Button } from 'components/shared/Button';

import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';

interface Props {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    [key: string]: any;
  };
  readingTime: string;
}

const components = {
  Image,
  code: CodeBlock,
  Button,
};

export default function PostPage({ source, frontMatter, readingTime }: Props) {
  return (
    <>
      <main className="prose mx-auto my-24">
        <h1>{frontMatter.title}</h1>
        <p className="description">{frontMatter.description}</p>
        <div className="flex space-x-5">
          <p>{readingTime}</p>
          <p>-</p>
          <p>{frontMatter.date}</p>
        </div>
        <MDXRemote {...source} components={components} />
      </main>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
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
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
