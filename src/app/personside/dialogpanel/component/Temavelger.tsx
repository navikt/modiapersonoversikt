import * as React from 'react';
import { Temagruppe } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { Select } from 'nav-frontend-skjema';
import { ChangeEvent } from 'react';

interface Props {
    setTema: (tema?: Kodeverk) => void;
    tema?: Kodeverk;
    visFeilmelding?: boolean;
    selectRef?: (ref: HTMLSelectElement) => void;
}

export const temaValg: Kodeverk[] = [
    { beskrivelse: 'Arbeid', kodeRef: Temagruppe.Arbeid },
    { beskrivelse: 'Familie', kodeRef: Temagruppe.Familie },
    { beskrivelse: 'Hjelpemiddel', kodeRef: Temagruppe.Hjelpemiddel },
    { beskrivelse: 'Pensjon', kodeRef: Temagruppe.Pensjon },
    { beskrivelse: 'Øvrig', kodeRef: Temagruppe.Øvrig }
];

function Temavelger(props: Props) {
    const velgTemaHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const tema = temaValg.find(tema => tema.kodeRef === event.target.value);
        props.setTema(tema);
    };
    return (
        <Select
            // @ts-ignore
            selectRef={props.selectRef}
            label="Tema"
            onChange={velgTemaHandler}
            feil={props.visFeilmelding ? { feilmelding: 'Du må velge tema' } : undefined}
            value={props.tema ? props.tema.kodeRef : ''}
        >
            <option value="" disabled>
                Velg tema
            </option>
            {temaValg.map(valg => (
                <option key={valg.kodeRef} value={valg.kodeRef}>
                    {valg.beskrivelse}
                </option>
            ))}
        </Select>
    );
}

export default Temavelger;
