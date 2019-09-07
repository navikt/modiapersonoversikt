import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Pleiepenger from './Pleiepenger';
import {
    getPleiepengerIdDato,
    getUnikPleiepengerKey,
    Pleiepengerettighet
} from '../../../../../models/ytelse/pleiepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { erValgtIDyplenke, YtelserDyplenkeRouteComponentProps } from '../../dyplenker';
import { withRouter } from 'react-router';

interface Props extends YtelserDyplenkeRouteComponentProps {
    pleiepenger: Pleiepengerettighet | null;
}

function PleiepengerEkspanderbartpanel({ pleiepenger, ...rest }: Props) {
    if (pleiepenger === null) {
        return null;
    }

    const tittelTillegsInfo = [
        'ID-dato: ' + formaterDato(getPleiepengerIdDato(pleiepenger)),
        'Barnets f.nr: ' + pleiepenger.barnet
    ];

    const valtIDyplenke = erValgtIDyplenke.ytelser(getUnikPleiepengerKey(pleiepenger), rest);

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
