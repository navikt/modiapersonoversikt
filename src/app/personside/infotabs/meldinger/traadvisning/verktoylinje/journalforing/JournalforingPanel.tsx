import React, { useState } from 'react';
import styled from 'styled-components';
import Spinner from 'nav-frontend-spinner';
import useFetch, { AsyncResult, isPending } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
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

const credentials: RequestInit = { credentials: 'include' };

const Container = styled.section`
    position: relative;
    text-align: center;
    margin-top: 1rem;
`;

function JournalforingPanel(props: Props) {
    const [aktivtVindu, setAktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const [valgtSak, setValgtSak] = useState<JournalforingsSak>();
    const fnr = '10108000398';

    function velgSak(sak: JournalforingsSak) {
        setAktivtVindu(AktivtVindu.SAKVISNING);
        setValgtSak(sak);
    }

    const tilbake = () => {
        setAktivtVindu(AktivtVindu.SAKLISTE);
    };

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
        return (
            <JournalforSak traad={props.traad} sak={valgtSak} fnr={fnr} tilbake={tilbake} lukkPanel={props.lukkPanel} />
        );
    } else {
        return (
            <VelgSak
                gsakSaker={gsakSaker}
                psakSaker={psakSaker}
                velgSak={velgSak}
                valgtSak={valgtSak}
                lukkPanel={props.lukkPanel}
            />
        );
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
