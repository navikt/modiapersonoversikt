import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { AppState } from '../../redux/reducers';
import Innholdslaster, { InnholdslasterProps } from '../../components/Innholdslaster';
import { isLoaded, isNotStarted, RestResource } from '../utils/restResource';

interface DispatchProps {
    dispatch: AsyncDispatch;
}

export type RestResourceConsumerOwnProps<T> = Pick<
    InnholdslasterProps,
    'spinnerSize' | 'returnOnPending' | 'returnOnError'
> & {
    getRestResource: (restResources: RestEndepunkter) => RestResource<T>;
    children: (data: T) => ReactNode;
};

interface StateProps<T> {
    restResource: RestResource<T>;
}

type Props<T> = RestResourceConsumerOwnProps<T> & DispatchProps & StateProps<T>;

class RestResourceConsumerUntyped<T> extends React.Component<Props<T>> {
    render() {
        const { children, restResource, dispatch, ...innholdsLasterProps } = this.props;
        if (isNotStarted(restResource)) {
            dispatch(restResource.actions.fetch);
        }
        if (!isLoaded(restResource)) {
            return <Innholdslaster avhengigheter={[restResource]} {...innholdsLasterProps} />;
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestResourceConsumerUntyped);
