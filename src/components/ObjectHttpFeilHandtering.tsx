import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Omit } from '../utils/types';

interface Props
    extends Omit<React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, 'onError'> {
    url: string;
    onError: (status: number) => void;
    children: ReactNode;
}

export function ObjectHttpFeilHandtering({ url, onError, children, ...rest }: Props) {
    const [blobUrl, setBlobUrl] = useState('');
    const [isError, setError] = useState(false);

    useEffect(() => {
        let objectUrl = '';
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    setError(true);
                    onError(res.status);
                } else {
                    setError(false);
                }
                return res.blob();
            })
            .then(blob => {
                objectUrl = URL.createObjectURL(blob);
                setBlobUrl(objectUrl);
            });

        return () => {
            window.URL.revokeObjectURL(objectUrl);
        };
    }, [url, setBlobUrl, onError, setError]);

    if (blobUrl === '') {
        return <NavFrontendSpinner />;
    } else if (isError) {
        return <>{children}</>;
    }

    return <object data={blobUrl} children={children} {...rest} />;
}
