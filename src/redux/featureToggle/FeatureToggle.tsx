import * as React from 'react';
import { ReactNode } from 'react';
import { AppState } from '../reducers';
import { AsyncDispatch } from '../ThunkTypes';
import { connect } from 'react-redux';
import { getFetchFeatureToggleAndDispatchToRedux } from './getFeatureToggleAndDispatchToRedux';
import LazySpinner from '../../components/LazySpinner';

export enum DisplayWhenToggleIs {
    ON,
    OFF
}

interface OwnProps {
    children: ReactNode;
    toggleID: string;
    mode: DisplayWhenToggleIs;
}

interface StateProps {
    isOn: boolean;
}

interface DispatchProps {
    fetchFeatureToggle: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class FeatureToggle extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.fetchFeatureToggle();
    }

    shouldDisplay() {
        if (this.props.mode === DisplayWhenToggleIs.ON && this.props.isOn) {
            return true;
        }
        if (this.props.mode === DisplayWhenToggleIs.OFF && !this.props.isOn) {
            return true;
        }
        return false;
    }

    render() {
        const pending = this.props.isOn === undefined;
        if (pending) {
            return <LazySpinner type="S" delay={1000}/>;
        }

        if (this.shouldDisplay()) {
            return this.props.children;
        }

        return null;
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        isOn: state.featureToggle[ownProps.toggleID]
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch, ownProps: OwnProps): DispatchProps {
    return {
        fetchFeatureToggle: () => getFetchFeatureToggleAndDispatchToRedux(ownProps.toggleID, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggle);
