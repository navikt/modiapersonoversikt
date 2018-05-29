import * as React from 'react';

export default function LocationPin(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
      <g fill="none" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
        <path d="M19.5 8c0 4.1-7.5 15.5-7.5 15.5S4.5 12.1 4.5 8a7.5 7.5 0 1 1 15 0z" />
        <circle cx={12} cy={8} r={3} />
      </g>
    </svg>
  );
}
