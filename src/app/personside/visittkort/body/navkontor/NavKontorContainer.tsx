import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Reducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { NavKontor } from '../../../../../models/navkontor';
import VisittkortElement from '../VisittkortElement';
import NavKontorVisning from './NavKontor';

interface Props {
    navKontorReducer: Reducer<NavKontor>;
}

const navLogo = require('./nav-logo.svg');

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <VisittkortElement beskrivelse="Brukers NavKontor" ikonPath={navLogo}>
                <Innholdslaster avhengigheter={[this.props.navKontorReducer]} spinnerSize={'L'}>
                    <NavKontorVisning navKontor={this.props.navKontorReducer.data}/>
                </Innholdslaster>
            </VisittkortElement>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.brukersNavKontor
    });
};

export default connect(mapStateToProps, null)(NavKontorContainer);
