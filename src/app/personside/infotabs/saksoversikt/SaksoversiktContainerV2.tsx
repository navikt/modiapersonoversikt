import React from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import { ScrollBar } from '../utils/InfoTabsScrollBar';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useKeepQueryParams } from '../../../../utils/hooks/useKeepQueryParams';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from './useSakstemaURLState';
import { sakstemaResourceV2 } from '../../../../rest/resources/sakstemaResource';
import DokumentOgVedleggV2 from './dokumentvisning/DokumentOgVedleggV2';
import JournalPosterV2 from './saksdokumenter/JournalPosterV2';
import SakerFullscreenLenkeV2 from './SakerFullscreenLenkeV2';
import SakstemaListeV2 from './sakstemaliste/SakstemaListeV2';

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

    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();
    const { valgtDokument, valgtJournalpost, valgteSakstemaer } = useSakstemaURLStateV2(alleSakstema);

    if (valgtDokument) {
        return (
            <DokumentOgVedleggV2
                valgtDokument={valgtDokument}
                valgtJournalpost={valgtJournalpost}
                valgteSakstemaer={valgteSakstemaer}
            />
        );
    } else {
        return sakstemaResourceV2.useRenderer({
            ifPending: BigCenteredLazySpinner,
            ifData: (data) => {
                if (data.resultat.length === 0) {
                    return <AlertStripeInfo>Brukeren har ingen saker</AlertStripeInfo>;
                }
                return (
                    <ErrorBoundary boundaryName="Saksoversikt">
                        <SaksoversiktStyle>
                            <ScrollBar keepScrollId="saker-sakstema">
                                <ErrorBoundary boundaryName="Sakstemaliste">
                                    <SakerFullscreenLenkeV2 />
                                    <SakstemaListeV2 />
                                </ErrorBoundary>
                            </ScrollBar>
                            <ScrollBar keepScrollId="saker-saksdokumenter">
                                <ErrorBoundary boundaryName="Journalposter">
                                    <JournalPosterV2 />
                                </ErrorBoundary>
                            </ScrollBar>
                        </SaksoversiktStyle>
                    </ErrorBoundary>
                );
            }
        });
    }
}

export default SaksoversiktContainer;
