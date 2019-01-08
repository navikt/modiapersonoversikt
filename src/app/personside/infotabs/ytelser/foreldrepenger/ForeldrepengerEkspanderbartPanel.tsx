import * as React from 'react';
import { Foreldrepengerrettighet } from '../../../../../models/ytelse/foreldrepenger';
import { formaterDato } from '../../../../../utils/dateUtils';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Foreldrepenger from './ForeldrePenger';

interface Props {
    foreldrepenger: Foreldrepengerrettighet | null;
}

function ForeldrepengerEkspanderbartpanel({foreldrepenger}: Props) {

    if (foreldrepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        `ID-dato: ${foreldrepenger.rettighetFom && formaterDato(foreldrepenger.rettighetFom)}`,
        foreldrepenger.foreldrepengetype
    ];

    return (
        <EkspanderbartYtelserPanel tittel="Foreldrepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <Foreldrepenger foreldrepenger={foreldrepenger}/>
        </EkspanderbartYtelserPanel>
    );
}

export default ForeldrepengerEkspanderbartpanel;
