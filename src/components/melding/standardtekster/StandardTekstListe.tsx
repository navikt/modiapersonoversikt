import { Button, List, VStack } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { useEffect, useState } from 'react';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { standardTekstSokAtom } from 'src/components/melding/standardtekster/StandardTekster';
import TekstListeElement from 'src/components/melding/standardtekster/TekstlisteElement';

function StandardtekstListe({ listeRef }: { listeRef: React.RefObject<HTMLDivElement | null> }) {
    const [visAntall, setVisAntall] = useState(50);
    const [values, setValue] = useAtom(standardTekstSokAtom);
    const [klikketViaKeyboard, setKlikketViaKeyboard] = useState(false);

    const velgTekst = (value: string) => {
        setValue((values) => ({
            ...values,
            tekst: values.filtrerteTekster.find((element: StandardTeksterType.Tekst) => element.id === value)
        }));
    };

    const fokuserPaaNesteTekstIListe = () => {
        if (visAntall <= 50 || !klikketViaKeyboard) return;
        const nyTekstIndex = visAntall - 50;

        // Velg ny tekst til preview
        const nyTekst = values.filtrerteTekster[nyTekstIndex];
        if (nyTekst?.id) velgTekst(nyTekst.id);

        //Sett fokus på ny tekst
        const tekster = document.querySelectorAll('#standardtekster-liste li input');
        if (tekster.length && tekster[nyTekstIndex] instanceof HTMLElement) {
            (tekster[nyTekstIndex] as HTMLElement).focus();
            (tekster[nyTekstIndex] as HTMLElement).scrollIntoView();
        }
        setKlikketViaKeyboard(false);
    };

    const tekstElementer = values.filtrerteTekster
        .slice(0, visAntall)
        .map((tekst) => (
            <TekstListeElement
                key={tekst.id}
                tekst={tekst}
                onChange={velgTekst}
                valgt={tekst.id === values.tekst?.id}
            />
        ));

    const visFlereTeksterKnapp = (
        <Button
            type="button"
            size="xsmall"
            variant="secondary"
            className="m-2"
            onClick={(e) => {
                setVisAntall(visAntall + 50);
                setKlikketViaKeyboard(e.detail === 0);
            }}
        >
            Vis flere tekster
        </Button>
    );

    useEffect(() => {
        fokuserPaaNesteTekstIListe();
    }, [visAntall, klikketViaKeyboard]);

    return (
        <VStack overflow="auto" height="60vh">
            <h3 className="sr-only">Velg samtalemal</h3>
            <div className="font-ax-bold" aria-live="polite">
                {values.filtrerteTekster.length} samtalemaler traff søket
            </div>
            <List id="standardtekster-liste" ref={listeRef}>
                {tekstElementer}
            </List>
            {values.filtrerteTekster.length > tekstElementer.length && visFlereTeksterKnapp}
        </VStack>
    );
}

export default StandardtekstListe;
