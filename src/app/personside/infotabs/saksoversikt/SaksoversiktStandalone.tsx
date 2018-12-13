import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeContainer from './SakstemaListeContainer';
import DokumentListeContainer from './DokumentListeContainer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import { PersonRespons } from '../../../../models/person/person';
import { hentAllPersonData } from '../../../../redux/restReducers/personinformasjon';
import DokumentOgVedlegg from './DokumentOgVedlegg';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    visDokument: boolean;
    saksoversiktReducer: RestReducer<SakstemaResponse>;
    personReducer: RestReducer<PersonRespons>;
}

interface DispatchProps {
    hentSaksoversikt: (fødselsnummer: string) => void;
    hentPerson: (fødselsnummer: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const SaksoversiktArticle = styled.article<{ visDokument: boolean }>`
    display: flex;
    align-items: flex-start;
    width: 100vw;
    > *:last-child {
      width: 70%;
      ${props => !props.visDokument && 'display: none'}
      margin-left: ${theme.margin.layout};
    }
    > *:first-child {
      ${props => props.visDokument && 'display: none'}
      margin-right: ${theme.margin.layout};
    }
    > *:not(:last-child) {
      overflow-y: scroll;
    }
    > * {
      margin-bottom: ${theme.margin.layout};
      height: 100%;
    }
`;

class SaksoversiktStandalone extends React.PureComponent<Props> {

    componentDidMount() {
        if (isNotStarted(this.props.saksoversiktReducer)) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.personReducer)) {
            this.props.hentPerson(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <SaksoversiktArticle visDokument={this.props.visDokument}>
                <Innholdslaster avhengigheter={[this.props.saksoversiktReducer]}>
                    <SakstemaListeContainer/>
                    <DokumentListeContainer/>
                    <DokumentOgVedlegg/>
                </Innholdslaster>
            </SaksoversiktArticle>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        visDokument: state.saksoversikt.visDokument,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer,
        personReducer: state.restEndepunkter.personinformasjon
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSaksoversikt: (fødselsnummer: string) => dispatch(hentSaksoversikt(fødselsnummer)),
        hentPerson: fødselsnummer => hentAllPersonData(dispatch, fødselsnummer)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaksoversiktStandalone);
