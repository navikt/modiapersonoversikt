import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import JournalPoster from './saksdokumenter/JournalPoster';
import DropDownMenu from '../../../../components/DropDownMenu';
import { Undertittel } from 'nav-frontend-typografi';
import { sakerTest } from '../dyplenkeTest/utils-dyplenker-test';
import SakstemaListe from './sakstemaliste/SakstemaListe';
import { aggregertTemanavn, forkortetTemanavn } from './utils/saksoversiktUtils';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from './useSakstemaURLState';
import { filtrerSakstemaerUtenData } from './sakstemaliste/SakstemaListeUtils';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

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
    const { alleSakstema, isLoading } = useHentAlleSakstemaFraResource();
    const { valgteSakstemaer, valgtDokument, valgtJournalpost } = useSakstemaURLState(alleSakstema);

    useEffect(() => {
        loggEvent('VisDokument', 'SakerFullscreen');
    }, [valgtDokument]);

    if (isLoading) {
        return <CenteredLazySpinner />;
    }

    const tittel = (
        <Undertittel className={sakerTest.dokument}>
            {forkortetTemanavn(
                aggregertTemanavn(
                    valgteSakstemaer,
                    valgteSakstemaer.length === filtrerSakstemaerUtenData(alleSakstema).length
                )
            )}
        </Undertittel>
    );
    const sakstemaListeDropdown = (
        <DropDownMenu header={tittel}>
            <SakstemaListe />
        </DropDownMenu>
    );

    return (
        <SaksoversiktArticle>
            <JournalPoster sakstemaListeDropdown={sakstemaListeDropdown} />
            <DokumentOgVedlegg
                valgtDokument={valgtDokument}
                valgtJournalpost={valgtJournalpost}
                valgteSakstemaer={valgteSakstemaer}
            />
        </SaksoversiktArticle>
    );
}

function SakerFullscreen(props: Props) {
    useOnMount(() => {
        loggEvent('Sidevisning', 'SakerFullscreen');
        document.title = 'Saksoversikt - Modia personoversikt';
    });

    return (
        <>
            <SetFnrIRedux fnr={props.fnr} />
            <Innhold />
        </>
    );
}

export default SakerFullscreen;
