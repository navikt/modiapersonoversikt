import type * as React from 'react';

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M15.5 23.5h-14v-20h9l5 5zm-5-20v5h5m-8-5v-3h9l5 5v15h-6m1-20v5h5"
            />
        </svg>
    );
}

export default CopyIcon;
