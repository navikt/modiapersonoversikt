import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';

export function RestRestourceFeilmelding() {
    return (
        <FillCenterAndFadeIn>
            <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>
        </FillCenterAndFadeIn>
    );
}
