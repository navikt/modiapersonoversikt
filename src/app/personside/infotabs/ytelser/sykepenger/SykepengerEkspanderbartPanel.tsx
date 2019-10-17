import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import {
    getSykepengerIdDato,
    getUnikSykepengerKey,
    Sykepenger as ISykepenger
} from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';
import { useInfotabsDyplenker } from '../../dyplenker';

interface Props {
    sykepenger: ISykepenger;
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const dyplenker = useInfotabsDyplenker();
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(getSykepengerIdDato(sykepenger))];

    const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikSykepengerKey(sykepenger));

    return (
        <EkspanderbartYtelserPanel defaultApen={erValgtIUrl} tittel="Sykepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <Sykepenger sykepenger={sykepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
