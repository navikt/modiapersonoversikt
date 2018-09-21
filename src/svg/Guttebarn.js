import * as React from 'react';

export default function Guttebarn(props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 20 20" {...props}>
      <defs>
        <mask id="guttebarnmask">
          <circle cx={10} cy={10} r={10} fill="#FFF"/>
          <path fill='#000'
                d='M11.382 12.963v3.4a.58.58 0 0 1-.582.583.58.58 0 0 1-.583-.582v-3.4H9.83v3.4a.58.58 0 0 1-.582.582.58.58 0 0 1-.582-.582v-3.4h-.548V9.195l-.97 1.537a.558.558 0 1 1-.894-.661l1.606-2.509c.319-.446.498-.557 1.274-.557h1.861c.777 0 .956.111 1.274.557l1.607 2.509a.56.56 0 1 1-.894.661l-.97-1.537v3.767h-.629zM10.023 6.795a2.07 2.07 0 0 0 2.069-2.068c0-1.14-.928-2.07-2.069-2.07-1.14 0-2.068.93-2.068 2.07a2.07 2.07 0 0 0 2.068 2.068'/>
        </mask>
      </defs>
      <rect mask="url(#guttebarnmask)" width="20" height="20" fill="#3385D1"/>
    </svg>
  );
}
