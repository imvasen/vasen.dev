'use client';

import React from 'react';

import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { ExtraProps } from 'react-markdown';

type Props = React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  ExtraProps;

const Pre = ({ children, className }: Props) => {
  const textInput = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current?.textContent ?? '');
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className='relative'
    >
      {hovered && (
        <button
          aria-label='Copy code'
          type='button'
          className={`
            absolute right-2 top-2 h-8 w-8 rounded
            bg-black bg-opacity-10 hover:bg-opacity-30
            flex items-center justify-center
          `}
          onClick={onCopy}
        >
          {copied ? <LuCopyCheck /> : <LuCopy />}
        </button>
      )}

      <pre className={`${className} rounded-md`}>{children}</pre>
    </div>
  );
};

export default Pre;
