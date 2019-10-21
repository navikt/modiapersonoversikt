import * as React from 'react';
import {
    Foreldrepengerettighet,
    getForeldepengerIdDato,
    getUnikForeldrepengerKey
} from '../../../../../models/ytelse/foreldrepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Foreldrepenger from './ForeldrePenger';
import { useInfotabsDyplenker } from '../../dyplenker';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

function ForeldrepengerEkspanderbartpanel({ foreldrepenger }: Props) {
    const dyplenker = useInfotabsDyplenker();
    if (foreldrepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        `ID-dato: ${formaterDato(getForeldepengerIdDato(foreldrepenger))}`,
        foreldrepenger.foreldrepengetype
    ];

    const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikForeldrepengerKey(foreldrepenger));

    return (
        <EkspanderbartYtelserPanel
            defaultApen={erValgtIUrl}
            tittel="Foreldrepenger"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Foreldrepenger foreldrepenger={foreldrepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default ForeldrepengerEkspanderbartpanel;
