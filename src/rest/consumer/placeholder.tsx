import * as React from 'react';
import {
    hasData,
    isFailed,
    isForbidden,
    isLoading,
    isNotFound,
    isNotStarted,
    RestResource
} from '../utils/restResource';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import LazySpinner from '../../components/LazySpinner';
import { loggError } from '../../utils/logger/frontendLogger';
import DelayRender from '../../components/DelayRender';

export interface RestResourcePlaceholderProps {
    returnOnError?: JSX.Element | string;
    returnOnPending?: JSX.Element | string;
    returnOnNotFound?: JSX.Element | string;
    returnOnForbidden?: JSX.Element | string;
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
}

export interface Props<T> {
    restResource: RestResource<T>;
    placeholderProps?: RestResourcePlaceholderProps;
}

function wrapStringInAlertstripe(value?: string | JSX.Element) {
    if (!value) {
        return undefined;
    }
    if (typeof value === 'string') {
        return <AlertStripeAdvarsel>{value}</AlertStripeAdvarsel>;
    }
    return value;
}

function Placeholder<T>(props: Props<T>) {
    const placeholders = props.placeholderProps;

    if (isLoading(props.restResource)) {
        return (
            wrapStringInAlertstripe(placeholders?.returnOnPending) || (
                <LazySpinner type={placeholders?.spinnerSize || 'M'} />
            )
        );
    }

    if (isFailed(props.restResource)) {
        return (
            wrapStringInAlertstripe(placeholders?.returnOnError) || (
                <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>
            )
        );
    }

    if (isForbidden(props.restResource)) {
        return (
            wrapStringInAlertstripe(placeholders?.returnOnForbidden) || (
                <AlertStripeAdvarsel>Du har ikke tilgang til denne informasjonen</AlertStripeAdvarsel>
            )
        );
    }

    if (isNotFound(props.restResource)) {
        return (
            wrapStringInAlertstripe(placeholders?.returnOnNotFound) || (
                <AlertStripeAdvarsel>Fant ingen data</AlertStripeAdvarsel>
            )
        );
    }

    if (isNotStarted(props.restResource)) {
        return (
            <DelayRender delay={100}>
                <AlertStripeFeil>Startet ikke å laste</AlertStripeFeil>
            </DelayRender>
        );
    }

    if (hasData(props.restResource)) {
        return null;
    }

    loggError(new Error(`Restresource-state ikke håndtert: ${props.restResource.status}`));
    return <AlertStripeFeil>Det skjedde en feil</AlertStripeFeil>;
}

export default Placeholder;
