import React, { useEffect, useRef } from 'react';
import { AsyncResult, FetchResult, hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { JournalforingsSak, Kategorier, SakKategori, Tema } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import TemaTable from './TemaTabell';
import styled from 'styled-components/macro';
import visibleIf from '../../../../../../../components/visibleIfHoc';
import { Group, groupBy } from '../../../../../../../utils/groupArray';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import Spinner from 'nav-frontend-spinner';
import { useSelector } from 'react-redux';
import { fnrSelector } from '../../../../../../../redux/gjeldendeBruker/selectors';
import { useFetchWithLog } from '../../../../../../../utils/hooks/useFetchWithLog';

const Form = styled.form`
    display: flex;
    > * {
        margin: 0;
    }
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

const MiniRadio = styled(Radio)`
    .radioknapp + label {
        cline-height: 1.25rem;
        &:before {
            height: 1.25rem;
            width: 1.25rem;
        }
    }
`;

const ConditionalFeilmelding = visibleIf(AlertStripeAdvarsel);

function SakgruppeRadio(props: FieldState & { label: SakKategori }) {
    return (
        <MiniRadio
            label={props.label}
            name="journalforing-sakgruppe"
            value={props.label}
            onChange={props.input.onChange}
            checked={props.input.value === props.label}
        />
    );
}

interface Props {
    velgSak: (sak: JournalforingsSak) => void;
    valgtSak?: JournalforingsSak;
}

function getSaker(
    gsak: AsyncResult<Array<JournalforingsSak>>,
    psak: AsyncResult<Array<JournalforingsSak>>
): JournalforingsSak[] {
    const psakData = hasData(psak) ? psak.data : [];
    const gsakData = hasData(gsak) ? gsak.data : [];

    const psakIder = psakData.map(sak => sak.fagsystemSaksId);
    const gsakSaker = gsakData.filter(sak => !psakIder.includes(sak.fagsystemSaksId));

    return [...gsakSaker, ...psakData];
}

function fordelSaker(saker: JournalforingsSak[]): Kategorier {
    const kategoriGruppert = saker.reduce(groupBy(sakKategori), { [SakKategori.FAG]: [], [SakKategori.GEN]: [] });

    const temaGruppertefagSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.FAG].reduce(
        groupBy(sak => sak.temaNavn),
        {}
    );
    const temaGrupperteGenerelleSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.GEN].reduce(
        groupBy(sak => sak.temaNavn),
        {}
    );

    const fagSaker = Object.entries(temaGruppertefagSaker).reduce(
        (acc, [tema, saker]) => [...acc, { tema, saker }],
        [] as Tema[]
    );
    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker).reduce(
        (acc, [tema, saker]) => [...acc, { tema, saker }],
        [] as Tema[]
    );

    return {
        [SakKategori.FAG]: fagSaker,
        [SakKategori.GEN]: generelleSaker
    };
}

export function sakKategori(sak: JournalforingsSak): SakKategori {
    return sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
}

function VelgSak(props: Props) {
    const fnr = useSelector(fnrSelector);
    const valgtKategori = useFieldState(SakKategori.FAG);
    const gsakSaker: FetchResult<Array<JournalforingsSak>> = useFetchWithLog<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`,
        'VelgSak',
        includeCredentials,
        'GsakSaker'
    );
    const psakSaker: FetchResult<Array<JournalforingsSak>> = useFetchWithLog<Array<JournalforingsSak>>(
        `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`,
        'VelgSak',
        includeCredentials,
        'PsakSaker'
    );
    const formRef = useRef<HTMLFormElement>(null);

    const saker = getSaker(gsakSaker, psakSaker);
    const fordelteSaker = fordelSaker(saker);

    const pending = isPending(gsakSaker) || isPending(psakSaker);

    useEffect(() => {
        const input = formRef.current?.getElementsByTagName('input')[0];
        if (input) {
            input.focus();
        }
    }, [pending]);

    if (pending) {
        return <Spinner type="XL" />;
    }

    const temaTable = fordelteSaker[valgtKategori.input.value].map((tema: Tema) => (
        <TemaTable
            key={tema.tema}
            tema={tema.tema}
            saker={tema.saker}
            velgSak={props.velgSak}
            valgtSak={props.valgtSak}
        />
    ));

    return (
        <>
            <h2 className="sr-only">Velg sak</h2>
            <Form ref={formRef}>
                <SakgruppeRadio label={SakKategori.FAG} {...valgtKategori} />
                <SakgruppeRadio label={SakKategori.GEN} {...valgtKategori} />
            </Form>
            <div>
                <ConditionalFeilmelding visible={hasError(gsakSaker)} className="blokk-xxxs">
                    Feil ved uthenting av saker fra GSAK
                </ConditionalFeilmelding>
                <ConditionalFeilmelding visible={hasError(psakSaker)} className="blokk-xxxs">
                    Feil ved uthenting av saker fra PSAK
                </ConditionalFeilmelding>
            </div>
            {temaTable}
        </>
    );
}

export default VelgSak;
