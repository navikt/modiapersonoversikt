import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';

interface Props {
    sykepenger: ISykepenger;
}

export function getSykepengerIdDatp(sykepenger: ISykepenger) {
    return sykepenger.sykmeldtFom;
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(getSykepengerIdDatp(sykepenger))];

    return (
        <EkspanderbartYtelserPanel tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <Sykepenger sykepenger={sykepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
