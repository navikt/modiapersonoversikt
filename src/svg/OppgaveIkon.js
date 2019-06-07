import * as React from 'react';

export default function OppgaveIkon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
            <g stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
                <path d="M.5.5h23v23h-23z" />
                <path strokeLinecap="round" d="M3.5 7.5l2 2 5-5M3.5 16.5l2 2 5-5M12.5 8.5h8M12.5 17.5h8" />
            </g>
        </svg>
    );
}
