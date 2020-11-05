import React, { useMemo, useRef } from 'react';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { useAppState, useOnMount } from '../../utils/customHooks';
import {
    hasData,
    isFailed,
    isForbidden,
    isLoading,
    isNotFound,
    isNotStarted,
    isReloading,
    RestResource,
    RestResourceActions
} from '../utils/restResource';
import Placeholder, { RestResourcePlaceholderProps } from './placeholder';
import { useDispatch } from 'react-redux';
import { guid } from 'nav-frontend-js-utils';

export type UseRestResource<T> = {
    resource: RestResource<T>;
    data?: T;
    placeholder: JSX.Element;
    actions: RestResourceActions<T>;
    isLoading: boolean;
    isReloading: boolean;
    isNotStarted: boolean;
    isFailed: boolean;
    hasError: boolean;
};

export function useRestResource<T>(
    selector: (resources: RestEndepunkter) => RestResource<T>,
    placeholderProps?: RestResourcePlaceholderProps,
    autoFetch?: boolean
): UseRestResource<T> {
    const resource = useAppState(state => selector(state.restResources));
    const dispatch = useDispatch();
    const placeholderKey = useRef(placeholderProps?.placeholderKey ?? guid());

    useOnMount(() => {
        if (isNotStarted(resource) && autoFetch) {
            dispatch(resource.actions.fetch);
        }
    });

    return useMemo(
        () => ({
            resource: resource,
            data: hasData(resource) ? resource.data : undefined,
            placeholder: (
                <Placeholder restResource={resource} placeholderProps={placeholderProps} key={placeholderKey.current} />
            ),
            actions: resource.actions,
            isLoading: isLoading(resource),
            isReloading: isReloading(resource),
            isNotStarted: isNotStarted(resource),
            isFailed: isFailed(resource),
            hasError: isFailed(resource) || isForbidden(resource) || isNotFound(resource)
        }),
        [resource, placeholderKey, placeholderProps]
    );
}
