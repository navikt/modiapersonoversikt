import * as React from 'react';
import { ReactNode } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import { STATUS } from '../redux/restReducers/utils';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';
import { Loaded, RestResource } from '../redux/restReducers/restResource';

type SpinnerSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface InnholdslasterProps {
    children?: ReactNode;
    avhengigheter: RestResource<object>[];
    spinnerSize?: SpinnerSize;
    returnOnPending?: React.ReactChildren | React.ReactChild;
    returnOnError?: React.ReactChildren | React.ReactChild;
}

const array = (value: object) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: STATUS[]) => (element: RestResource<object>) => array(status).includes(element.status);
const harGyldigResponse = (resource: RestResource<object>) => (resource as Loaded<object>).data !== undefined;
const alleLastet = (avhengigheter: RestResource<object>[]) =>
    avhengigheter.every(harStatus(STATUS.SUCCESS, STATUS.RELOADING)) && avhengigheter.every(harGyldigResponse);
const alleHarValidResponse = (avhengigheter: RestResource<object>[]) =>
    avhengigheter.filter(harStatus(STATUS.SUCCESS)).every(harGyldigResponse);
const noenHarFeil = (avhengigheter: RestResource<object>[]) => {
    const noenHarStatusError = avhengigheter.some(harStatus(STATUS.FAILED));
    const noenErLastetMedInvalidResponse = !alleHarValidResponse(avhengigheter);
    return noenHarStatusError || noenErLastetMedInvalidResponse;
};

function Feilvisning(props: { onError?: React.ReactChildren | React.ReactChild }) {
    if (props.onError) {
        return <>{props.onError}</>;
    }
    return (
        <FillCenterAndFadeIn>
            <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>
        </FillCenterAndFadeIn>
    );
}

function Pending(props: { onPending?: React.ReactChildren | React.ReactChild; spinnerSize?: SpinnerSize }) {
    if (props.onPending) {
        return <>{props.onPending}</>;
    }
    return (
        <FillCenterAndFadeIn>
            <NavFrontendSpinner type={props.spinnerSize || 'XXL'} />
        </FillCenterAndFadeIn>
    );
}

class Innholdslaster extends React.Component<InnholdslasterProps> {
    render() {
        const { avhengigheter, children, returnOnPending, returnOnError, spinnerSize } = this.props;
        const alleAvhengigheterErLastetOK = alleLastet(avhengigheter) && alleHarValidResponse(avhengigheter);

        if (alleAvhengigheterErLastetOK) {
            return children || null;
        } else if (noenHarFeil(avhengigheter)) {
            return <Feilvisning onError={returnOnError} />;
        } else {
            return <Pending onPending={returnOnPending} spinnerSize={spinnerSize} />;
        }
    }
}

export default Innholdslaster;
