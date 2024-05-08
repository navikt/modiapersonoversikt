import * as React from 'react';

export default function Heart(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
            <path
                fill="#C6C2BF"
                stroke="none"
                d="M12 22.4s10.5-8.1 10.5-15.8S13.2-1.7 12 6C10.8-1.7 1.5-1.1 1.5 7.2 1.5 15.4 12 22.4 12 22.4z"
            />
        </svg>
    );
}
