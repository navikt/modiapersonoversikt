import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import FetchFeatureToggles from '../../../PersonOppslagHandler/FetchFeatureToggles';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';
import { useFodselsnummer, useOnMount } from '../../../../utils/customHooks';
import LazySpinner from '../../../../components/LazySpinner';
import FillCenterAndFadeIn from '../../../../components/FillCenterAndFadeIn';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { useSaksoversiktValg } from './utils/useSaksoversiktValg';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import JournalPoster from './saksdokumenter/JournalPoster';
import DropDownMenu from '../../../../components/DropDownMenu';
import { Undertittel } from 'nav-frontend-typografi';
import { sakerTest } from '../dyplenkeTest/utils-dyplenker-test';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { useSakstemaer } from './SakstemaContext';

interface Props {
    fnr: string;
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
    ${theme.visitedLinkPurple};
`;

function Innhold() {
    const state = useSaksoversiktValg();
    const { valgtSakstema, alleSakstemaer } = useSakstemaer();

    useEffect(() => {
        loggEvent('VisDokument', 'SakerFullscreen');
    }, [state.saksdokument]);

    if (!valgtSakstema) {
        return (
            <FillCenterAndFadeIn>
                <LazySpinner />
            </FillCenterAndFadeIn>
        );
    }

    const tittel = <Undertittel className={sakerTest.dokument}>{valgtSakstema.temanavn}</Undertittel>;
    const sakstemaListeDropdown = (
        <DropDownMenu header={tittel}>
            <SakstemaListe valgtSakstema={valgtSakstema} sortertSakstemaListe={alleSakstemaer} />
        </DropDownMenu>
    );

    return (
        <SaksoversiktArticle>
            <JournalPoster
                valgtSakstema={valgtSakstema}
                alleSakstema={alleSakstemaer}
                sakstemaListeDropdown={sakstemaListeDropdown}
            />
            <DokumentOgVedlegg {...state} />
        </SaksoversiktArticle>
    );
}

function SakerFullscreen(props: Props) {
    const dispatch = useDispatch();
    const fnr = useFodselsnummer();
    const saksoversiktResource = useRestResource((resources) => resources.sakstema);

    useOnMount(() => {
        loggEvent('Sidevisning', 'SakerFullscreen');
        document.title = 'Saksoversikt - Modia personoversikt';
    });

    useEffect(() => {
        if (saksoversiktResource.isNotStarted && fnr) {
            dispatch(saksoversiktResource.actions.fetch);
        }
    }, [fnr, dispatch, saksoversiktResource]);

    return (
        <>
            <SetFnrIRedux fnr={props.fnr} />
            <FetchFeatureToggles />
            <Innhold />
        </>
    );
}

export default SakerFullscreen;
