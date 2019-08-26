import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { isFailed, isNotStarted, RestResource, isLoaded, hasData, HasData } from '../utils/restResource';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LazySpinner from '../../components/LazySpinner';
import { useOnMount } from '../../utils/customHooks';

type Resources<T> = {
    [P in keyof T]: RestResource<T[P]>;
};

export type Props<T extends { [key: string]: any }> = {
    getResource: (restResources: RestEndepunkter) => Resources<T>;
    children: (data: T) => ReactNode;
    returnOnError?: JSX.Element;
    returnOnPending?: JSX.Element;
    returnOnNotFound?: JSX.Element;
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
};

function some<T>(resources: Resources<T>, fn: (restResource: RestResource<any>) => boolean): boolean {
    return (Object.values(resources) as Array<RestResource<any>>).some(fn);
}

function every<T>(resources: Resources<T>, fn: (restResource: RestResource<any>) => boolean): boolean {
    return (Object.values(resources) as Array<RestResource<any>>).every(fn);
}
function forEach<T>(resources: Resources<T>, fn: (restResource: RestResource<any>) => void) {
    (Object.values(resources) as Array<RestResource<any>>).forEach(fn);
}

function MultiRestResourceConsumer<T>(props: Props<T>) {
    const { spinnerSize, returnOnPending, returnOnError, returnOnNotFound, children } = props;
    const restResources: Resources<T> = useSelector((state: AppState) => props.getResource(state.restResources));
    const dispatch = useDispatch();

    useOnMount(() => {
        forEach(restResources, restResource => {
            if (isNotStarted(restResource)) {
                dispatch(restResource.actions.fetch);
            }
        });
    });

    if (some(restResources, isFailed)) {
        return returnOnError || <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>;
    }
    if (!every(restResources, isLoaded)) {
        return returnOnPending || <LazySpinner type={spinnerSize || 'L'} />;
    }
    if (!some(restResources, hasData)) {
        return returnOnNotFound || <AlertStripeAdvarsel>Fant ingen data</AlertStripeAdvarsel>;
    }
    const data = Object.entries<RestResource<any>>(restResources)
        .map(([key, value]) => [key, (value as HasData<any>).data])
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as T);

    return <>{children(data)}</>;
}

export default MultiRestResourceConsumer;
