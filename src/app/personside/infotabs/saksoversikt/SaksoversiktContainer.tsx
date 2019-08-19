import * as React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import SakstemaListeContainer from './sakstemaliste/SakstemaListeContainer';
import SaksDokumenterContainer from './saksdokumenter/SaksDokumenterContainer';
import { settVisDokument } from '../../../../redux/saksoversikt/actions';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { useAppState, useOnMount } from '../../../../utils/customHooks';

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

function SaksoversiktContainer() {
    const dispatch = useDispatch();
    const skjulDokumentOgVisSaksoversikt = () => dispatch(settVisDokument(false));
    const visDokument = useAppState(state => state.saksoversikt.visDokument);

    useOnMount(() => {
        skjulDokumentOgVisSaksoversikt();
    });

    if (visDokument) {
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

export default SaksoversiktContainer;
