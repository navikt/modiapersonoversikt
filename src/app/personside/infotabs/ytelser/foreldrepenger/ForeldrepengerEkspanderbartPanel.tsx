import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Foreldrepenger from './ForeldrePenger';
import moment from 'moment';
import { backendDatoformat } from '../../../../../mock/utils/mock-utils';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

export function getForeldepengerIdDato(foreldrepenger: Foreldrepengerettighet) {
    return foreldrepenger.rettighetFom ? foreldrepenger.rettighetFom : moment().format(backendDatoformat);
}

function ForeldrepengerEkspanderbartpanel({ foreldrepenger }: Props) {
    if (foreldrepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        `ID-dato: ${formaterDato(getForeldepengerIdDato(foreldrepenger))}`,
        foreldrepenger.foreldrepengetype
    ];

    return (
        <EkspanderbartYtelserPanel tittel="Foreldrepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <Foreldrepenger foreldrepenger={foreldrepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default ForeldrepengerEkspanderbartpanel;
