import React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import JournalPoster from './saksdokumenter/JournalPoster';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import SakerFullscreenLenke from './SakerFullscreenLenke';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from './useSakstemaURLState';

const saksoversiktMediaTreshold = '70rem';

const SaksoversiktStyle = styled.div`
    display: flex;
    flex-direction: column;
    overflow: unset;
    max-height: none;
    @media (min-width: ${saksoversiktMediaTreshold}) {
        flex-direction: row;
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        > *:first-child {
            min-width: 20rem;
            flex-basis: 20rem;
        }
        > *:last-child {
            flex-grow: 1;
        }
        align-items: flex-start;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    ${theme.visitedLinkPurple};
`;

function SaksoversiktContainer() {
    useKeepQueryParams();

    const { alleSakstema } = useHentAlleSakstemaFraResource();
    const { valgtDokument, valgtJournalpost, valgteSakstemaer } = useSakstemaURLState(alleSakstema);

    if (valgtDokument) {
        return (
            <DokumentOgVedlegg
                valgtDokument={valgtDokument}
                valgtJournalpost={valgtJournalpost}
                valgteSakstemaer={valgteSakstemaer}
            />
        );
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
                                            <SakerFullscreenLenke />
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
