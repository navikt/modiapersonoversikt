import { BodyShort, Heading } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { standardTekstSokAtom } from 'src/components/melding/standardtekster/StandardTekster';

function StandardTekstPreview() {
    const [values] = useAtom(standardTekstSokAtom);

    return (
        <div>
            <Heading size="small" level="3" className="sr-only">
                Forhåndsvisning
            </Heading>
            <Heading size="small" level="4">
                {values.tekst?.overskrift}
            </Heading>
            <BodyShort size="small">{values.tekst?.innhold[values.locale] as string}</BodyShort>
        </div>
    );
}

export default StandardTekstPreview;
