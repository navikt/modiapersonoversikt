import { Heading } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import RichText, { defaultRules, HighlightRule, SladdRule } from 'src/components/RichText';
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
            <RichText rules={[SladdRule, HighlightRule, ...defaultRules]}>
                {values.tekst?.innhold[values.locale] as string}
            </RichText>
        </div>
    );
}

export default StandardTekstPreview;
