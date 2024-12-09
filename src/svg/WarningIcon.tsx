import type * as React from 'react';

const WarningIcon: React.FC = () => {
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
                d="M12 2.25a.75.75 0 0 1 .656.387l9.527 17.25A.75.75 0 0 1 21.526 21H2.474a.75.75 0 0 1-.657-1.113l9.526-17.25A.75.75 0 0 1 12 2.25ZM12 8.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75Zm-1 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                fill="#ff9100"
            />
        </svg>
    );
};

export default WarningIcon;
