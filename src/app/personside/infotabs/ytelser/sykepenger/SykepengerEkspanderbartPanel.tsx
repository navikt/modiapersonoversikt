import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykmeldingsperiode } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';

interface Props {
    sykepenger: Sykmeldingsperiode;
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(sykepenger.sykmeldtFom)];

    return (
        <EkspanderbartYtelserPanel tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            {JSON.stringify(sykepenger)}
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
