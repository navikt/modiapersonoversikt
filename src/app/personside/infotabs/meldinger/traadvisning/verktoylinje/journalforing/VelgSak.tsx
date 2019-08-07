import React from 'react';
import { AsyncResult, hasData, hasError } from '@nutgaard/use-fetch';
import { JournalforingsSak, Kategorier, SakKategori, Tema } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import TemaTable from './TemaTabell';
import styled from 'styled-components';
import visibleIf from '../../../../../../../components/visibleIfHoc';
import { Group, groupBy } from '../../../../../../../utils/groupArray';

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
            onChange={props.onChange}
            checked={props.value === props.label}
        />
    );
}

interface Props {
    gsakSaker: AsyncResult<Array<JournalforingsSak>>;
    psakSaker: AsyncResult<Array<JournalforingsSak>>;
    velgSak: (sak: JournalforingsSak) => void;
    valgtSak?: JournalforingsSak;
    lukkPanel: () => void;
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
    const valgtKategori = useFieldState(SakKategori.FAG);
    const { gsakSaker, psakSaker } = props;
    const saker = getSaker(gsakSaker, psakSaker);
    const fordelteSaker = fordelSaker(saker);

    const temaTable = fordelteSaker[valgtKategori.value].map((tema: Tema) => (
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
            <Form className="blokk-xxs">
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
