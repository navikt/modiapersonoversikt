import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Pleiepenger from './Pleiepenger';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { getSistePeriodeForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';

interface Props {
    pleiepenger: Pleiepengerettighet | null;
}

function PleiepengerEkspanderbartpanel({ pleiepenger }: Props) {
    if (pleiepenger === null) {
        return null;
    }

    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepengerettighet(pleiepenger);
    const tittelTillegsInfo = [
        'ID-dato: ' +
            (sistePeriodeForPleiepengerettighet ? formaterDato(sistePeriodeForPleiepengerettighet.fom) : 'N/A'),
        'Barnets f.nr: ' + pleiepenger.barnet
    ];

    return (
        <EkspanderbartYtelserPanel tittel="Pleiepenger sykt barn" tittelTillegsInfo={tittelTillegsInfo}>
            <Pleiepenger pleiepenger={pleiepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default PleiepengerEkspanderbartpanel;
