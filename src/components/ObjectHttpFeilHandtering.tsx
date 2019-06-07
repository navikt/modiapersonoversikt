import * as React from 'react';
import { useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Omit } from '../utils/types';

interface Props
    extends Omit<React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, 'onError'> {
    url: string;
    onError: (status: number) => void;
}

export function ObjectHttpFeilHandtering({ url, onError, children, ...rest }: Props) {
    const [bloburl, setUrl] = useState('');
    const [isError, setError] = useState(false);

    useEffect(() => {
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
                return setUrl(URL.createObjectURL(blob));
            });

        return () => {
            window.URL.revokeObjectURL(bloburl);
        };
    }, [url]);

    if (bloburl == '') {
        return <NavFrontendSpinner />;
    } else if (isError) {
        return <>{children}</>;
    }

    return <object data={bloburl} {...rest} />;
}
