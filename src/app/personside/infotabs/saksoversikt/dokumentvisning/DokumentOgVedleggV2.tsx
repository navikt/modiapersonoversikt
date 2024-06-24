import * as React from 'react';
import { TabsPure } from 'nav-frontend-tabs';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import { useFocusOnMount, useFodselsnummer } from '../../../../../utils/customHooks';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useHistory, useLocation } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { TilbakePil } from '../../../../../components/common-styled-components';
import DokumentVisning from './SaksDokumentVisning';
import { getSaksdokumentUrl } from './getSaksdokumentUrl';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import Panel from 'nav-frontend-paneler';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { SakstemaSoknadsstatus } from '../../../../../models/saksoversikt/sakstema';
import { useHentAlleSakstemaFraResourceV2 } from '../useSakstemaURLState';
import { aggregertSakstemaV2 } from '../utils/saksoversiktUtilsV2';

const Content = styled(Panel)`
    flex-grow: 1;
    min-height: 50vh;
    display: flex;
    height: 0; // IE11-hack for at flex skal funke
    flex-direction: column;
    object {
        flex-grow: 1;
    }
`;

const AlertWrapper = styled.div`
    padding: ${theme.margin.px40} ${theme.margin.px10};
`;

const Header = styled.div`
    position: relative;
    padding-right: 10rem;
`;

const KnappWrapper = styled.div`
    position: absolute;
    right: 0.2rem;
    top: 0.4rem;
`;

const HeaderStyle = styled(Panel)`
    margin-bottom: ${theme.margin.layout};
    padding: ${pxToRem(15)};
`;

interface Props {
    valgteSakstemaer: SakstemaSoknadsstatus[];
    valgtDokument: Dokument | undefined;
    valgtJournalpost: Journalpost | undefined;
}

function DokumentOgVedlegg(props: Props) {
    const ref = React.createRef<HTMLDivElement>();
    const location = useLocation();
    const fullscreen = erSakerFullscreen(location.pathname);
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();
    const fodselsnummer = useFodselsnummer();
    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();

    useFocusOnMount(ref);

    if (!props.valgtDokument || !props.valgtJournalpost) {
        return (
            <AlertWrapper>
                <AlertStripeInfo>Ingen dokument valgt.</AlertStripeInfo>
            </AlertWrapper>
        );
    }

    const tabs = [
        props.valgtJournalpost.hoveddokument,
        ...props.valgtJournalpost.vedlegg.filter((vedlegg) => !vedlegg.logiskDokument)
    ];
    const tabProps: TabProps[] = tabs.map((tab) => {
        return {
            label: tab.tittel,
            aktiv: tab === props.valgtDokument
        };
    });

    const aggregertSak = aggregertSakstemaV2(alleSakstema, props.valgteSakstemaer);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTabChange = (_: any, index: number) => history.push(dyplenker.saker.link(aggregertSak, tabs[index]));

    const tabsHeader = !fullscreen && (
        <Header>
            <TabsPure tabs={tabProps} onChange={handleTabChange} />
            <KnappWrapper>
                <Hovedknapp onClick={() => history.push(dyplenker.saker.link(aggregertSak))}>
                    <TilbakePil>Tilbake til saker</TilbakePil>
                </Hovedknapp>
            </KnappWrapper>
        </Header>
    );

    const saksdokumentUrl = getSaksdokumentUrl(
        fodselsnummer,
        props.valgtJournalpost.journalpostId,
        props.valgtDokument.dokumentreferanse
    );
    return (
        <ErrorBoundary boundaryName="Dokumentvisning">
            <Content>
                <HeaderStyle ref={() => ref} tabIndex={-1} className={!fullscreen ? 'sr-only' : undefined}>
                    <Undertittel>{props.valgtDokument.tittel}</Undertittel>
                </HeaderStyle>
                {tabsHeader}

                <DokumentVisning
                    key={props.valgtDokument.dokumentreferanse}
                    fnr={fodselsnummer}
                    url={saksdokumentUrl}
                />
            </Content>
        </ErrorBoundary>
    );
}

export default DokumentOgVedlegg;
