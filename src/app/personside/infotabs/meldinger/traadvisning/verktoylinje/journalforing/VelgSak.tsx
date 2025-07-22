import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Radio, type RadioProps } from 'nav-frontend-skjema';
import Spinner from 'nav-frontend-spinner';
import { datoSynkende } from 'src/utils/date-utils';
import { type Group, groupBy } from 'src/utils/groupArray';
import styled from 'styled-components';
import journalsakResource from '../../../../../../../rest/resources/journalsakResource';
import useFieldState, { type FieldState } from '../../../../../../../utils/hooks/use-field-state';
import { type JournalforingsSak, type Kategorier, SakKategori, type Tema } from './JournalforingPanel';
import TemaTable from './TemaTabell';

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
    valgtSak?: JournalforingsSak;
}

export function fordelSaker(saker: JournalforingsSak[]): Kategorier {
    const kategoriGruppert = saker.reduce(groupBy(sakKategori), {
        [SakKategori.FAG]: [],
        [SakKategori.GEN]: []
    });

    const temaGruppertefagSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.FAG].reduce(
        groupBy((sak) => sak.temaNavn),
        {}
    );
    const temaGrupperteGenerelleSaker: Group<JournalforingsSak> = kategoriGruppert[SakKategori.GEN].reduce(
        groupBy((sak) => sak.temaNavn),
        {}
    );

    const fagSaker = Object.entries(temaGruppertefagSaker)
        .reduce((acc, [tema, saker]) => {
            const sortedSaker = saker.sort(datoSynkende((t) => t.opprettetDato || new Date(0)));
            acc.push({ tema, saker: sortedSaker });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));
    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker)
        .reduce((acc, [tema, saker]) => {
            const sortedSaker = saker.sort(datoSynkende((t) => t.opprettetDato || new Date(0)));
            acc.push({ tema, saker: sortedSaker });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));

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
    const result = journalsakResource.useFetch();

    if (result.isPending) {
        return <Spinner type="XL" />;
    }
    if (result.isError) {
        return <AlertStripeFeil className="blokk-xxxs">Feilet ved uthenting av saker</AlertStripeFeil>;
    }

    const { saker, feiledeSystemer } = result.data;
    const fordelteSaker = fordelSaker(saker);

    const feiledeSystemerAlerts = feiledeSystemer.map((system) => (
        <AlertStripeAdvarsel className="blokk-xxxs" key={system}>
            Feil ved uthenting av saker fra saker fra {system}
        </AlertStripeAdvarsel>
    ));

    const temaTable = fordelteSaker[valgtKategori.input.value as SakKategori].map((tema: Tema) => (
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
