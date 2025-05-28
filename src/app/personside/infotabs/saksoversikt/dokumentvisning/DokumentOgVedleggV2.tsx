import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { TabsPure } from 'nav-frontend-tabs';
import type { TabProps } from 'nav-frontend-tabs/lib/tab';
import { Undertittel } from 'nav-frontend-typografi';
import { createRef } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import styled from 'styled-components';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { TilbakePil } from '../../../../../components/common-styled-components';
import type { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import { useHentAlleSakstemaFraResourceV2 } from '../useSakstemaURLState';
import { aggregertSakstemaV2 } from '../utils/saksoversiktUtilsV2';
import DokumentVisning from './SaksDokumentVisning';
import { getSaksdokumentUrl } from './getSaksdokumentUrl';

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
    valgteSakstemaer: Sakstema[];
    valgtDokument: Dokument | undefined;
    valgtJournalpost: Journalpost | undefined;
}

function DokumentOgVedlegg(props: Props) {
    const ref = createRef<HTMLDivElement>();
    const match = useMatchRoute();
    const fullscreen = match({ to: '/saker' });
    const navigate = useNavigate();
    const fodselsnummer = usePersonAtomValue();
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
    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    const handleTabChange = (_: any, index: number) =>
        navigate({
            to: fullscreen ? '/saker' : '/person/saker',
            search: {
                sakstema: aggregertSak.temakode,
                dokument: tabs[index].dokumentreferanse ?? undefined
            }
        });

    const tabsHeader = !fullscreen && (
        <Header>
            <TabsPure tabs={tabProps} onChange={handleTabChange} />
            <KnappWrapper>
                <Hovedknapp
                    onClick={() =>
                        navigate({
                            to: '/saker',
                            search: { sakstema: aggregertSak.temakode }
                        })
                    }
                >
                    <TilbakePil>Tilbake til saker</TilbakePil>
                </Hovedknapp>
            </KnappWrapper>
        </Header>
    );

    const saksdokumentUrl = getSaksdokumentUrl(
        props.valgtJournalpost.journalpostId,
        props.valgtDokument.dokumentreferanse
    );
    return (
        <ErrorBoundary boundaryName="Dokumentvisning">
            <Content>
                <HeaderStyle
                    ref={() => {
                        ref;
                    }}
                    tabIndex={-1}
                    className={!fullscreen ? 'sr-only' : undefined}
                >
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
