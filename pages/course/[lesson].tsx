import { LockClosedIcon } from '@heroicons/react/outline';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { LessonResponse } from 'pages/api/lessons/[lesson]';
import useSWR from 'swr';
import { fetcher } from 'utils/SWRFetcher';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';

const components = {
  Head,
};

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center max-w-screen-md mx-auto my-24">
      <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 557 305"
        backgroundColor="#f5f5f5"
        foregroundColor="#efefef"
      >
        <rect x="0" y="0" rx="3" ry="3" width="370" height="30" />
        <rect x="0" y="190" rx="4" ry="4" width="72" height="15" />
        <rect x="0" y="90" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="115" rx="4" ry="4" width="305" height="15" />
        <rect x="0" y="140" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="165" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="215" rx="4" ry="4" width="418" height="15" />
        <rect x="0" y="240" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="265" rx="4" ry="4" width="533" height="15" />
        <rect x="0" y="290" rx="4" ry="4" width="344" height="15" />
        <rect x="0" y="43" rx="3" ry="3" width="431" height="21" />
      </ContentLoader>
    </div>
  );
};
const ErrorComponent = () => {
  return (
    <div className="prose max-w-screen-md mx-auto my-24">
      <h1> Error: Couldn&apos;t find this Lesson! </h1>
      <p>
        Maybe the Lesson was removed by the author, please contact support :D
      </p>
    </div>
  );
};
export default function LessonPage() {
  const router = useRouter();

  const { lesson } = router.query;
  const { data, error } = useSWR<LessonResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/${lesson}`,
    fetcher,
  );

  return (
    <>
      {data ? (
        <div className="max-w-screen-md mx-auto my-24">
          <h1 className="font-bold text-xl mb-3">{data.frontMatter.title}</h1>
          <p className="text-lg mb-5">{data.frontMatter.description}</p>
          {data.source ? (
            <main className="prose">
              <MDXRemote {...data.source} components={components} />
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
      ) : !error ? (
        <LoadingSkeleton />
      ) : (
        <ErrorComponent />
      )}
    </>
  );
}
