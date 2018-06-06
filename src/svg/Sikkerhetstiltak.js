import * as React from 'react';

export default function Sikkerhetstiltak(props) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" >
          <defs>
              <mask id="a">
                  <rect width="100%" height="100%" fill="#fff" />
                  <line x1="50" y1="35" x2="50" y2="67" stroke="#000" stroke-width="4" stroke-linecap="round" />
                  <circle cx="50" cy="82" r="4.5" fill="#000" />
              </mask>
          </defs>
          <polygon mask="url(#a)" fill="#BA3A26" points="50,5 95,95 5,95" stroke-width="4" stroke-linejoin="round" stroke="#BA3A26" />
      </svg>
  );
}
