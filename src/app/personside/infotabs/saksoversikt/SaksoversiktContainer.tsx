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
import { ScrollBar, scrollBarContainerStyle } from '../utils/InfoTabsScrollBar';

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
                            <ScrollBar>
                                <SakstemaListe valgtSakstema={valgtSakstema} />
                            </ScrollBar>
                            <ScrollBar>
                                <SaksDokumenterContainer valgtSakstema={valgtSakstema} />
                            </ScrollBar>
                        </>
                    )}
                </RestResourceConsumer>
            </SaksoversiktArticle>
        );
    }
}

export default withRouter(SaksoversiktContainer);
