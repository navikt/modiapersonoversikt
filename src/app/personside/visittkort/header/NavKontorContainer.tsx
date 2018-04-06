import * as React from 'react';
import { connect } from 'react-redux';
import { NavKontorInterface } from '../../../../models/navkontor';
import NavKontor from './NavKontor';
import { AppState, Reducer } from '../../../../redux/reducer';
import Innholdslaster from '../../../../components/Innholdslaster';

interface Props {
    navKontorReducer: Reducer<NavKontorInterface>;
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.navKontorReducer]} spinnerSize={'XXS'}>
                <NavKontor navkontor={this.props.navKontorReducer.data}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.brukersNavKontor
    });
};

export default connect(mapStateToProps, null)(NavKontorContainer);
