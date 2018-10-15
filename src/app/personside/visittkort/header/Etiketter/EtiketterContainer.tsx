import * as React from 'react';
import { connect } from 'react-redux';
import { Egenansatt } from '../../../../../models/egenansatt';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import { RestReducer } from '../../../../../redux/restReducers/restReducer';
import Etiketter from './Etiketter';
import Innholdslaster from '../../../../../components/Innholdslaster';
import styled from 'styled-components';
import LazySpinner from '../../../../../components/LazySpinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    egenAnsattReducer: RestReducer<Egenansatt>;
    personReducer: RestReducer<PersonRespons>;
    vergemalReducer: RestReducer<Vergemal>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

class EtiketterContainer extends React.Component<Props> {

    render() {
        return (
            <Wrapper>
                <Innholdslaster
                    avhengigheter={[
                        this.props.personReducer,
                        this.props.egenAnsattReducer,
                        this.props.vergemalReducer
                    ]}
                    returnOnPending={<LazySpinner type="S"/>}
                    returnOnError={<AlertStripeAdvarsel>Feil ved lasting av etiketter</AlertStripeAdvarsel>}
                />
                <Etiketter
                    person={this.props.personReducer.data as Person}
                    egenAnsatt={this.props.egenAnsattReducer.data}
                    vergemal={this.props.vergemalReducer.data}
                />
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        egenAnsattReducer: state.restEndepunkter.egenAnsatt,
        personReducer: state.restEndepunkter.personinformasjon,
        vergemalReducer: state.restEndepunkter.vergemal
    });
};

export default connect(mapStateToProps, null)(EtiketterContainer);