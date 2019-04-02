import * as React from 'react';

function Informasjon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="none" strokeLinejoin="round" stroke="#3e3832" strokeMiterlimit="10">
                <circle strokeLinecap="round" r="11" cx="11.5" cy="12.5" />
                <path strokeLinecap="round" d="M8.5 19.5h6m-5-9h2V19" />
                <path d="M11 6a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" />
            </g>
        </svg>
    );
}

export default Informasjon;
