import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Select from 'nav-frontend-skjema/lib/select';

import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { Utlandsadresse } from '../../../../models/personadresse';
import { alfabetiskKodeverkComparator } from '../../../../utils/kodeverkUtils';

const LandWrapper = styled.div`
  margin-right: 2em;
`;

interface LandInputProps {
    landKodeverk: KodeverkResponse;
    midlertidigAdresseUtland: Utlandsadresse;
    onChange: (input: Kodeverk) => void;
    visFeilmeldinger: boolean;
}

function getLandSelectValg(landKodeverk: KodeverkResponse) {
    return landKodeverk.kodeverk
        .sort(alfabetiskKodeverkComparator)
        .map(kodeverk =>
            (
                <option value={kodeverk.kodeRef} key={kodeverk.kodeRef}>
                    {kodeverk.beskrivelse} ({kodeverk.kodeRef})
                </option>
            )
        );
}

function getValgtLand(landKodeverk: KodeverkResponse, landInput?: Kodeverk) {
    if (landInput) {
        const landKode = getValgtLandKode(landKodeverk, landInput.kodeRef);

        if (!landKode) {
            return '';
        }
        return landKode.kodeRef;
    }
    return '';
}

function getValgtLandKode(landKodeverk: KodeverkResponse, landInput: string) {
    const land = landKodeverk.kodeverk
        .find(kodeverdi => kodeverdi.kodeRef === landInput);

    if (!land) {
        return {kodeRef: '', beskrivelse: ''};
    }

    return land;
}

export function Land(props: LandInputProps) {
    const landValg = getLandSelectValg(props.landKodeverk);
    const valgtLand = getValgtLand(props.landKodeverk, props.midlertidigAdresseUtland.landkode);

    return (
        <LandWrapper>
            <Select
                label="Land"
                bredde={'m'}
                value={valgtLand}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    props.onChange(getValgtLandKode(props.landKodeverk, event.target.value))}
            >
                <option disabled={true} value={''} key={''}>Velg land</option>
                {landValg}
            </Select>
        </LandWrapper>
    );
}
