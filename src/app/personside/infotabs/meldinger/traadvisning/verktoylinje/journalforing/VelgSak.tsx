import React from 'react';
import { FetchResult, hasError, isPending } from '@nutgaard/use-fetch';
import {
    JournalforingsSak,
    JournalforingsSakIdentifikator,
    Kategorier,
    Result,
    SakKategori,
    Tema
} from './JournalforingPanel';
import useFieldState, { FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { Radio, RadioProps } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TemaTable from './TemaTabell';
import styled from 'styled-components/macro';
import { Group, groupBy } from '../../../../../../../utils/groupArray';
import Spinner from 'nav-frontend-spinner';
import { useSelector } from 'react-redux';
import { fnrSelector } from '../../../../../../../redux/gjeldendeBruker/selectors';
import * as JournalforingUtils from '../../../../../journalforings-use-fetch-utils';

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
    const { input, setValue, isPristine, ...rest } = props;
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

export function fjernSakerSomAlleredeErTilknyttet(
    saker: Array<JournalforingsSak>,
    eksisterendeSaker: Array<JournalforingsSakIdentifikator>
): Array<JournalforingsSak> {
    const eksisterendeSakerMap: Group<string> = eksisterendeSaker
        .filter((it) => it.fagsystemSaksId !== undefined)
        .map((it) => it.fagsystemSaksId as string)
        .reduce(
            groupBy((it) => it),
            {}
        );

    return saker.filter((sak) => {
        if (sak.fagsystemSaksId) {
            return eksisterendeSakerMap[sak.fagsystemSaksId] === undefined;
        } else {
            return true;
        }
    });
}

function VelgSak(props: Props) {
    const fnr = useSelector(fnrSelector);
    const valgtKategori = useFieldState(SakKategori.FAG);
    const result: FetchResult<Result> = JournalforingUtils.useSaker(fnr);

    if (isPending(result)) {
        return <Spinner type="XL" />;
    } else if (hasError(result)) {
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
