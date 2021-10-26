import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { lessonFilePaths, LESSONS_PATH } from 'utils/mdxUtils';
import { GetStaticProps } from 'next';

interface Props {
  lessons: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
}

const Lessons = ({ lessons }: Props) => {
  return (
    <div className="prose mx-auto my-24">
      <h1>Lessons</h1>

      <ol className="grid grid-cols-1 md:grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.filePath}>
            <Link
              as={`/course/${lesson.filePath.replace(/\.mdx?$/, '')}`}
              href={`/course/[lesson]`}
            >
              <a>{lesson.data.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Lessons;

export const getStaticProps: GetStaticProps = async () => {
  const lessons = lessonFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(LESSONS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { lessons } };
};
