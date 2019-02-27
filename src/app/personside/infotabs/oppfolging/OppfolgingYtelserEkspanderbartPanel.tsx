import * as React from 'react';
import { OppfolgingsYtelse } from '../../../../models/oppfolging';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';

interface Props {
    ytelser: OppfolgingsYtelse[];
}

function OppfolgingYtelserEkspanderbartPanel(props: Props) {
    if (props.ytelser.length === 0) {
        return <AlertStripeInfo>Det finnes ikke ytelsesinformasjon om bruker i Arena</AlertStripeInfo>;
    }

    const tittelTillegsInfo = ['Antall ytelser: ' + props.ytelser.length];

    return (
        <EkspanderbartYtelserPanel tittel="Ytelser" tittelTillegsInfo={tittelTillegsInfo}>
            {JSON.stringify(props.ytelser)}
        </EkspanderbartYtelserPanel>
    );
}

export default OppfolgingYtelserEkspanderbartPanel;
