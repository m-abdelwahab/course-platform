import React from 'react';

interface Props {
  content: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}
export const Button = ({ content, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      type="submit"
      role="link"
    >
      {content}
    </button>
  );
};
