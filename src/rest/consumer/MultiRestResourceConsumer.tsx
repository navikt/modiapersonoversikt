import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { hasData, HasData, isFailed, isLoaded, isNotStarted, RestResource } from '../utils/restResource';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LazySpinner from '../../components/LazySpinner';
import { useOnMount } from '../../utils/customHooks';
import { STATUS } from '../utils/utils';

type Resources<T> = {
    [P in keyof T]: RestResource<T[P]>;
};

export type BaseProps<T extends { [key: string]: any }> = {
    getResource: (restResources: RestEndepunkter) => Resources<T>;
    children: (status: STATUS, data: T | null) => ReactNode;
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

export function MultiRestResourceConsumerBase<T>(props: BaseProps<T>) {
    const { children } = props;
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
        return <>{children(STATUS.FAILED, null)}</>;
    }
    if (!every(restResources, isLoaded)) {
        return <>{children(STATUS.LOADING, null)}</>;
    }
    if (!some(restResources, hasData)) {
        return <>{children(STATUS.NOT_FOUND, null)}</>;
    }

    const data = Object.entries<RestResource<any>>(restResources)
        .map(([key, value]) => [key, (value as HasData<any>).data])
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as T);

    return <>{children(STATUS.SUCCESS, data)}</>;
}

function MultiRestResourceConsumer<T>(props: Props<T>) {
    const { spinnerSize, returnOnPending, returnOnError, returnOnNotFound, getResource, children } = props;
    return (
        <MultiRestResourceConsumerBase<T> getResource={getResource}>
            {(status: STATUS, data: T | null) => {
                if (status == STATUS.FAILED) {
                    return returnOnError || <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>;
                }
                if (status === STATUS.LOADING) {
                    return returnOnPending || <LazySpinner type={spinnerSize || 'L'} />;
                }
                if (status === STATUS.NOT_FOUND) {
                    return returnOnNotFound || <AlertStripeAdvarsel>Fant ingen data</AlertStripeAdvarsel>;
                }

                return <>{children(data as T)}</>;
            }}
        </MultiRestResourceConsumerBase>
    );
}

export default MultiRestResourceConsumer;
