import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { CenteredLazySpinner } from './LazySpinner';
import useFeatureToggle from './featureToggle/useFeatureToggle';
import { FeatureToggles } from './featureToggle/toggleIDs';
import { postConfig } from '../api/config';

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
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

    const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

    useEffect(() => {
        let objectUrl = '';
        isOn
            ? fetch(url, postConfig(fnr))
            : fetch(url)
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
    }, [url, fnr, isOn, setBlobUrl, onError, setError]);

    if (blobUrl === '') {
        return <CenteredLazySpinner />;
    } else if (isError) {
        return <>{children}</>;
    }

    return <object data={blobUrl} children={children} {...rest} type={contentType} />;
}
