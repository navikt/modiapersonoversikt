import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Pleiepenger from './Pleiepenger';
import {
    getPleiepengerIdDato,
    getUnikPleiepengerKey,
    Pleiepengerettighet
} from '../../../../../models/ytelse/pleiepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { useInfotabsDyplenker } from '../../dyplenker';

interface Props {
    pleiepenger: Pleiepengerettighet | null;
}

function PleiepengerEkspanderbartpanel({ pleiepenger }: Props) {
    const dyplenker = useInfotabsDyplenker();
    if (pleiepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        'ID-dato: ' + formaterDato(getPleiepengerIdDato(pleiepenger)),
        'Barnets f.nr: ' + pleiepenger.barnet
    ];

    const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikPleiepengerKey(pleiepenger));

    return (
        <EkspanderbartYtelserPanel
            defaultApen={erValgtIUrl}
            tittel="Pleiepenger sykt barn"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Pleiepenger pleiepenger={pleiepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default PleiepengerEkspanderbartpanel;
