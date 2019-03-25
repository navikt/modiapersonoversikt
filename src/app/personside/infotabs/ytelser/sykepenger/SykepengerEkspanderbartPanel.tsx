import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykepenger } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import SykepengerKomponent from './SykepengerKomponent';

interface Props {
    sykepenger: Sykepenger[];
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato('2010-01-01')];

    return (
        <EkspanderbartYtelserPanel tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <ol>
                {sykepenger.map((rettighet, index) => (
                    <SykepengerKomponent key={index} sykepenger={rettighet} sykepengenr={index + 1} />
                ))}
            </ol>
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
