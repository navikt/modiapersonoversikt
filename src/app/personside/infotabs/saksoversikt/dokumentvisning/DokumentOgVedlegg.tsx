import * as React from 'react';
import { useState } from 'react';
import { TabsPure } from 'nav-frontend-tabs';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { getSaksdokumentUrl } from './getSaksdokumentUrl';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppState, useFocusOnMount, useFødselsnummer, useOnMount } from '../../../../../utils/customHooks';
import { ObjectHttpFeilHandtering } from '../../../../../components/ObjectHttpFeilHandtering';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { erIE11 } from '../../../../../utils/erNyPersonoversikt';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { SaksoversiktValg } from '../utils/useSaksoversiktValg';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useHistory } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { TilbakePil } from '../../../../../components/common-styled-components';

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

function VisDokumentContainer(props: { journalpostId: string; dokumentreferanse: string }) {
    const fødselsnummer = useFødselsnummer();
    const dokUrl = getSaksdokumentUrl(fødselsnummer, props.journalpostId, props.dokumentreferanse);
    const [errMsg, setErrMsg] = useState('');
    const onError = (statusKode: number) => setErrMsg(feilmelding(statusKode));

    useOnMount(() => {
        if (erIE11()) {
            loggEvent('KanIkkeViseDokumentIIE11', 'Saker');
        }
    });

    if (erIE11()) {
        return <AlertStripeInfo>Kan ikke vise dokumenter i Internet Explorer. Prøv chrome</AlertStripeInfo>;
    }

    return (
        <ObjectHttpFeilHandtering type="application/pdf" url={dokUrl} width="100%" onError={onError}>
            <AlertStripeAdvarsel>{errMsg}</AlertStripeAdvarsel>
        </ObjectHttpFeilHandtering>
    );
}

function feilmelding(statusKode: number) {
    switch (statusKode) {
        case 401:
        case 403:
            return 'Du har ikke tilgang til dette dokumentet.';
        case 404:
            return 'Dokument ikke funnet.';
        default:
            return 'Ukjent feil ved henting av dokument. Kontakt brukerstøtte. Feilkode: ' + statusKode;
    }
}

function DokumentOgVedlegg(props: SaksoversiktValg) {
    const ref = React.createRef<HTMLDivElement>();
    const erStandaloneVindu = useAppState(state => state.saksoversikt.erStandaloneVindu);
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();
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

    const tabsHeader = !erStandaloneVindu && (
        <Header>
            <TabsPure tabs={tabProps} onChange={handleTabChange} />
            <KnappWrapper>
                <Hovedknapp onClick={() => history.push(dyplenker.saker.link(props.sakstema))}>
                    <TilbakePil>Tilbake til saker</TilbakePil>
                </Hovedknapp>
            </KnappWrapper>
        </Header>
    );

    return (
        <ErrorBoundary boundaryName="Dokumentvisning">
            <Content>
                <HeaderStyle ref={ref} tabIndex={-1} className={!erStandaloneVindu ? 'sr-only' : undefined}>
                    <Undertittel>{props.saksdokument.tittel}</Undertittel>
                </HeaderStyle>
                {tabsHeader}
                <VisDokumentContainer
                    key={props.saksdokument.dokumentreferanse}
                    journalpostId={props.journalpost.journalpostId}
                    dokumentreferanse={props.saksdokument.dokumentreferanse}
                />
            </Content>
        </ErrorBoundary>
    );
}

export default DokumentOgVedlegg;
