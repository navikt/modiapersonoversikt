import type * as React from 'react';
import { type ReactNode, useEffect, useState } from 'react';
import { postConfig } from '../api/config';
import { CenteredLazySpinner } from './LazySpinner';

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

interface Props
    extends Omit<React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, 'onError'> {
    url: string;
    fnr: string;
    onError: (status: number) => void;
    children: ReactNode;
}

export function ObjectHttpFeilHandtering({ url, fnr, onError, children, ...rest }: Props) {
    const [blobUrl, setBlobUrl] = useState('');
    const [contentType, setContentType] = useState('');
    const [isError, setError] = useState(false);

    useEffect(() => {
        let objectUrl = '';
        fetch(url, postConfig({ fnr }))
            .then((res) => {
                if (!res.ok) {
                    setError(true);
                    onError(res.status);
                } else {
                    setContentType(res.headers.get('Content-Type') ?? 'application/pdf');
                    setError(false);
                }
                return res.blob();
            })
            .then((blob) => {
                objectUrl = URL.createObjectURL(blob);

                setBlobUrl(objectUrl);
            });

        return () => {
            window.URL.revokeObjectURL(objectUrl);
        };
    }, [url, fnr, setBlobUrl, onError, setError]);

    if (blobUrl === '') {
        return <CenteredLazySpinner />;
    }
    if (isError) {
        return <>{children}</>;
    }

    //biome-ignore lint/correctness/noChildrenProp: biome migration
    //biome-ignore lint/a11y/useAltText: biome migration
    return <object data={blobUrl} children={children} {...rest} type={contentType} />;
}
