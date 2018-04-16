import * as React from 'react';
import { connect } from 'react-redux';
import { NavKontor } from '../../../../models/navkontor';
import { AppState, Reducer } from '../../../../redux/reducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import styled from 'styled-components';

interface Props {
    navKontorReducer: Reducer<NavKontor>;
}

const CenterVerticallyAndNoWrap = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

const onError = (
    <em>Problemer med å hente nav-enhet</em>
);

function NavKontorVisning(props: { navKontor?: NavKontor }) {
    if (!props.navKontor) {
        return <>Ingen NAV-Enhet</>;
    }

    return (
        <>
            Nav-enhet / {props.navKontor.enhetId} {props.navKontor.enhetNavn}
        </>
    );
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <Undertekst>
                <CenterVerticallyAndNoWrap>
                    <Innholdslaster
                        avhengigheter={[this.props.navKontorReducer]}
                        spinnerSize={'XXS'}
                        returnOnError={onError}
                    >
                        <NavKontorVisning navKontor={this.props.navKontorReducer.data}/>
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
