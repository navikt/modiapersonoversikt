import type * as React from 'react';

const CompletedIcon: React.FC = () => {
    return (
        <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm4.573-11.516a.75.75 0 1 0-1.146-.968l-4.973 5.877L8.03 11.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.102-.046l5.5-6.5Z"
                fill="#06893a"
            ></path>
        </svg>
    );
};

export default CompletedIcon;
