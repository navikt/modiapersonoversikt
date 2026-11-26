import { BodyLong } from '@navikt/ds-react';
import DOMPurify from 'dompurify';

export const EksternVarselTekst = ({ tekst, kanal }: { tekst: string; kanal?: string | null }) => {
    // API-et oppgir ikke innholdsformat. Taggsjekken velger visning, DOMPurify renser HTML-en.
    const erHtml = kanal === 'EPOST' && /<\/?[a-z][a-z0-9-]*(?:\s[^<>]*|\/?)>/i.test(tekst);

    if (!erHtml) {
        return (
            <BodyLong size="small" className="break-words whitespace-pre-wrap">
                {tekst}
            </BodyLong>
        );
    }

    if (!DOMPurify.isSupported) {
        throw new Error('Nettleseren støtter ikke HTML-rensing av varseltekst');
    }

    const rensetHtml = DOMPurify.sanitize(tekst, {
        ALLOWED_TAGS: ['p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote'],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
        ALLOW_ARIA_ATTR: false
    });

    return (
        <BodyLong
            as="div"
            size="small"
            className="break-words [&_ol]:list-decimal [&_ol]:pl-6 [&_p+p]:mt-2 [&_ul]:list-disc [&_ul]:pl-6"
        >
            <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Kun DOMPurify-renset HTML med tillatelsesliste uten attributter.
                dangerouslySetInnerHTML={{ __html: rensetHtml }}
            />
        </BodyLong>
    );
};
