import React from 'react';
import { JournalforingsSak, JournalforingsSakIdentifikator, Kategorier, SakKategori, Tema } from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio, RadioProps } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TemaTable from './TemaTabell';
import styled from 'styled-components';
import { Group, groupBy } from '../../../../../../../utils/groupArray';
import Spinner from 'nav-frontend-spinner';
import journalsakResource from '../../../../../../../rest/resources/journalsakResource';

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

function SakgruppeRadio(props: FieldState & RadioProps & { label: SakKategori }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { input, setValue, isPristine, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    return <MiniRadio onChange={input.onChange} checked={input.value === props.label} {...rest} />;
}

interface Props {
    velgSak: (sak: JournalforingsSak) => void;
    eksisterendeSaker: Array<JournalforingsSakIdentifikator>;
    valgtSak?: JournalforingsSak;
}

export function fordelSaker(saker: JournalforingsSak[]): Kategorier {
    const kategoriGruppert = saker.reduce(groupBy(sakKategori), { [SakKategori.FAG]: [], [SakKategori.GEN]: [] });

    const temaGruppertefagSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.FAG].reduce(
        groupBy((sak) => sak.temaNavn),
        {}
    );
    const temaGrupperteGenerelleSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.GEN].reduce(
        groupBy((sak) => sak.temaNavn),
        {}
    );

    const fagSaker = Object.entries(temaGruppertefagSaker)
        .reduce((acc, [tema, saker]) => [...acc, { tema, saker }], [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));
    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker)
        .reduce((acc, [tema, saker]) => [...acc, { tema, saker }], [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));
    return {
        [SakKategori.FAG]: fagSaker,
        [SakKategori.GEN]: generelleSaker
    };
}

export function sakKategori(sak: JournalforingsSak): SakKategori {
    return sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
}

export function fjernSakerSomAlleredeErTilknyttet(
    saker: Array<JournalforingsSak>,
    eksisterendeSaker: Array<JournalforingsSakIdentifikator>
): Array<JournalforingsSak> {
    const temagrupperte = eksisterendeSaker
        .filter((it) => it.fagsystemSaksId !== undefined)
        .reduce(
            groupBy((it) => it.temaKode),
            {}
        );

    return saker.filter((sak) => {
        const tema = sak.temaKode;
        const temasaker: JournalforingsSakIdentifikator[] = temagrupperte[tema] ?? [];
        const erJournalfortPaSak = temasaker.find((it) => it.fagsystemSaksId === sak.fagsystemSaksId);
        return !erJournalfortPaSak;
    });
}

function VelgSak(props: Props) {
    const valgtKategori = useFieldState(SakKategori.FAG);
    const result = journalsakResource.useFetch();

    if (result.isPending) {
        return <Spinner type="XL" />;
    } else if (result.isError) {
        return <AlertStripeFeil className="blokk-xxxs">Feilet ved uthenting av saker</AlertStripeFeil>;
    }

    const { saker, feiledeSystemer } = result.data;
    const filtrerteSaker = fjernSakerSomAlleredeErTilknyttet(saker, props.eksisterendeSaker);
    const fordelteSaker = fordelSaker(filtrerteSaker);

    const feiledeSystemerAlerts = feiledeSystemer.map((system) => (
        <AlertStripeAdvarsel className="blokk-xxxs" key={system}>
            Feil ved uthenting av saker fra saker fra {system}
        </AlertStripeAdvarsel>
    ));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
            <Form>
                <SakgruppeRadio
                    name="journalforing-sakgruppe"
                    value={SakKategori.FAG}
                    label={SakKategori.FAG}
                    {...valgtKategori}
                    autoFocus={true}
                />
                <SakgruppeRadio
                    name="journalforing-sakgruppe"
                    value={SakKategori.GEN}
                    label={SakKategori.GEN}
                    {...valgtKategori}
                />
            </Form>
            <div>{feiledeSystemerAlerts}</div>
            {temaTable}
        </>
    );
}

export default VelgSak;
