import * as React from 'react';
import { isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { hentSaksoversikt, reloadSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import Innholdslaster from '../../../../components/Innholdslaster';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { PersonRespons } from '../../../../models/person/person';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { hentAllPersonData } from '../../../../redux/restReducers/personinformasjon';
import SakstemaListeContainer from './sakstemaliste/SakstemaListeContainer';
import SaksDokumenterContainer from './saksdokumenter/SaksDokumenterContainer';
import { settVisDokument } from '../../../../redux/saksoversikt/actions';
import { Innholdstittel } from 'nav-frontend-typografi';

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    saksoversiktReducer: RestReducer<SakstemaResponse>;
    personReducer: RestReducer<PersonRespons>;
    visDokument: boolean;
    valgtSakstema?: Sakstema;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentSaksoversikt: (fødselsnummer: string) => void;
    reloadSaksoversikt: (fødselsnummer: string) => void;
    hentPerson: (fødselsnummer: string) => void;
    skjulDokumentOgVisSaksoversikt: () => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const saksoversiktMediaTreshold = '80rem';

const SaksoversiktArticle = styled.article`
    @media (min-width: ${saksoversiktMediaTreshold}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            margin-left: ${theme.margin.layout};
        }
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    > * {
        margin-bottom: ${theme.margin.layout};
    }
`;

class SaksoversiktContainer extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.skjulDokumentOgVisSaksoversikt();
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.saksoversiktReducer)) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.personReducer)) {
            this.props.hentPerson(this.props.fødselsnummer);
        }
    }

    render() {
        if (this.props.visDokument) {
            return <DokumentOgVedlegg />;
        } else {
            return (
                <SaksoversiktArticle aria-label="Brukerens saker">
                    <Innholdstittel className="visually-hidden">Brukerens saker</Innholdstittel>
                    <Innholdslaster avhengigheter={[this.props.saksoversiktReducer, this.props.baseUrlReducer]}>
                        <SakstemaListeContainer />
                        <SaksDokumenterContainer />
                    </Innholdslaster>
                </SaksoversiktArticle>
            );
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer,
        personReducer: state.restEndepunkter.personinformasjon,
        visDokument: state.saksoversikt.visDokument,
        valgtSakstema: state.saksoversikt.valgtSakstema
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentSaksoversikt: (fødselsnummer: string) => dispatch(hentSaksoversikt(fødselsnummer)),
        reloadSaksoversikt: (fødselsnummer: string) => dispatch(reloadSaksoversikt(fødselsnummer)),
        hentPerson: fødselsnummer => hentAllPersonData(dispatch, fødselsnummer),
        skjulDokumentOgVisSaksoversikt: () => dispatch(settVisDokument(false))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaksoversiktContainer);
