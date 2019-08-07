import React, { useState } from 'react';
import styled from 'styled-components';
import VelgSak from './VelgSak';
import { JournalforSak } from './JournalforSak';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

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

function JournalforingPanel(props: Props) {
    const [aktivtVindu, setAktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const [valgtSak, setValgtSak] = useState<JournalforingsSak>();

    function velgSak(sak: JournalforingsSak) {
        setAktivtVindu(AktivtVindu.SAKVISNING);
        setValgtSak(sak);
    }

    const tilbake = () => {
        setAktivtVindu(AktivtVindu.SAKLISTE);
    };

    if (aktivtVindu === AktivtVindu.SAKVISNING && valgtSak !== undefined) {
        return <JournalforSak traad={props.traad} sak={valgtSak} tilbake={tilbake} lukkPanel={props.lukkPanel} />;
    } else {
        return <VelgSak velgSak={velgSak} valgtSak={valgtSak} lukkPanel={props.lukkPanel} />;
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
