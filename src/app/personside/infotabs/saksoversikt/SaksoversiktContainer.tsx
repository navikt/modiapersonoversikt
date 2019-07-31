import * as React from 'react';
import { DeprecatedRestResource } from '../../../../redux/restReducers/deprecatedRestResource';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { PersonRespons } from '../../../../models/person/person';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import SakstemaListeContainer from './sakstemaliste/SakstemaListeContainer';
import SaksDokumenterContainer from './saksdokumenter/SaksDokumenterContainer';
import { settVisDokument } from '../../../../redux/saksoversikt/actions';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

interface StateProps {
    personResource: DeprecatedRestResource<PersonRespons>;
    visDokument: boolean;
    valgtSakstema?: Sakstema;
    fødselsnummer: string;
}

interface DispatchProps {
    skjulDokumentOgVisSaksoversikt: () => void;
}

type Props = StateProps & DispatchProps;

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
    }

    render() {
        if (this.props.visDokument) {
            return <DokumentOgVedlegg />;
        } else {
            return (
                <SaksoversiktArticle aria-label="Brukerens saker">
                    <VisuallyHiddenAutoFokusHeader tittel="Brukerens saker" />
                    <RestResourceConsumer<SakstemaResponse>
                        getResource={restResources => restResources.sakstema}
                        returnOnPending={BigCenteredLazySpinner}
                    >
                        {sakstema => (
                            <>
                                <SakstemaListeContainer />
                                <SaksDokumenterContainer />
                            </>
                        )}
                    </RestResourceConsumer>
                </SaksoversiktArticle>
            );
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        personResource: state.restResources.personinformasjon,
        visDokument: state.saksoversikt.visDokument,
        valgtSakstema: state.saksoversikt.valgtSakstema
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        skjulDokumentOgVisSaksoversikt: () => dispatch(settVisDokument(false))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaksoversiktContainer);
