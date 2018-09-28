import * as React from 'react';

function DokumentIkkeTilgang(props) {
    return (
        <svg viewBox="0 0 24 24" xmlns='http://www.w3.org/2000/svg' {...props}>
            <g fill='none' strokeMiterlimit='10' stroke='#C6C2BF' strokeLinejoin='round'>
                <path d='M10 21.5H.5V.5h11l5 5v4' />
                <path strokeLinecap='round' d='M11.5.5v5h5' />
                <circle r='6' cx='17.5' cy='17.5' />
                <path d='M13.3 21.7l8.4-8.4' />
            </g>
        </svg>
    );
}

export default DokumentIkkeTilgang;