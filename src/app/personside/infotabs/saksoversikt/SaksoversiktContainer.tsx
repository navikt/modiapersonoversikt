import React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import JournalPoster from './saksdokumenter/JournalPoster';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import { useSaksoversiktValg } from './utils/useSaksoversiktValg';
import SakerFullscreenLenke from './SakerFullscreenLenke';

const saksoversiktMediaTreshold = '65rem';

const SaksoversiktStyle = styled.div`
    ${scrollBarContainerStyle(saksoversiktMediaTreshold)};
    @media (min-width: ${saksoversiktMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            min-width: 19rem;
            flex-basis: 19rem;
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
    ${theme.visitedLinkPurple};
`;

function SaksoversiktContainer() {
    useKeepQueryParams();

    const state = useSaksoversiktValg();

    if (state.saksdokument) {
        return <DokumentOgVedlegg {...state} />;
    } else {
        return (
            <ErrorBoundary boundaryName="Saksoversikt">
                <SaksoversiktStyle>
                    <RestResourceConsumer<SakstemaResponse>
                        getResource={(restResources) => restResources.sakstema}
                        returnOnPending={BigCenteredLazySpinner}
                    >
                        {(sakstema) => {
                            if (sakstema.resultat.isEmpty()) {
                                return <AlertStripeInfo>Brukeren har ingen saker</AlertStripeInfo>;
                            }
                            return (
                                <>
                                    <ScrollBar keepScrollId="saker-sakstema">
                                        <ErrorBoundary boundaryName="Sakstemaliste">
                                            <SakerFullscreenLenke valgtSaksdokument={state.saksdokument} />
                                            <SakstemaListe />
                                        </ErrorBoundary>
                                    </ScrollBar>
                                    <ScrollBar keepScrollId="saker-saksdokumenter">
                                        <ErrorBoundary boundaryName="Journalposter">
                                            <JournalPoster />
                                        </ErrorBoundary>
                                    </ScrollBar>
                                </>
                            );
                        }}
                    </RestResourceConsumer>
                </SaksoversiktStyle>
            </ErrorBoundary>
        );
    }
}

export default SaksoversiktContainer;
