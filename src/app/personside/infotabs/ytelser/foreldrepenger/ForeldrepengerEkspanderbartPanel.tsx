import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Foreldrepenger from './ForeldrePenger';
import moment from 'moment';
import { backendDatoformat } from '../../../../../mock/utils/mock-utils';
import { erValgtIDyplenke, YtelserDyplenkeRouteComponentProps } from '../../dyplenker';
import { withRouter } from 'react-router';

interface Props extends YtelserDyplenkeRouteComponentProps {
    foreldrepenger: Foreldrepengerettighet | null;
}

export function getForeldepengerIdDato(foreldrepenger: Foreldrepengerettighet) {
    return foreldrepenger.rettighetFom ? foreldrepenger.rettighetFom : moment().format(backendDatoformat);
}

function ForeldrepengerEkspanderbartpanel({ foreldrepenger, ...rest }: Props) {
    if (foreldrepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        `ID-dato: ${formaterDato(getForeldepengerIdDato(foreldrepenger))}`,
        foreldrepenger.foreldrepengetype
    ];

    const erValgt = erValgtIDyplenke.ytelser('foreldrepenger' + getForeldepengerIdDato(foreldrepenger), rest);

    return (
        <EkspanderbartYtelserPanel defaultApen={erValgt} tittel="Foreldrepenger" tittelTillegsInfo={tittelTillegsInfo}>
            <Foreldrepenger foreldrepenger={foreldrepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default withRouter(ForeldrepengerEkspanderbartpanel);
