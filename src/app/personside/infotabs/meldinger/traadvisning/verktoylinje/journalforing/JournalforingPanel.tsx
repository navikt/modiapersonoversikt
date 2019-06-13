import React, { useState } from 'react';
import styled from 'styled-components';
import { AlertStripeAdvarsel, AlertStripeProps } from 'nav-frontend-alertstriper';
import Spinner from 'nav-frontend-spinner';
import { Radio } from 'nav-frontend-skjema';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import useFetch, { UseFetchHook, combineStates } from '../../../../../../../utils/hooks/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';

const Container = styled.section`
    padding: 0.5rem 1.5rem;
`;
const Form = styled.form`
    display: flex;
    > * {
        margin: 0;
    }
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

enum SakKategori {
    FAG = 'Fagsaker',
    GEN = 'Generelle saker'
}
enum AktivtVindu {
    SAKLISTE,
    SAKVISNING
}
interface Sak {
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

function SakgruppeRadio(props: FieldState & { label: SakKategori }) {
    return (
        <Radio
            label={props.label}
            name="journalforing-sakgruppe"
            value={props.label}
            onChange={props.onChange}
            checked={props.value === props.label}
        />
    );
}

function ConditionalFeilmelding(props: AlertStripeProps & { vis: boolean }) {
    const { vis, ...rest } = props;
    if (!vis) {
        return null;
    }
    return <AlertStripeAdvarsel {...rest} />;
}

type EnumObject<T> = { [key in SakKategori]: T };
function fordelSakerPaKategori(
    alle: UseFetchHook<Array<Sak>>,
    gsak: UseFetchHook<Array<Sak>>,
    psak: UseFetchHook<Array<Sak>>
): EnumObject<Array<Sak>> {
    const initalValue: EnumObject<Array<Sak>> = { Fagsaker: [], 'Generelle saker': [] };
    if (alle.isLoading || alle.isError) {
        return initalValue;
    }
    const psakData = psak.data || [];
    const gsakData = gsak.data || [];

    const psakIder = psakData.map(sak => sak.fagsystemSaksId);
    const gsakSaker = gsakData.filter(sak => !psakIder.includes(sak.fagsystemSaksId));

    return [...gsakSaker, ...psakData].flat().reduce((acc: EnumObject<Array<Sak>>, sak: Sak) => {
        const kategori = sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
        acc[kategori].push(sak);
        return acc;
    }, initalValue);
}

const credentials: RequestInit = { credentials: 'include' };
function JournalforingPanel() {
    const [aktivtVindu] = useState<AktivtVindu>(AktivtVindu.SAKLISTE);
    const sakkategori = useFieldState(SakKategori.FAG);
    const fnr = '10108000398';

    const gsakSaker = useFetch<Array<Sak>>(`${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`, credentials);
    const psakSaker = useFetch<Array<Sak>>(`${apiBaseUri}/journalforing/${fnr}/saker/pensjon`, credentials);
    const alleSaker = combineStates<Array<Sak>>((acc, next) => acc.concat(next), [], gsakSaker, psakSaker);

    if (alleSaker.isLoading) {
        return (
            <Container>
                <Spinner />
            </Container>
        );
    } else if (aktivtVindu === AktivtVindu.SAKLISTE) {
        const sakerFordeltPaKategori = fordelSakerPaKategori(alleSaker, gsakSaker, psakSaker);
        const valgtKategori = sakerFordeltPaKategori[sakkategori.value].map((sak: Sak) => (
            <li key={sak.fagsystemSaksId!}>{sak.fagsystemNavn}</li>
        ));

        return (
            <Container>
                <Form className="blokk-xxs">
                    <SakgruppeRadio label={SakKategori.FAG} {...sakkategori} />
                    <SakgruppeRadio label={SakKategori.GEN} {...sakkategori} />
                </Form>
                <div className="blokk-xxs">
                    <ConditionalFeilmelding vis={!gsakSaker.isError} className="blokk-xxxs">
                        Feil ved uthenting av saker fra GSAK
                    </ConditionalFeilmelding>
                    <ConditionalFeilmelding vis={!psakSaker.isError}>
                        Feil ved uthenting av saker fra PSAK
                    </ConditionalFeilmelding>
                </div>
                <ul>{valgtKategori}</ul>
            </Container>
        );
    } else {
        return <h1>Journalføringspanel</h1>;
    }
}

export default JournalforingPanel;
