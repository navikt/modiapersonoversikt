import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useState } from 'react';
import styled from 'styled-components';
import { FeatureToggles } from '../../../../../../../components/featureToggle/toggleIDs';
import useFeatureToggle from '../../../../../../../components/featureToggle/useFeatureToggle';
import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import { kanTraadJournalfores, kanTraadJournalforesV2 } from '../../../utils/meldingerUtils';
import { JournalforSak } from './JournalforSak';
import VelgSak from './VelgSak';

export enum SakKategori {
    FAG = 'Fagsaker',
    GEN = 'Generelle saker'
}

enum AktivtVindu {
    SAKLISTE = 0,
    SAKVISNING = 1
}

export interface JournalforingsSak {
    fagsystemKode: string;
    fagsystemNavn: string;
    fagsystemSaksId: string | null;
    finnesIGsak: boolean;
    finnesIPsak: boolean;
    opprettetDato: string | null;
    saksId: string;
    saksIdVisning: string;
    sakstype: string | null;
    sakstypeForVisningGenerell: boolean;
    temaKode: string;
    temaNavn: string;
    syntetisk?: boolean | null;
}

export type Result = { saker: Array<JournalforingsSak>; feiledeSystemer: Array<string> };
export type Tema = { tema: string; saker: Array<JournalforingsSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };

interface Props {
    lukkPanel: () => void;
    traad: Traad;
}

const Container = styled.section`
    position: relative;
    text-align: center;
    padding-top: 1rem;
`;

const Margin = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

function JournalforingPanel(props: Props) {
    const [aktivtVindu, setAktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const [valgtSak, setValgtSak] = useState<JournalforingsSak>();

    const { isOn: kanJournalForeUtenSvar } = useFeatureToggle(FeatureToggles.JournalforUtenSvar);

    const kanJournalfores = kanJournalForeUtenSvar
        ? kanTraadJournalforesV2(props.traad)
        : kanTraadJournalfores(props.traad);
    function velgSak(sak: JournalforingsSak) {
        setAktivtVindu(AktivtVindu.SAKVISNING);
        setValgtSak(sak);
    }

    const tilbake = () => {
        setAktivtVindu(AktivtVindu.SAKLISTE);
    };

    if (!kanJournalfores) {
        return (
            <Margin>
                <AlertStripeInfo>Tråden kan ikke journalføres</AlertStripeInfo>
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </Margin>
        );
    }

    if (aktivtVindu === AktivtVindu.SAKVISNING && valgtSak !== undefined) {
        return <JournalforSak traad={props.traad} sak={valgtSak} tilbake={tilbake} lukkPanel={props.lukkPanel} />;
    }
    return <VelgSak velgSak={velgSak} valgtSak={valgtSak} />;
}

function JournalforingPanelContainer(props: Props) {
    return (
        <Container>
            <JournalforingPanel {...props} />
        </Container>
    );
}

export default JournalforingPanelContainer;
