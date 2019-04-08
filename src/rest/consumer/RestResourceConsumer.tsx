import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { AppState } from '../../redux/reducers';
import { isFailed, isLoaded, isNotStarted, RestResource } from '../utils/restResource';
import { RestRestourceFeilmelding } from './utils';
import LazySpinner from '../../components/LazySpinner';

export type RestResourceConsumerOwnProps<T> = {
    getRestResource: (restResources: RestEndepunkter) => RestResource<T>;
    children: (data: T) => ReactNode;
    returnOnError?: ReactNode;
    returnOnPending?: ReactNode;
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
};

interface StateProps<T> {
    restResource: RestResource<T>;
}

interface DispatchProps {
    dispatch: AsyncDispatch;
}

type Props<T> = RestResourceConsumerOwnProps<T> & DispatchProps & StateProps<T>;

class RestResourceConsumerUntyped<T> extends React.Component<Props<T>> {
    render() {
        const { restResource, dispatch, spinnerSize, returnOnPending, returnOnError, children } = this.props;
        if (isNotStarted(restResource)) {
            dispatch(restResource.actions.fetch);
        }
        if (isFailed(restResource)) {
            return returnOnError || <RestRestourceFeilmelding />;
        }
        if (!isLoaded(restResource)) {
            return returnOnPending || <LazySpinner type={spinnerSize || 'L'} />;
        }
        return children(restResource.data);
    }
}

function mapDispatchToProps<T>(dispatch: AsyncDispatch): DispatchProps {
    return {
        dispatch: dispatch
    };
}

function mapStateToProps<T>(state: AppState, ownProps: RestResourceConsumerOwnProps<T>): StateProps<T> {
    return {
        restResource: ownProps.getRestResource(state.restResources)
    };
}

const ConnectedRestResourceConsumerUntyped = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestResourceConsumerUntyped);

function RestResourceConsumer<T>(props: RestResourceConsumerOwnProps<T>) {
    const { children, ...resten } = props;
    return (
        <ConnectedRestResourceConsumerUntyped {...resten}>
            {data => children(data as T)}
        </ConnectedRestResourceConsumerUntyped>
    );
}

export default RestResourceConsumer;
