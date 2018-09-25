import * as React from 'react';

export default function Sikkerhetstiltak(props) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height={100} width={100} {...props}>
          <defs>
              <mask id="sikkerhetstiltakmask">
                  <rect width="100%" height="100%" fill="#fff" />
                  <line x1="50" y1="35" x2="50" y2="67" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="82" r="4.5" fill="#000" />
              </mask>
          </defs>
          <polygon mask="url(#sikkerhetstiltakmask)" fill="#BA3A26" points="50,5 95,95 5,95" strokeWidth="4" strokeLinejoin="round" stroke="#BA3A26" />
      </svg>
  );
}
