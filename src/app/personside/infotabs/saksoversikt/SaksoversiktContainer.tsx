import * as React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import JournalPoster from './saksdokumenter/JournalPoster';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import { useSaksoversiktValg } from './utils/useSaksoversiktValg';

export const saksoversiktMediaTreshold = '65rem';

const SaksoversiktArticle = styled.article`
    ${scrollBarContainerStyle(saksoversiktMediaTreshold)};
    @media (min-width: ${saksoversiktMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            min-width: 19rem;
            flex-basis: 19rem;
            flex-grow: 0.5;
        }
        > *:last-child {
            flex-grow: 1;
        }
        align-items: flex-start;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    position: relative;
`;

function SaksoversiktContainer() {
    const state = useSaksoversiktValg();
    useKeepQueryParams();

    if (state.saksdokument) {
        return <DokumentOgVedlegg {...state} />;
    } else {
        return (
            <ErrorBoundary boundaryName="Saksoversikt">
                <SaksoversiktArticle aria-label="Brukerens saker">
                    {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Brukerens saker" />}
                    <RestResourceConsumer<SakstemaResponse>
                        getResource={restResources => restResources.sakstema}
                        returnOnPending={BigCenteredLazySpinner}
                    >
                        {sakstema => {
                            if (sakstema.resultat.length === 0) {
                                return <AlertStripeInfo>Brukeren har ingen saker</AlertStripeInfo>;
                            }
                            return (
                                <>
                                    <ScrollBar keepScrollId="saker-sakstema">
                                        <ErrorBoundary boundaryName="Sakstemaliste">
                                            <SakstemaListe valgtSakstema={state.sakstema} />
                                        </ErrorBoundary>
                                    </ScrollBar>
                                    <ScrollBar keepScrollId="saker-saksdokumenter">
                                        {state.sakstema ? (
                                            <ErrorBoundary boundaryName="Journalposter">
                                                <JournalPoster valgtSakstema={state.sakstema} />
                                            </ErrorBoundary>
                                        ) : (
                                            <AlertStripeInfo>Ingen sakstema valgt</AlertStripeInfo>
                                        )}
                                    </ScrollBar>
                                </>
                            );
                        }}
                    </RestResourceConsumer>
                </SaksoversiktArticle>
            </ErrorBoundary>
        );
    }
}

export default SaksoversiktContainer;
