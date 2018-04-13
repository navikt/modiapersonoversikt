import * as React from 'react';
import { connect } from 'react-redux';
import { NavKontorInterface } from '../../../../models/navkontor';
import { AppState, Reducer } from '../../../../redux/reducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import styled from 'styled-components';

interface Props {
    navKontorReducer: Reducer<NavKontorInterface>;
}

const CenterVerticallyAndNoWrap = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

const onError = (
    <em>Problemer med å hente nav-enhet</em>
);

function NavKontor(props: { navKontor: NavKontorInterface }) {
    return (
        <>
            {props.navKontor.enhetId} {props.navKontor.enhetNavn}
        </>
    );
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <Undertekst>
                <CenterVerticallyAndNoWrap>
                    Nav-enhet /&nbsp;
                    <Innholdslaster
                        avhengigheter={[this.props.navKontorReducer]}
                        spinnerSize={'XXS'}
                        returnOnError={onError}
                    >
                        <NavKontor navKontor={this.props.navKontorReducer.data}/>
                    </Innholdslaster>
                </CenterVerticallyAndNoWrap>
            </Undertekst>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.brukersNavKontor
    });
};

export default connect(mapStateToProps, null)(NavKontorContainer);
