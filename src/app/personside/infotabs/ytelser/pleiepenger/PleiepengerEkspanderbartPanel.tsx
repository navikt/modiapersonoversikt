import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Pleiepenger from './Pleiepenger';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { getSistePeriodeForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
import moment from 'moment';
import { backendDatoformat } from '../../../../../mock/utils/mock-utils';
import { erValgtIDyplenke, YtelserDyplenkeRouteComponentProps } from '../../dyplenker';
import { withRouter } from 'react-router';

interface Props extends YtelserDyplenkeRouteComponentProps {
    pleiepenger: Pleiepengerettighet | null;
}

export function getPleiepengerIdDato(pleiepengerettighet: Pleiepengerettighet) {
    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepengerettighet(pleiepengerettighet);
    return sistePeriodeForPleiepengerettighet
        ? sistePeriodeForPleiepengerettighet.fom
        : moment().format(backendDatoformat);
}

function PleiepengerEkspanderbartpanel({ pleiepenger, ...rest }: Props) {
    if (pleiepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        'ID-dato: ' + formaterDato(getPleiepengerIdDato(pleiepenger)),
        'Barnets f.nr: ' + pleiepenger.barnet
    ];

    const valtIDyplenke = erValgtIDyplenke.ytelser('pleiepenger' + getPleiepengerIdDato(pleiepenger), rest);

    return (
        <EkspanderbartYtelserPanel
            defaultApen={valtIDyplenke}
            tittel="Pleiepenger sykt barn"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Pleiepenger pleiepenger={pleiepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default withRouter(PleiepengerEkspanderbartpanel);
