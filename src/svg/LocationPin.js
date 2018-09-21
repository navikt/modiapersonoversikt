import * as React from 'react';

export default function LocationPin(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
      <g fill="#C6C2BF">
        <defs>
          <mask id="a">
            <rect width="100%" height="100%" fill="#fff"/>
            <circle cx={12} cy={8} r={4} fill="#000"/>
          </mask>
        </defs>
        <path mask="url(#a)" d="M19.5 8c0 4.1-7.5 15.5-7.5 15.5S4.5 12.1 4.5 8a7.5 7.5 0 1 1 15 0z"/>
      </g>
    </svg>
  );
}
