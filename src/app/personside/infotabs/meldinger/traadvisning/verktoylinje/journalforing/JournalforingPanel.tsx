import React, { useState } from 'react';
import styled from 'styled-components';
import VelgSak from './VelgSak';
import { JournalforSak } from './JournalforSak';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { erEldsteMeldingJournalfort, kanJournalfores, sisteSendteMelding } from '../../../utils/meldingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

export enum SakKategori {
    FAG = 'Fagsaker',
    GEN = 'Generelle saker'
}

enum AktivtVindu {
    SAKLISTE,
    SAKVISNING
}

export interface JournalforingsSak {
    fagsystemKode: string;
    fagsystemNavn: string;
    fagsystemSaksId: string | null;
    finnesIGsak: boolean;
    finnesIPsak: boolean;
    opprettetDato: string | null;
    opprettetDatoFormatert: string;
    saksId: string;
    saksIdVisning: string;
    sakstype: string | null;
    sakstypeForVisningGenerell: boolean;
    temaKode: string;
    temaNavn: string;
}

export type Tema = { tema: string; saker: Array<JournalforingsSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };

interface Props {
    lukkPanel: () => void;
    traad: Traad;
}

const Container = styled.section`
    position: relative;
    text-align: center;
    margin-top: 1rem;
`;

const Margin = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

function JournalforingPanel(props: Props) {
    const [aktivtVindu, setAktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const [valgtSak, setValgtSak] = useState<JournalforingsSak>();
    const erJournalfort = erEldsteMeldingJournalfort(props.traad);
    const kanSisteMeldingJournalfores = kanJournalfores(sisteSendteMelding(props.traad).meldingstype);
    function velgSak(sak: JournalforingsSak) {
        setAktivtVindu(AktivtVindu.SAKVISNING);
        setValgtSak(sak);
    }

    const tilbake = () => {
        setAktivtVindu(AktivtVindu.SAKLISTE);
    };

    if (!kanSisteMeldingJournalfores) {
        return (
            <Margin>
                <AlertStripeInfo>Tråden kan ikke journalføres</AlertStripeInfo>
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </Margin>
        );
    }

    if (erJournalfort) {
        return (
            <Margin>
                <AlertStripeInfo>Tråden er allerede journalført</AlertStripeInfo>
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </Margin>
        );
    }

    if (aktivtVindu === AktivtVindu.SAKVISNING && valgtSak !== undefined) {
        return <JournalforSak traad={props.traad} sak={valgtSak} tilbake={tilbake} lukkPanel={props.lukkPanel} />;
    } else {
        return <VelgSak velgSak={velgSak} valgtSak={valgtSak} />;
    }
}

function JournalforingPanelContainer(props: Props) {
    return (
        <Container>
            <JournalforingPanel {...props} />
        </Container>
    );
}

export default JournalforingPanelContainer;
