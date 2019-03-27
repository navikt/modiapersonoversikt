import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';

interface Props {
    sykepenger: ISykepenger;
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(sykepenger.sykmeldtFom)];

    return (
        <EkspanderbartYtelserPanel tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <ol>
                <Sykepenger sykepenger={sykepenger} />
            </ol>
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
