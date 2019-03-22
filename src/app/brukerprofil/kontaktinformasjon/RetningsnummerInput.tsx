import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Select from 'nav-frontend-skjema/lib/select';

import { KodeverkResponse } from '../../../models/kodeverk';
import { ValideringsResultat } from '../../../utils/forms/FormValidator';
import { TelefonInput } from './KontaktinformasjonForm';

const RetningsnummerWrapper = styled.div`
    margin-right: 2em;
`;

interface RetningsnummerInputProps {
    retningsnummerKodeverk: KodeverkResponse;
    retningsnummer: string;
    valideringsresultat: ValideringsResultat<TelefonInput>;
    onChange: (input: string) => void;
}

function DefaultRetningsnummer() {
    return (
        <option disabled={true} value={''} key={''}>
            Velg retningsnummer
        </option>
    );
}

function getRetningsnummerSelectValg(retningsnummerKodeverk: KodeverkResponse) {
    const retningsnummere = retningsnummerKodeverk.kodeverk.map(kodeverk => (
        <option value={kodeverk.kodeRef} key={kodeverk.kodeRef}>
            {kodeverk.beskrivelse} ({kodeverk.kodeRef})
        </option>
    ));
    return [DefaultRetningsnummer()].concat(retningsnummere);
}

function getValgtRetningsnummer(retningsnummerKodeverk: KodeverkResponse, retningsnummerInput: string) {
    const retningsnummer = retningsnummerKodeverk.kodeverk.find(kodeverdi => kodeverdi.kodeRef === retningsnummerInput);

    if (!retningsnummer) {
        return '';
    }
    return retningsnummer.kodeRef;
}

export function Retningsnummer(props: RetningsnummerInputProps) {
    const retningsnummerValg = getRetningsnummerSelectValg(props.retningsnummerKodeverk);
    const valgtRetningsnummer = getValgtRetningsnummer(props.retningsnummerKodeverk, props.retningsnummer);

    return (
        <RetningsnummerWrapper>
            <Select
                label="Landkode"
                bredde={'m'}
                value={valgtRetningsnummer}
                feil={props.valideringsresultat.felter.retningsnummer.skjemafeil}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => props.onChange(event.target.value)}
            >
                {retningsnummerValg}
            </Select>
        </RetningsnummerWrapper>
    );
}
