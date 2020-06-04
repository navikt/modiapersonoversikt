import * as React from 'react';
import { TabsPure } from 'nav-frontend-tabs';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import { useFocusOnMount, useFødselsnummer } from '../../../../../utils/customHooks';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { SaksoversiktValg } from '../utils/useSaksoversiktValg';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useHistory, useLocation } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { TilbakePil } from '../../../../../components/common-styled-components';
import DokumentVisning from './SaksDokumentVisning';
import { getSaksdokumentUrl } from './getSaksdokumentUrl';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';

const Content = styled.div`
    flex-grow: 1;
    min-height: 50vh;
    display: flex;
    height: 0; // IE11-hack for at flex skal funke
    flex-direction: column;
    object {
        flex-grow: 1;
        ${theme.hvittPanel}
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

const HeaderStyle = styled.div`
    ${theme.hvittPanel};
    margin-bottom: ${theme.margin.layout};
    padding: ${pxToRem(15)};
`;

function DokumentOgVedlegg(props: SaksoversiktValg) {
    const ref = React.createRef<HTMLDivElement>();
    const location = useLocation();
    const fullscreen = erSakerFullscreen(location.pathname);
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();
    const fødselsnummer = useFødselsnummer();

    useFocusOnMount(ref);

    if (!props.saksdokument || !props.journalpost) {
        return (
            <AlertWrapper>
                <AlertStripeInfo>Ingen dokument valgt.</AlertStripeInfo>
            </AlertWrapper>
        );
    }

    const tabs = [
        props.journalpost.hoveddokument,
        ...props.journalpost.vedlegg.filter(vedlegg => !vedlegg.logiskDokument)
    ];
    const tabProps: TabProps[] = tabs.map(tab => {
        return {
            label: tab.tittel,
            aktiv: tab === props.saksdokument
        };
    });

    const handleTabChange = (_: any, index: number) => history.push(dyplenker.saker.link(props.sakstema, tabs[index]));

    const tabsHeader = !fullscreen && (
        <Header>
            <TabsPure tabs={tabProps} onChange={handleTabChange} />
            <KnappWrapper>
                <Hovedknapp onClick={() => history.push(dyplenker.saker.link(props.sakstema))}>
                    <TilbakePil>Tilbake til saker</TilbakePil>
                </Hovedknapp>
            </KnappWrapper>
        </Header>
    );

    const saksdokumentUrl = getSaksdokumentUrl(
        fødselsnummer,
        props.journalpost.journalpostId,
        props.saksdokument.dokumentreferanse
    );
    return (
        <ErrorBoundary boundaryName="Dokumentvisning">
            <Content>
                <HeaderStyle ref={ref} tabIndex={-1} className={!fullscreen ? 'sr-only' : undefined}>
                    <Undertittel>{props.saksdokument.tittel}</Undertittel>
                </HeaderStyle>
                {tabsHeader}

                <DokumentVisning key={props.saksdokument.dokumentreferanse} url={saksdokumentUrl} />
            </Content>
        </ErrorBoundary>
    );
}

export default DokumentOgVedlegg;
