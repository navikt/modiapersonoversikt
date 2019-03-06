import * as React from 'react';
import { ReactNode } from 'react';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import LazySpinner from '../LazySpinner';
import { FeatureToggles } from './toggleIDs';
import { isLoaded } from '../../redux/restReducers/restReducer';

export enum DisplayWhenToggleIs {
    ON,
    OFF
}

interface OwnProps {
    children: ReactNode;
    toggleID: FeatureToggles;
    mode: DisplayWhenToggleIs;
}

interface StateProps {
    isOn: boolean | undefined;
}

type Props = OwnProps & StateProps;

class FeatureToggle extends React.PureComponent<Props> {
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
            return <LazySpinner type="S" delay={1000} />;
        }

        if (this.shouldDisplay()) {
            return this.props.children;
        }

        return null;
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    const reducer = state.restEndepunkter.featureToggles;
    if (!isLoaded(reducer)) {
        return {
            isOn: undefined
        };
    }
    return {
        isOn: reducer.data[ownProps.toggleID]
    };
}

export default connect(mapStateToProps)(FeatureToggle);
