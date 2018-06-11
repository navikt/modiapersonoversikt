import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Select from 'nav-frontend-skjema/lib/select';

import { KodeverkResponse } from '../../../models/kodeverk';
import { getSkjemafeil, InputState } from '../formUtils';

const RetningsnummerWrapper = styled.div`
  margin-right: 2em;
`;

function DefaultRetningsnummer() {
    return (
        <option
            disabled={true}
            value={''}
            key={''}
        >
            Velg retningsnummer
        </option>
    );
}

function getRetningsnummerSelectValg(retningsnummerKodeverk: KodeverkResponse) {
    const retningsnummere = retningsnummerKodeverk.kodeverk.map(kodeverk =>
        (
            <option value={kodeverk.kodeRef} key={kodeverk.kodeRef}>
                {kodeverk.beskrivelse} (+{kodeverk.kodeRef})
            </option>
        )
    );
    return [DefaultRetningsnummer()].concat(retningsnummere);
}

function getValgtRetningsnummer(retningsnummerKodeverk: KodeverkResponse, retningsnummerInput: string) {
    const retningsnummer = retningsnummerKodeverk.kodeverk
        .find(kodeverdi => kodeverdi.kodeRef === retningsnummerInput);

    if (!retningsnummer) {
        return '';
    }
    return retningsnummer.kodeRef;
}

interface RetningsnummerInputProps {
    retningsnummerKodeverk: KodeverkResponse;
    state: InputState;
    onChange: (input: string) => void;
}

export function Retningsnummer({retningsnummerKodeverk, state, onChange}: RetningsnummerInputProps) {
    const retningsnummerValg = getRetningsnummerSelectValg(retningsnummerKodeverk);
    const valgtRetningsnummer = getValgtRetningsnummer(retningsnummerKodeverk, state.input);

    const skjemafeil = getSkjemafeil(state);

    return (
        <RetningsnummerWrapper>
            <Select
                label="Landkode"
                bredde={'m'}
                value={valgtRetningsnummer}
                feil={skjemafeil}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    onChange(event.target.value)}
            >
                {retningsnummerValg}
            </Select>
        </RetningsnummerWrapper>
    );
}