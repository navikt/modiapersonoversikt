import * as React from 'react';
import { useState } from 'react';
import { TabsPure } from 'nav-frontend-tabs';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import SaksoversiktLamell from './SaksoversiktLamell';
import { aremark } from '../../mock/person/aremark';
import VisittkortStandAlone from './VisittKort';
import styled from 'styled-components';
import BrukerprofilStandalone from './Brukerprofil';
import UtbetalingsLamell from './UtbetalingsLamell';
import { RouteComponentProps } from 'react-router';
import PleiepengerLamell from './Pleiepenger/PleiepengerLamell';
import HentOppgaveKnappStandalone from './HentOppgaveKnapp';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SaksoversiktMicroFrontend from '../../app/personside/infotabs/saksoversikt/SaksoversiktMicroFrontend';
import theme from '../../styles/personOversiktTheme';
import { moss } from '../../mock/person/moss';

enum Komponenter {
    Visittkort,
    Saksoversikt,
    SaksoversiktMCF,
    Brukerprofil,
    Utbetalinger,
    Pleiepenger,
    HentOppgaveKnapp
}

const keys = Object.keys(Komponenter);

const tabs: TabProps[] = keys.map(key => ({ label: Komponenter[key] })).slice(0, keys.length / 2);

const Style = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: steelblue;
    display: flex;
    flex-direction: column;
    > *:first-child {
        background-color: white;
        border-bottom: 0.3rem solid rgba(0, 0, 0, 0.3);
    }
`;

const KomponentStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: ${theme.color.bakgrunn};
    margin: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.7);
`;

function GjeldendeKomponent(props: { valgtTab: Komponenter; fnr: string }) {
    switch (props.valgtTab) {
        case Komponenter.Saksoversikt:
            return <SaksoversiktLamell fødselsnummer={props.fnr} />;
        case Komponenter.SaksoversiktMCF:
            return (
                <SaksoversiktMicroFrontend
                    fødselsnummer={props.fnr}
                    queryParamString={'sakstemaKode=BAR&journalpostId=ldhlu1bk&dokumentId=6tu2p5mg'}
                />
            );
        case Komponenter.Brukerprofil:
            return <BrukerprofilStandalone fødselsnummer={props.fnr} />;
        case Komponenter.Utbetalinger:
            return <UtbetalingsLamell fødselsnummer={props.fnr} />;
        case Komponenter.Pleiepenger:
            return (
                <>
                    <AlertStripeInfo>
                        Syntetiske fødselsnummere som gir pleiepenger-rettighet i mock-data
                    </AlertStripeInfo>
                    <PleiepengerLamell
                        fødselsnummer={aremark.fødselsnummer}
                        barnetsFødselsnummer={moss.fødselsnummer}
                    />
                </>
            );
        case Komponenter.HentOppgaveKnapp:
            return <HentOppgaveKnappStandalone />;
        case Komponenter.Visittkort:
        default:
            return <VisittkortStandAlone fødselsnummer={props.fnr} />;
    }
}

function StandAloneKomponenter(props: RouteComponentProps<{ fnr: string }>) {
    const routeFnr = props.match.params.fnr;
    const fnr = routeFnr || aremark.fødselsnummer;
    const [tab, setTab] = useState(Komponenter.Visittkort);
    return (
        <Style>
            <TabsPure tabs={tabs} onChange={(event, index) => setTab(index)} />
            <KomponentStyle>
                <GjeldendeKomponent valgtTab={tab} fnr={fnr} />
            </KomponentStyle>
        </Style>
    );
}

export default StandAloneKomponenter;
