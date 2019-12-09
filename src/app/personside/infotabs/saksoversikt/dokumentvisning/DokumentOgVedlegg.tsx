import * as React from 'react';
import { useState } from 'react';
import { Dokument, DokumentMetadata } from '../../../../../models/saksoversikt/dokumentmetadata';
import { TabsPure } from 'nav-frontend-tabs';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { getSaksdokument } from '../../../../../utils/url-utils';
import { AppState } from '../../../../../redux/reducers';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { settValgtEnkeltdokument, settVisDokument } from '../../../../../redux/saksoversikt/actions';
import { LenkeKnapp, TilbakePil } from '../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import { useFocusOnMount, useOnMount } from '../../../../../utils/customHooks';
import { ObjectHttpFeilHandtering } from '../../../../../components/ObjectHttpFeilHandtering';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { erIE11 } from '../../../../../utils/erNyPersonoversikt';
import { loggEvent } from '../../../../../utils/frontendLogger';

interface StateProps {
    valgtDokument?: DokumentMetadata;
    valgtTab?: Dokument;
    visDokument: boolean;
    erStandaloneVindu: boolean;
    fødselsnummer: string;
}

interface DispatchProps {
    setEnkeltDokument: (valgtDokument: Dokument) => void;
    lukkDokument: () => void;
}

type Props = DispatchProps & StateProps;

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
    bottom: 0.5rem;
    right: 0.5rem;
`;

function VisDokumentContainer(props: { fødselsnummer: string; journalpostId: string; dokumentreferanse: string }) {
    const dokUrl = getSaksdokument(props.fødselsnummer, props.journalpostId, props.dokumentreferanse);
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

function DokumentOgVedlegg(props: Props) {
    const ref = React.createRef<HTMLSpanElement>();

    useFocusOnMount(ref);

    const { valgtDokument, valgtTab } = props;
    if (!valgtDokument || !valgtTab) {
        return (
            <AlertWrapper>
                <AlertStripeAdvarsel>Ingen dokument valgt.</AlertStripeAdvarsel>
            </AlertWrapper>
        );
    }

    const tabs = [valgtDokument.hoveddokument, ...valgtDokument.vedlegg.filter(vedlegg => !vedlegg.logiskDokument)];
    const tabProps: TabProps[] = tabs.map(tab => {
        return {
            label: tab.tittel,
            aktiv: tab === props.valgtTab
        };
    });

    const tabsHeader = !props.erStandaloneVindu && (
        <Header>
            <TabsPure tabs={tabProps} onChange={(event, index) => props.setEnkeltDokument(tabs[index])} />
            <KnappWrapper>
                <LenkeKnapp onClick={props.lukkDokument}>
                    <TilbakePil>Tilbake til saker</TilbakePil>
                </LenkeKnapp>
            </KnappWrapper>
        </Header>
    );

    return (
        <ErrorBoundary boundaryName="Dokumentvisning">
            <Content>
                <span ref={ref} tabIndex={-1}>
                    <Undertittel className="visually-hidden">
                        Dokument: {props.valgtTab && props.valgtTab.tittel}
                    </Undertittel>
                </span>
                {tabsHeader}
                <VisDokumentContainer
                    journalpostId={valgtDokument.journalpostId}
                    dokumentreferanse={valgtTab.dokumentreferanse}
                    fødselsnummer={props.fødselsnummer}
                />
            </Content>
        </ErrorBoundary>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visDokument: state.saksoversikt.visDokument,
        valgtDokument: state.saksoversikt.valgtDokument,
        valgtTab: state.saksoversikt.valgtEnkeltdokument,
        erStandaloneVindu: state.saksoversikt.erStandaloneVindu,
        fødselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        lukkDokument: () => dispatch(settVisDokument(false)),
        setEnkeltDokument: (enkeltdokument: Dokument) => dispatch(settValgtEnkeltdokument(enkeltdokument))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DokumentOgVedlegg);
