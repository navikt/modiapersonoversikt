import React, { useState } from 'react';
import styled from 'styled-components';
import Spinner from 'nav-frontend-spinner';
import useFetch, { combineStates } from '../../../../../../../utils/hooks/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import VelgSak from './VelgSak';

const Container = styled.section`
    padding: 0.5rem 1.5rem;
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
function JournalforingPanel() {
    const [aktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const fnr = '10108000398';

    const gsakSaker = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`,
        credentials
    );
    const psakSaker = useFetch<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`,
        credentials
    );
    const alleSaker = combineStates<Array<JournalforingsSak>>(
        (acc, next) => acc.concat(next),
        [],
        gsakSaker,
        psakSaker
    );

    if (alleSaker.isLoading) {
        return (
            <Container>
                <Spinner />
            </Container>
        );
    } else if (aktivtVindu === AktivtVindu.SAKLISTE) {
        return (
            <Container>
                <VelgSak gsakSaker={gsakSaker} psakSaker={psakSaker} alleSaker={alleSaker} />
            </Container>
        );
    } else {
        return <h1>Journalføringspanel</h1>;
    }
}

export default JournalforingPanel;
