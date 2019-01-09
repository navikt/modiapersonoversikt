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
    reverse?: boolean;
}

interface StateProps {
    turnedOn: boolean;
    turnedOff: boolean;
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
        if (this.props.reverse && this.props.turnedOff) {
            return this.props.children;
        }
        if (!this.props.reverse && this.props.turnedOn) {
            return this.props.children;
        }
        if (!this.props.turnedOn && !this.props.turnedOff) {
            return <LazySpinner type="S" delay={1000}/>;
        }
        return null;

    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        turnedOn: state.featureToggle.turnedOn.includes(ownProps.toggleID),
        turnedOff: state.featureToggle.turnedOff.includes(ownProps.toggleID)
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch, ownProps: OwnProps): DispatchProps {
    return {
        fetchFeatureToggle: () => getFetchFeatureToggleAndDispatchToRedux(ownProps.toggleID, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggle);
