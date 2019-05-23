import * as React from 'react';

function InformasjonSVG(props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <g stroke='#000' strokeLinejoin='round' strokeMiterlimit='10' fill='none'>
                <circle strokeLinecap='round' cx='11.5' cy='12.5' r='11' />
                <path strokeLinecap='round' d='M8.5 19.5h6M9.5 10.5h2v8.5' />
                <path d='M11 6c-.277 0-.5.225-.5.5 0 .277.223.5.5.5.275 0 .5-.223.5-.5 0-.275-.225-.5-.5-.5z'
                />
            </g>
        </svg>
    );
}

export default InformasjonSVG;
