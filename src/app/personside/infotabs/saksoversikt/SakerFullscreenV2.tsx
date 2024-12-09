import { Undertittel } from 'nav-frontend-typografi';
import { useEffect } from 'react';
import styled from 'styled-components';
import DropDownMenu from '../../../../components/DropDownMenu';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { sakerTest } from '../dyplenkeTest/utils-dyplenker-test';
import DokumentOgVedleggV2 from './dokumentvisning/DokumentOgVedleggV2';
import JournalPosterV2 from './saksdokumenter/JournalPosterV2';
import { filtrerSakstemaerUtenDataV2 } from './sakstemaliste/SakstemaListeUtils';
import SakstemaListeV2 from './sakstemaliste/SakstemaListeV2';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from './useSakstemaURLState';
import { aggregertTemanavnV2, forkortetTemanavnV2 } from './utils/saksoversiktUtilsV2';

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
    const { alleSakstema, isLoading } = useHentAlleSakstemaFraResourceV2();
    const { valgteSakstemaer, valgtDokument, valgtJournalpost } = useSakstemaURLStateV2(alleSakstema);

    useEffect(() => {
        loggEvent('VisDokument', 'SakerFullscreen');
    }, [valgtDokument]);

    if (isLoading) {
        return <CenteredLazySpinner />;
    }

    const tittel = (
        <Undertittel className={sakerTest.dokument}>
            {forkortetTemanavnV2(
                aggregertTemanavnV2(
                    valgteSakstemaer,
                    valgteSakstemaer.length === filtrerSakstemaerUtenDataV2(alleSakstema).length
                )
            )}
        </Undertittel>
    );
    const sakstemaListeDropdown = (
        <DropDownMenu header={tittel}>
            <SakstemaListeV2 />
        </DropDownMenu>
    );

    return (
        <SaksoversiktArticle>
            <JournalPosterV2 sakstemaListeDropdown={sakstemaListeDropdown} />
            <DokumentOgVedleggV2
                valgtDokument={valgtDokument}
                valgtJournalpost={valgtJournalpost}
                valgteSakstemaer={valgteSakstemaer}
            />
        </SaksoversiktArticle>
    );
}

function SakerFullscreen() {
    useOnMount(() => {
        loggEvent('Sidevisning', 'SakerFullscreen');
        document.title = 'Saksoversikt - Modia personoversikt';
    });

    return (
        <div className="flex-auto bg-gray-200">
            <Innhold />
        </div>
    );
}

export default SakerFullscreen;
