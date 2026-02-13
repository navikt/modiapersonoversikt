import { BodyShort, HStack } from '@navikt/ds-react';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
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

const useDownloadDocument = (url: string, fnr: string, onError: (status: number) => void) => {
    return useQuery({
        queryKey: ['document-blob', url, fnr],
        queryFn: async () => {
            const response = await fetch(url, postConfig({ fnr }));

            if (!response.ok) {
                onError(response.status);
                return;
            }

            const contentType = response.headers.get('Content-Type') || 'application/pdf';
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            return { blobUrl, contentType };
        }
    });
};

export const DokumentEmbeder = ({ url, fnr, onError, children }: DokumentViewerProps) => {
    const { data, isLoading, isError } = useDownloadDocument(url, fnr, onError);

    if (isLoading) {
        return <CenteredLazySpinner />;
    }

    if (isError || !data) {
        return <>{children}</>;
    }

    const { blobUrl, contentType } = data;

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
