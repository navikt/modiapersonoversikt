import * as React from 'react';

export default function Coins(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
      <g fill="none" strokeWidth="1.2" stroke="rgba(0, 0, 0, 0.5)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
        <ellipse cx={8} cy="2.5" rx="7.5" ry={2} />
        <path d="M15.5 2.5v3c0 1.1-3.3 2-7.5 2C4 7.5.5 6.6.5 5.5v-3m15 3v3c0 1.1-3.3 2-7.5 2-4.1 0-7.5-.9-7.5-2v-3" />
        <ellipse cx={16} cy="15.5" rx="7.5" ry={2} />
        <path d="M23.5 15.5v3c0 1.1-3.3 2-7.5 2-4.1 0-7.5-.9-7.5-2v-3m15 3v3c0 1.1-3.3 2-7.5 2-4.1 0-7.5-.9-7.5-2v-3m7-10v3c0 1.1-3.3 2-7.5 2-4.1 0-7.5-.9-7.5-2v-3m0 3v3c0 1.1 3.4 2 7.5 2h.5m-8-2v3c0 1.1 3.4 2 7.5 2h.5m7-8v2" />
      </g>
    </svg>
  );
}
