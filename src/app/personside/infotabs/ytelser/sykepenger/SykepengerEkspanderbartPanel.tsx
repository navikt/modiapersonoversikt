import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';

interface Props {
    sykepenger: ISykepenger[];
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato('2010-01-01')];

    return (
        <EkspanderbartYtelserPanel tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <ol>
                {sykepenger.map((rettighet, index) => (
                    <Sykepenger key={index} sykepenger={rettighet} sykepengenr={index + 1} />
                ))}
            </ol>
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
