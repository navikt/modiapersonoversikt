import * as React from 'react';
import { ReactNode } from 'react';
import { AppState } from '../reducers';
import { AsyncDispatch } from '../ThunkTypes';
import { connect } from 'react-redux';
import { getFetchFeatureToggleAndDispatchToRedux } from './getFeatureToggleAndDispatchToRedux';
import LazySpinner from '../../components/LazySpinner';

interface OwnProps {
    children: ReactNode;
    toggleID: string;
    displayWhenFeatureToggleOff?: boolean;
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

    render() {
        const pending = this.props.isOn === undefined;
        if (pending) {
            return <LazySpinner type="S" delay={1000}/>;
        }
        if (!this.props.displayWhenFeatureToggleOff && this.props.isOn) {
            return this.props.children;
        }
        if (this.props.displayWhenFeatureToggleOff && !this.props.isOn) {
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
