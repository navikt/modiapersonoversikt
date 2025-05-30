import { BodyShort, Heading } from '@navikt/ds-react';
import type * as StandardTekster from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { erGyldigValg } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';

interface Props {
    tekst: StandardTekster.Tekst | undefined;
    locale: StandardTekster.Locale;
}

function StandardTekstPreview({ tekst, locale }: Props) {
    if (!erGyldigValg(tekst, locale)) {
        return <div />;
    }

    return (
        <>
            <Heading size="small" level="3" className="sr-only">
                Forhåndsvisning
            </Heading>
            <Heading size={'small'} level="4">
                {tekst?.overskrift}
            </Heading>
            <BodyShort size="small">{tekst?.innhold[locale] as string}</BodyShort>
        </>
    );
}

export default StandardTekstPreview;
