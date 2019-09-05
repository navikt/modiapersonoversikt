import * as React from 'react';
import { SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import SaksDokumenterContainer from './saksdokumenter/SaksDokumenterContainer';
import { huskValgtSakstema, settVisDokument } from '../../../../redux/saksoversikt/actions';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { useAppState, useOnMount } from '../../../../utils/customHooks';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { useEffect } from 'react';
import { SakerDyplenkeRouteComponentProps, useInfotabsDyplenker, useValgtSakstema } from '../dyplenker';
import { withRouter } from 'react-router';
import { useAgregerteSaker } from './utils/saksoversiktUtils';

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
    position: relative;
    > * {
        position: sticky;
        top: 0;
    }
`;

function SaksoversiktContainer(props: SakerDyplenkeRouteComponentProps) {
    const dispatch = useDispatch();
    const skjulDokumentOgVisSaksoversikt = () => dispatch(settVisDokument(false));
    const forrigeValgteSaksTema = useAppState(state => state.saksoversikt.forrigeValgteSakstema);
    const visDokument = useAppState(state => state.saksoversikt.visDokument);
    const dyplenker = useInfotabsDyplenker();

    useOnMount(() => {
        skjulDokumentOgVisSaksoversikt();
    });

    const saksTemaIUrl = useValgtSakstema(props);
    const agregerteSakstema = useAgregerteSaker();
    useEffect(() => {
        if (!agregerteSakstema) {
            return;
        }
        if (!saksTemaIUrl) {
            props.history.push(dyplenker.saker.link(forrigeValgteSaksTema || agregerteSakstema));
        } else if (saksTemaIUrl !== forrigeValgteSaksTema) {
            dispatch(huskValgtSakstema(saksTemaIUrl));
        }
    }, [forrigeValgteSaksTema, agregerteSakstema, saksTemaIUrl, props.history, dispatch, dyplenker.saker]);

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
                            <SakstemaListe />
                            <SaksDokumenterContainer />
                        </>
                    )}
                </RestResourceConsumer>
            </SaksoversiktArticle>
        );
    }
}

export default withRouter(SaksoversiktContainer);
