import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Reducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import VergemalWrapper from './Vergemal';

interface Props {
    vergemalReducer: Reducer<Vergemal>;
}

class VergemalContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.vergemalReducer]} spinnerSize={'L'}>
                <VergemalWrapper vergemal={this.props.vergemalReducer.data}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        vergemalReducer: state.vergemal
    });
};

export default connect(mapStateToProps, null)(VergemalContainer);
