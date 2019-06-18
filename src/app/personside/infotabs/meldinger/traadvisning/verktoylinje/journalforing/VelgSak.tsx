import React from 'react';
import { UseFetchHook } from '../../../../../../../utils/hooks/use-fetch';
import { JournalforingsSak, SakKategori } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeProps } from 'nav-frontend-alertstriper';
import styled from 'styled-components';

interface Props {
    gsakSaker: UseFetchHook<Array<JournalforingsSak>>;
    psakSaker: UseFetchHook<Array<JournalforingsSak>>;
    alleSaker: UseFetchHook<Array<JournalforingsSak>>;
}

type EnumObject<T> = { [key in SakKategori]: T };
function fordelSakerPaKategori(
    alle: UseFetchHook<Array<JournalforingsSak>>,
    gsak: UseFetchHook<Array<JournalforingsSak>>,
    psak: UseFetchHook<Array<JournalforingsSak>>
): EnumObject<Array<JournalforingsSak>> {
    const initalValue: EnumObject<Array<JournalforingsSak>> = { Fagsaker: [], 'Generelle saker': [] };
    if (alle.isLoading || alle.isError) {
        return initalValue;
    }
    const psakData = psak.data || [];
    const gsakData = gsak.data || [];

    const psakIder = psakData.map(sak => sak.fagsystemSaksId);
    const gsakSaker = gsakData.filter(sak => !psakIder.includes(sak.fagsystemSaksId));

    return [...gsakSaker, ...psakData]
        .flat()
        .reduce((acc: EnumObject<Array<JournalforingsSak>>, sak: JournalforingsSak) => {
            const kategori = sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
            acc[kategori].push(sak);
            return acc;
        }, initalValue);
}

const Form = styled.form`
    display: flex;
    > * {
        margin: 0;
    }
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

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

function VelgSak(props: Props) {
    const kategori = useFieldState(SakKategori.FAG);
    const { gsakSaker, psakSaker, alleSaker } = props;
    const sakerFordeltPaKategori = fordelSakerPaKategori(alleSaker, gsakSaker, psakSaker);
    const valgtKategori = sakerFordeltPaKategori[kategori.value].map((sak: JournalforingsSak) => (
        <li key={sak.fagsystemSaksId!}>{sak.fagsystemNavn}</li>
    ));

    return (
        <>
            <Form className="blokk-xxs">
                <SakgruppeRadio label={SakKategori.FAG} {...kategori} />
                <SakgruppeRadio label={SakKategori.GEN} {...kategori} />
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
        </>
    );
}
export default VelgSak;
