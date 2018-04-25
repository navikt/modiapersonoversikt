import * as React from 'react';
import { connect } from 'react-redux';
import { NavKontor } from '../../../../models/navkontor';
import { AppState, Reducer } from '../../../../redux/reducer';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import Innholdslaster from '../../../../components/Innholdslaster';
import styled from 'styled-components';

interface Props {
    navKontorReducer: Reducer<NavKontor>;
}

const NavKontorDescriptionList = styled.dl`
  margin: initial;
  margin-left: 1em;
  display: flex;
  > * {
  white-space: nowrap;
  }
  dt:after {
    content: '/';
    margin: 0 0.5em;
  }
  dd {
    display: flex;
    align-items: center;
    margin: 0;
  }
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
            {props.navKontor.enhetId} {props.navKontor.enhetNavn}
        </>
    );
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        return (
            <Undertekst tag="span">
                <NavKontorDescriptionList>
                    <dt>Nav-enhet</dt>
                    <dd>
                        <Innholdslaster
                            avhengigheter={[this.props.navKontorReducer]}
                            spinnerSize={'XXS'}
                            returnOnError={onError}
                        >
                            <NavKontorVisning navKontor={this.props.navKontorReducer.data}/>
                        </Innholdslaster>
                    </dd>
                </NavKontorDescriptionList>
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
