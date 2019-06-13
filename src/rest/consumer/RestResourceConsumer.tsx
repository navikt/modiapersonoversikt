import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { AppState } from '../../redux/reducers';
import { isFailed, isLoaded, isNotStarted, RestResource } from '../utils/restResource';
import { RestRestourceFeilmelding } from './utils';
import LazySpinner from '../../components/LazySpinner';
import { ReactNode } from 'react';

export type Props<T> = {
    getResource: (restResources: RestEndepunkter) => RestResource<T>;
    children: (data: T) => ReactNode;
    returnOnError?: JSX.Element;
    returnOnPending?: JSX.Element;
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
};

function RestResourceConsumer<T>(props: Props<T>) {
    const dispatch = useDispatch();
    const restResource = useSelector((state: AppState) => props.getResource(state.restResources));
    const { spinnerSize, returnOnPending, returnOnError, children } = props;
    if (isNotStarted(restResource)) {
        dispatch(restResource.actions.fetch);
    }
    if (isFailed(restResource)) {
        return returnOnError || <RestRestourceFeilmelding />;
    }
    if (!isLoaded(restResource)) {
        return returnOnPending || <LazySpinner type={spinnerSize || 'L'} />;
    }
    return <>{children(restResource.data)}</>;
}

export default RestResourceConsumer;
