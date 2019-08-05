import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { AppState } from '../../redux/reducers';
import { isFailed, isNotStarted, RestResource, isLoaded, hasData } from '../utils/restResource';
import LazySpinner from '../../components/LazySpinner';
import { ReactNode } from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

export type Props<T> = {
    getResource: (restResources: RestEndepunkter) => RestResource<T>;
    children: (data: T) => ReactNode;
    returnOnError?: JSX.Element;
    returnOnPending?: JSX.Element;
    returnOnNotFound?: JSX.Element;
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
};

function RestResourceConsumer<T>(props: Props<T>) {
    const dispatch = useDispatch();
    const restResource = useSelector((state: AppState) => props.getResource(state.restResources));
    const { spinnerSize, returnOnPending, returnOnError, returnOnNotFound, children } = props;
    if (isNotStarted(restResource)) {
        dispatch(restResource.actions.fetch);
    }
    if (isFailed(restResource)) {
        return returnOnError || <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>;
    }
    if (!isLoaded(restResource)) {
        return returnOnPending || <LazySpinner type={spinnerSize || 'L'} />;
    }
    if (!hasData(restResource)) {
        return returnOnNotFound || <AlertStripeAdvarsel>Fant ingen data</AlertStripeAdvarsel>;
    }
    return <>{children(restResource.data)}</>;
}

export default RestResourceConsumer;
