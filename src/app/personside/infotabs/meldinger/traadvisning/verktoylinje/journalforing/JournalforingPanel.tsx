import React, { useState } from 'react';
import styled from 'styled-components';
import Spinner from 'nav-frontend-spinner';
import useFetch, { AsyncResult, isPending } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import VelgSak from './VelgSak';
import { JournalforSak } from './JournalforSak';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

const Container = styled.section`
    position: relative;
    text-align: center;
    padding: 1.5rem 1rem;
`;

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

const credentials: RequestInit = { credentials: 'include' };

interface Props {
    lukkPanel: () => void;
    traad: Traad;
}

function JournalforingPanel(props: Props) {
    const [aktivtVindu, setAktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const [valgtSak, setValgtSak] = useState<JournalforingsSak>();
    const fnr = '10108000398';

    function velgSak(sak: JournalforingsSak) {
        setAktivtVindu(AktivtVindu.SAKVISNING);
        setValgtSak(sak);
    }

    const gsakSaker: AsyncResult<Array<JournalforingsSak>> = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`,
        credentials
    );
    const psakSaker: AsyncResult<Array<JournalforingsSak>> = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`,
        credentials
    );

    if (isPending(gsakSaker) || isPending(psakSaker)) {
        return <Spinner type="XL" />;
    } else if (aktivtVindu === AktivtVindu.SAKVISNING && valgtSak !== undefined) {
        return <JournalforSak traad={props.traad} sak={valgtSak} fnr={fnr} lukkPanel={props.lukkPanel} />;
    } else {
        return <VelgSak gsakSaker={gsakSaker} psakSaker={psakSaker} velgSak={velgSak} lukkPanel={props.lukkPanel} />;
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
