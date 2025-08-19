import { BodyShort, HStack } from '@navikt/ds-react';
import type * as React from 'react';
import { type ReactNode, useEffect, useState } from 'react';
import { postConfig } from 'src/api/config';
import { CenteredLazySpinner } from 'src/components/LazySpinner';

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

const supportedFileTypes = ['application/pdf', ''];
const canEmbedFileType = (contentType: string) => supportedFileTypes.includes(contentType.toLowerCase());

interface DokumentViewerProps
    extends Omit<React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, 'onError'> {
    url: string;
    fnr: string;
    onError: (status: number) => void;
    children: ReactNode;
}

export const DokumentEmbeder = ({ url, fnr, onError, children }: DokumentViewerProps) => {
    const [state, setState] = useState<{
        blobUrl: string;
        contentType: string;
        isError: boolean;
        isLoading: boolean;
    }>({
        blobUrl: '',
        contentType: '',
        isError: false,
        isLoading: true
    });

    useEffect(() => {
        let objectUrl = '';
        const fetchFile = async () => {
            try {
                setState((prev) => ({ ...prev, isLoading: true }));

                const response = await fetch(url, postConfig({ fnr }));
                if (!response.ok) {
                    setState({ blobUrl: '', contentType: '', isError: true, isLoading: false });
                    onError(response.status);
                    return;
                }

                const contentType = response.headers.get('Content-Type') || 'application/pdf';
                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);

                setState({ blobUrl: objectUrl, contentType, isError: false, isLoading: false });
            } catch {
                setState({ blobUrl: '', contentType: '', isError: true, isLoading: false });
                onError(500);
            }
        };

        fetchFile();

        return () => {
            window.URL.revokeObjectURL(objectUrl);
        };
    }, [url, fnr, onError]);

    const { blobUrl, contentType, isError, isLoading } = state;

    if (isLoading) {
        return <CenteredLazySpinner />;
    }

    if (isError) {
        return <>{children}</>;
    }

    if (!canEmbedFileType(contentType)) {
        return (
            <HStack gap="2">
                <BodyShort size="small" weight="semibold">
                    Vedlegget kan ikke vises i nettleseren. Last ned filen for å se innholdet.{' '}
                    <a href={blobUrl}>Last ned dokument</a>
                </BodyShort>
            </HStack>
        );
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100 overflow-hidden">
            <object data={blobUrl} type={contentType} className="w-full h-full border-none">
                {children}
            </object>
        </div>
    );
};
