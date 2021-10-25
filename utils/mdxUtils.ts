import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'content', 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const LESSONS_PATH = path.join(process.cwd(), 'content', 'lessons');
export const lessonFilePaths = fs
  .readdirSync(LESSONS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));
