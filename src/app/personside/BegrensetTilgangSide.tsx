import * as React from 'react';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import { HarIkkeTilgang } from '../../redux/restReducers/tilgangskontroll';

interface BegrensetTilgangProps {
    tilgangsData: HarIkkeTilgang;
}

function BegrensetTilgangSide(props: BegrensetTilgangProps) {
    return (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">
                <BegrensetTilgangBegrunnelse begrunnelseType={props.tilgangsData.ikkeTilgangArsak} />
            </AlertStripe>
        </FillCenterAndFadeIn>
    );
}

export default BegrensetTilgangSide;
