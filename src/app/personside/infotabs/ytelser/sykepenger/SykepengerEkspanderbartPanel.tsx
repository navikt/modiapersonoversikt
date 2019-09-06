import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';
import { erValgtIDyplenke, YtelserDyplenkeRouteComponentProps } from '../../dyplenker';
import { withRouter } from 'react-router';

interface Props extends YtelserDyplenkeRouteComponentProps {
    sykepenger: ISykepenger;
}

export function getSykepengerIdDato(sykepenger: ISykepenger) {
    return sykepenger.sykmeldtFom;
}

function SykepengerEkspanderbartpanel({ sykepenger, ...rest }: Props) {
    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(getSykepengerIdDato(sykepenger))];

    const valtIDyplenke = erValgtIDyplenke.ytelser('sykepenger' + getSykepengerIdDato(sykepenger), rest);

    return (
        <EkspanderbartYtelserPanel
            defaultApen={valtIDyplenke}
            tittel="Sykepenger"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Sykepenger sykepenger={sykepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default withRouter(SykepengerEkspanderbartpanel);
