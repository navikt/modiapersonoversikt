import * as React from 'react';
import { SyfoPunkt } from '../../../../models/oppfolging';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';

interface Props {
    syfoPunkt: SyfoPunkt[];
}

function SykefravarsoppfolgingEkspanderbartPanel(props: Props) {
    if (props.syfoPunkt.length === 0) {
        return <AlertStripeInfo>Det finnes ikke oppfølgingsinformasjon om bruker i Arena</AlertStripeInfo>;
    }

    const tittelTillegsInfo = ['Antall punkter: ' + props.syfoPunkt.length];

    return (
        <EkspanderbartYtelserPanel tittel="Sykefraværsoppfølging" tittelTillegsInfo={tittelTillegsInfo}>
            {JSON.stringify(props.syfoPunkt)}
        </EkspanderbartYtelserPanel>
    );
}

export default SykefravarsoppfolgingEkspanderbartPanel;
