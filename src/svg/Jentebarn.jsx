import * as React from 'react';

export default function Jentebarn(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
            <defs>
                <mask id="jentebarnmask">
                    <circle cx={10} cy={10} r={10} fill="#FFF" />
                    <path
                        fill="#000"
                        d="M11.4 13.47v2.85c0 .32-.27.58-.59.58a.58.58 0 0 1-.58-.58v-2.85h-.4v2.85c0 .32-.25.58-.57.58a.58.58 0 0 1-.59-.58v-2.85H7.43l.69-3.76-.97 1.53a.56.56 0 1 1-.9-.66l1.6-2.5c.33-.45.5-.56 1.28-.56h1.82c.78 0 .95.1 1.27.55l1.61 2.51a.56.56 0 0 1-.42.93c-.2 0-.38-.11-.47-.27l-.98-1.53.69 3.76h-1.26zM12.1 5.31a2.07 2.07 0 0 1-4.13 0 1.35 1.35 0 0 1-1.92.76 1.35 1.35 0 0 1 1.96-1.29 2.07 2.07 0 0 1 4.05 0 1.35 1.35 0 0 1 1.95 1.29 1.35 1.35 0 0 1-1.91-.76z"
                    />
                </mask>
            </defs>
            <rect mask="url(#jentebarnmask)" height="20" width="20" fill="#C86151" />
        </svg>
    );
}
