import * as React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import SaksDokumenterContainer from './saksdokumenter/SaksDokumenterContainer';
import { settVisDokument } from '../../../../redux/saksoversikt/actions';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { useAppState, useOnMount } from '../../../../utils/customHooks';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { SakerDyplenkeRouteComponentProps } from '../dyplenker';
import { withRouter } from 'react-router';
import { useSyncSaksoversiktMedUrl } from './useInitializeSaksoversikt';

export const saksoversiktMediaTreshold = '80rem';

const SaksoversiktArticle = styled.article`
    @media (min-width: ${saksoversiktMediaTreshold}) {
        display: flex;
        align-items: flex-start;
        > *:last-child {
            margin-left: ${theme.margin.layout};
        }
        > * {
            position: sticky;
            top: 0;
        }
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    > * {
        margin-bottom: ${theme.margin.layout};
    }
    position: relative;
`;

function SaksoversiktContainer(props: SakerDyplenkeRouteComponentProps) {
    const dispatch = useDispatch();
    const skjulDokumentOgVisSaksoversikt = () => dispatch(settVisDokument(false));
    const visDokument = useAppState(state => state.saksoversikt.visDokument);

    useOnMount(() => {
        skjulDokumentOgVisSaksoversikt();
    });

    const valgtSakstema = useSyncSaksoversiktMedUrl(props);

    if (visDokument) {
        return <DokumentOgVedlegg />;
    } else {
        return (
            <SaksoversiktArticle aria-label="Brukerens saker">
                {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Brukerens saker" />}
                <RestResourceConsumer<SakstemaResponse>
                    getResource={restResources => restResources.sakstema}
                    returnOnPending={BigCenteredLazySpinner}
                >
                    {sakstema => (
                        <>
                            <SakstemaListe valgtSakstema={valgtSakstema} />
                            <SaksDokumenterContainer valgtSakstema={valgtSakstema} />
                        </>
                    )}
                </RestResourceConsumer>
            </SaksoversiktArticle>
        );
    }
}

export default withRouter(SaksoversiktContainer);
