import { Button, List, VStack } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { useState } from 'react';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { standardTekstSokAtom } from 'src/components/melding/standardtekster/StandardTekster';
import TekstListeElement from 'src/components/melding/standardtekster/TekstlisteElement';

function StandardtekstListe() {
    const [visAntall, setVisAntall] = useState(50);
    const [values, setValue] = useAtom(standardTekstSokAtom);

    const velgTekst = (value: string) => {
        setValue((values) => ({
            ...values,
            tekst: values.filtrerteTekster.find((element: StandardTeksterType.Tekst) => element.id === value)
        }));
    };

    const tekstElementer = values.filtrerteTekster
        .slice(0, visAntall)
        .map((tekst, index) => (
            <TekstListeElement
                locale={values.locale}
                key={tekst.id}
                tekst={tekst}
                onChange={velgTekst}
                valgt={tekst.id === values.tekst?.id}
                index={index}
            />
        ));

    const visFlereTeksterKnapp = (
        <Button
            type="button"
            size="xsmall"
            variant="secondary"
            className="mx-4"
            onClick={() => setVisAntall(visAntall + 50)}
        >
            Vis flere tekster
        </Button>
    );

    return (
        <VStack className="flex min-w-1/3 overflow-y-scroll max-h-[30rem]">
            <h3 className="sr-only">Velg samtalemal</h3>
            <div className="font-ax-bold" aria-live="polite">
                {values.filtrerteTekster.length} samtalemaler traff søket
            </div>
            <List>{tekstElementer}</List>
            {values.filtrerteTekster.length > tekstElementer.length && visFlereTeksterKnapp}
        </VStack>
    );
}

export default StandardtekstListe;
