import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { setErStandaloneVindu } from '../../../../redux/saksoversikt/actions';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';
import FetchFeatureToggles from '../../../PersonOppslagHandler/FetchFeatureToggles';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';
import { useFødselsnummer, useOnMount, useRestResource } from '../../../../utils/customHooks';
import { isNotStarted } from '../../../../rest/utils/restResource';
import LazySpinner from '../../../../components/LazySpinner';
import FillCenterAndFadeIn from '../../../../components/FillCenterAndFadeIn';
import { loggEvent } from '../../../../utils/frontendLogger';
import JournalPoster from './saksdokumenter/JournalPoster';
import { useSaksoversiktValg } from './utils/useSaksoversiktValg';

interface Props {
    fødselsnummer: string;
}

const SaksoversiktArticle = styled.article`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: ${theme.margin.layout};
    > *:last-child {
        flex-basis: 70%;
        flex-shrink: 0;
        margin-left: ${theme.margin.layout};
    }
    > *:not(:last-child) {
        overflow-y: scroll;
    }
    > * {
        height: 100%;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

function Innhold() {
    const state = useSaksoversiktValg();

    if (!state.sakstema) {
        return (
            <FillCenterAndFadeIn>
                <LazySpinner />
            </FillCenterAndFadeIn>
        );
    }

    return (
        <SaksoversiktArticle>
            <JournalPoster valgtSakstema={state.sakstema} />
            <DokumentOgVedlegg {...state} />
        </SaksoversiktArticle>
    );
}

function SakerEgetVindu(props: Props) {
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
    const saksoversiktResource = useRestResource(resources => resources.sakstema);

    useOnMount(() => {
        dispatch(setErStandaloneVindu(true));
        loggEvent('Sidevisning', 'SaksoversiktEgetVindu');
        return () => {
            dispatch(setErStandaloneVindu(false));
        };
    });

    useEffect(() => {
        if (isNotStarted(saksoversiktResource) && fnr) {
            dispatch(saksoversiktResource.actions.fetch);
        }
    }, [fnr, dispatch, saksoversiktResource]);

    return (
        <>
            <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
            <LyttPåNyttFnrIReduxOgHentPersoninfo />
            <FetchFeatureToggles />
            <Innhold />
        </>
    );
}

export default SakerEgetVindu;
