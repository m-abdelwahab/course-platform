import { isAfter, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { LESSONS_PATH } from 'utils/mdxUtils';
import { prisma } from '../../../lib/prisma';

interface Request extends NextApiRequest {
  query: {
    lesson: string;
  };
}
export interface LessonResponse {
  source: MDXRemoteSerializeResult<Record<string, unknown>> | null;
  frontMatter: {
    [key: string]: any | null;
  };
}
interface Response extends NextApiResponse {
  send(params: LessonResponse): any;
}
const handler = async (req: Request, res: Response) => {
  try {
    const session = await getSession({ req });
    const isSessionExpired = session?.expires
      ? isAfter(new Date(), parseISO(session.expires))
      : true;

    const email = session?.user?.email;

    const isPaidUser = email
      ? await prisma.user.findUnique({
          where: { email },
        })
      : false;

    const postFilePath = path.join(LESSONS_PATH, `${req.query.lesson}.mdx`);
    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    if (!isPaidUser || isSessionExpired) {
      return res.send({
        source: null,
        frontMatter: data,
      });
    }

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });

    res.send({
      source: mdxSource,
      frontMatter: data,
    });
  } catch (error) {
    throw new Error("Couldn't found this Lesson!");
  }
};
export default handler;
