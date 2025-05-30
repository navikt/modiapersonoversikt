import { Button } from '@navikt/ds-react';
import { useAtom } from 'jotai/index';
import { type ChangeEvent, useState } from 'react';
import type * as StandardTeksterType from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { standardTekstSokAtom } from 'src/components/melding/StandardTekster';
import TekstListeElement from 'src/components/melding/TekstlisteElement';

function StandardtekstListe() {
    const [visAntall, setVisAntall] = useState(50);
    const [values, setValue] = useAtom(standardTekstSokAtom);

    const velgTekst = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((values) => ({
            ...values,
            tekst: values.filtrerteTekster.find(
                (element: StandardTeksterType.Tekst) => element.id === event.target.value
            )
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
        <Button type="button" onClick={() => setVisAntall(visAntall + 50)}>
            Vis flere tekster
        </Button>
    );

    return (
        <nav className="flex min-w-1/3">
            <h3 className="sr-only">Velg samtalemal</h3>
            <div aria-live="polite">{values.filtrerteTekster?.length} samtalemaler traff søket</div>
            <ul className="standardtekster__liste">{tekstElementer}</ul>
            {(values.filtrerteTekster?.length ?? 0) > tekstElementer.length && visFlereTeksterKnapp}
        </nav>
    );
}

export default StandardtekstListe;
