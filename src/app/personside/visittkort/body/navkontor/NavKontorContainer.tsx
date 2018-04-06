import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Reducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { NavKontorInterface } from '../../../../../models/navkontor';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

interface Props {
    navKontorReducer: Reducer<NavKontorInterface>;
}

const navLogo = require('./nav-logo.svg');

function NavKontor(props: { navKontor: NavKontorInterface }) {
    return (
        <>
            <Undertekst>
                {props.navKontor.navn} {props.navKontor.nummer}
            </Undertekst>
            <Undertekst>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci dolorum ea expedita fugiat itaque libero, modi nihil optio repellat,
                soluta suscipit tempora tempore veniam? Dignissimos id obcaecati sint tempore unde.
            </Undertekst>
        </>
    );
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <VisittkortElement utenTittel={true} beskrivelse="Brukers NavKontor" ikonPath={navLogo}>
                <Innholdslaster avhengigheter={[this.props.navKontorReducer]} spinnerSize={'L'}>
                    <NavKontor navKontor={this.props.navKontorReducer.data}/>
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
