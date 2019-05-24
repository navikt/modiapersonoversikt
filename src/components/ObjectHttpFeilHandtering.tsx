import * as React from 'react';
import { useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface Props extends React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement> {
    url: string;
    errorFallback: (status: number) => JSX.Element;
}

export function ObjectHttpFeilHandtering({ url, errorFallback, children, ...rest }: Props): JSX.Element {
    const [bloburl, setUrl] = useState('');
    const [errorCode, setErrorCode] = useState<undefined | number>(undefined);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) setErrorCode(res.status);
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
    } else if (errorCode) {
        return errorFallback(errorCode);
    }

    return <object data={bloburl} {...rest} />;
}
