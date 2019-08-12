import * as React from 'react';
import { Temagruppe } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface Props {
    setTema: (tema?: Kodeverk) => void;
    tema?: Kodeverk;
    visFeilmelding?: boolean;
}

export const temaValg: Kodeverk[] = [
    { beskrivelse: 'Arbeid', kodeRef: Temagruppe.Arbeid },
    { beskrivelse: 'Familie', kodeRef: Temagruppe.Familie },
    { beskrivelse: 'Hjelpemiddel', kodeRef: Temagruppe.Hjelpemiddel },
    { beskrivelse: 'Pensjon', kodeRef: Temagruppe.Pensjon },
    { beskrivelse: 'Øvrig', kodeRef: Temagruppe.Øvrig }
];

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
`;

function Temavelger(props: Props) {
    let selectRef: HTMLSelectElement | null = null;

    useEffect(() => {
        if (props.visFeilmelding) {
            selectRef && selectRef.focus();
        }
    }, [selectRef, props.visFeilmelding]);

    const velgTemaHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const tema = temaValg.find(tema => tema.kodeRef === event.target.value);
        props.setTema(tema);
    };
    return (
        <SkjemaGruppe feil={props.visFeilmelding ? { feilmelding: 'Du må velge temagruppe' } : undefined}>
            <StyledSelect
                // @ts-ignore
                selectRef={ref => (selectRef = ref)}
                label="Tema"
                onChange={velgTemaHandler}
                value={props.tema ? props.tema.kodeRef : ''}
            >
                <option value="" disabled>
                    Velg temagruppe
                </option>
                {temaValg.map(valg => (
                    <option key={valg.kodeRef} value={valg.kodeRef}>
                        {valg.beskrivelse}
                    </option>
                ))}
            </StyledSelect>
        </SkjemaGruppe>
    );
}

export default Temavelger;
