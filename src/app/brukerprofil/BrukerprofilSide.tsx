import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Action } from 'history';
import { RouteComponentProps } from 'react-router';

import { paths } from '../routes/routing';
import { erDød, Person, PersonRespons } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import { RestReducer } from '../../redux/restReducers/restReducer';
import { theme } from '../../styles/personOversiktTheme';
import Innholdslaster from '../../components/Innholdslaster';
import BrukerprofilForm from './BrukerprofilForm';
import { STATUS } from '../../redux/restReducers/utils';
import { AppState } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { hentAllPersonData } from '../../redux/restReducers/personinformasjon';
import { getVeilederRoller } from '../../redux/restReducers/veilederRoller';
import { connect } from 'react-redux';
import { FormatertKontonummer } from '../../utils/FormatertKontonummer';
import { Systemtittel, Undertekst } from 'nav-frontend-typografi';
import { loggEvent } from '../../utils/frontendLogger';

const BrukerprofilWrapper = styled.article`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  animation: ${theme.animation.fadeIn};
`;

const HeaderStyle = styled.section`
  display: flex;
  flex-shrink: 0;
  padding: ${theme.margin.px20};
  background-color: white;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const HeaderContent = styled.section`
  text-align: center;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  > *:first-child {
    margin-right: 1.7rem;
  }
`;

const ContentWrapper = styled.section`
  overflow-y: scroll;
  flex-grow: 1;
  padding: 3rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  > * {
    max-width: 720px;
    width: 90%;
    background-color: white;
    border-radius: ${theme.borderRadius.layout};
    margin: 1em 0;
    padding: 2em;
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: 1em;
`;

interface RoutingProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPersonData: (fødselsnummer: string) => void;
    hentVeilederRoller: () => void;
}

interface OwnProps {
    fødselsnummer: string;
    personReducer: RestReducer<PersonRespons>;
    veilederRollerReducer: RestReducer<VeilederRoller>;
}

type Props = RouteComponentProps<RoutingProps> & OwnProps & DispatchProps ;

function hentNavn({navn}: Person) {
    return navn.fornavn +
        (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ')
        + navn.etternavn;
}

function getAlder(person: Person) {
    return erDød(person.personstatus) ? 'Død' : person.alder;
}

function Navn({person}: { person: Person }) {
    return <Undertekst>{hentNavn(person)} ({getAlder(person)})</Undertekst>;
}

function Konto({person}: { person: Person }) {
    return (
        <Undertekst>
            Kontonummer: <FormatertKontonummer kontonummer={person.bankkonto && person.bankkonto.kontonummer || ''}/>
        </Undertekst>
    );
}

function TilbakeLenke({fnr}: { fnr: string }) {
    return (
        <LinkWrapper>
            <Link
                className={'lenke'}
                to={`${paths.personUri}/${fnr}`}
            >
                {'<'} Tilbake
            </Link>
        </LinkWrapper>
    );
}

function Header({person}: { person: Person }) {
    return (
        <HeaderStyle>
            <TilbakeLenke fnr={person.fødselsnummer}/>
            <HeaderContent>
                <Systemtittel>Administrer brukerprofil</Systemtittel>
                <div>
                    <Navn person={person}/>
                    <Konto person={person}/>
                </div>
            </HeaderContent>
        </HeaderStyle>
    );
}

class BrukerprofilSide extends React.Component<Props> {

    componentDidMount() {
        if (this.props.personReducer.status === STATUS.NOT_STARTED) {
            this.props.hentPersonData(this.props.fødselsnummer);
        }

        if (this.props.veilederRollerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentVeilederRoller();
        }
        loggEvent('brukerprofil.sidevisning');
    }

    render() {
        return (
            <BrukerprofilWrapper>
                <Innholdslaster
                    avhengigheter={[this.props.personReducer, this.props.veilederRollerReducer]}
                >
                    <Header person={this.props.personReducer.data as Person}/>
                    <ContentWrapper>
                        <BrukerprofilForm
                            person={this.props.personReducer.data as Person}
                            veilderRoller={this.props.veilederRollerReducer.data}
                        />
                    </ContentWrapper>
                </Innholdslaster>
            </BrukerprofilWrapper>
        );
    }

}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RoutingProps>): OwnProps => {
    return ({
        fødselsnummer: ownProps.match.params.fodselsnummer,
        personReducer: state.restEndepunkter.personinformasjon,
        veilederRollerReducer: state.restEndepunkter.veilederRoller
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPersonData: (fødselsnummer: string) => hentAllPersonData(dispatch, fødselsnummer),
        hentVeilederRoller: () => dispatch(getVeilederRoller())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrukerprofilSide));
