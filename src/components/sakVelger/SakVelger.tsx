import { Alert, BodyShort, Button, Table, ToggleGroup } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import { useMemo, useState } from 'react';
import { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { useJournalforingSaker } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende, formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';
import { type Group, groupBy } from 'src/utils/groupArray';

interface SakVelgerRootContext {
    valgtSakKategori: SakKategori;
    setSakKategori: (sakKategori: SakKategori) => void;
    valgtTema: Tema | undefined;
    setTema: (tema: Tema) => void;
    saker: JournalforingSak[];
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
    fordelteSaker: Kategorier;
    feiledeSystemer: string[];
}

interface SakVelgerRootProps {
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
    children: (context: SakVelgerRootContext) => React.ReactNode;
}

const SakVelgerRoot: React.FC<SakVelgerRootProps> = ({ children, setSak }) => {
    const { data, isPending, isError } = useJournalforingSaker();

    const [valgtSakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [valgtTema, setTema] = useState<Tema | undefined>();

    const { saker, feiledeSystemer } = data || { saker: [], feiledeSystemer: [] };
    const fordelteSaker = useMemo(() => fordelSaker(saker), [saker]);

    if (isPending) {
        return <Spinner type="XL" />;
    }
    if (isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }

    return (
        <>
            {children({
                saker,
                setSak,
                fordelteSaker,
                feiledeSystemer,
                valgtSakKategori,
                setSakKategori,
                valgtTema,
                setTema
            })}
        </>
    );
};

interface SakVelgerRadioGroupProps {
    valgtSakKategori: SakKategori;
    setSakKategori: (sakKategori: SakKategori) => void;
}

const SakVelgerToggleGroup: React.FC<SakVelgerRadioGroupProps> = ({ valgtSakKategori, setSakKategori }) => {
    return (
        <ToggleGroup
            size="small"
            label="Saktype"
            value={valgtSakKategori}
            onChange={(value) => setSakKategori(value as SakKategori)}
        >
            {Object.values(SakKategori).map((sakKategori) => (
                <ToggleGroup.Item value={sakKategori} key={sakKategori} label={sakKategori} />
            ))}
        </ToggleGroup>
    );
};

interface SakVelgerTemaTableProps {
    kategorier: Kategorier;
    valgtKategori: SakKategori;
    valgtTema: Tema | undefined;
    setValgtTema: (tema: Tema) => void;
}

const SakVelgerTemaTable: React.FC<SakVelgerTemaTableProps> = ({
    kategorier,
    valgtKategori,
    valgtTema,
    setValgtTema
}) => {
    return (
        <Table zebraStripes size="small" aria-label="Tema">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell className="min-w-8" scope="col">
                        Tema
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="sr-only">
                        Velg
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {kategorier[valgtKategori].map((tema) => (
                    <Table.Row
                        key={`${valgtKategori}-${tema.tema}`}
                        onClick={() => {
                            setValgtTema(tema);
                        }}
                        selected={tema.tema === valgtTema?.tema}
                        className="cursor-pointer"
                    >
                        <Table.HeaderCell scope="row">{tema.tema}</Table.HeaderCell>
                        <Table.DataCell className="sr-only">
                            <Button type="button" variant="secondary" onClick={() => setValgtTema(tema)}>
                                Velg
                            </Button>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

interface SakVelgerSakTableProps {
    kategorier: Kategorier;
    valgtKategori: SakKategori;
    valgtTema: Tema | undefined;
    valgtSak?: JournalforingSak;
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
}

const SakVelgerSakTable: React.FC<SakVelgerSakTableProps> = ({
    kategorier,
    valgtKategori,
    valgtTema,
    valgtSak,
    setSak
}) => {
    if (!valgtTema) return <BodyShort>Velg et tema</BodyShort>;

    return (
        <Table zebraStripes size="small" aria-label="Saker">
            <Table.Header>
                <Table.HeaderCell scope="col">SaksId</Table.HeaderCell>
                <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
                <Table.HeaderCell scope="col" className="sr-only">
                    Velg
                </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {kategorier[valgtKategori]
                    .filter((it) => it.tema === valgtTema.tema)
                    .flatMap((it) =>
                        it.saker.map((sak) => (
                            <Table.Row
                                key={`${valgtKategori}-${valgtTema.tema}-${sak.saksId}`}
                                onClick={() => {
                                    setSak(sak, valgtKategori, valgtTema);
                                }}
                                className="cursor-pointer"
                                selected={valgtSak?.saksId ? valgtSak.saksId === sak.saksId : undefined}
                            >
                                <Table.HeaderCell scope="row">{sak.saksId}</Table.HeaderCell>
                                <Table.DataCell>{formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato)}</Table.DataCell>
                                <Table.DataCell className="sr-only">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setSak(sak, valgtKategori, valgtTema)}
                                    >
                                        {sak.saksId}
                                    </Button>
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
            </Table.Body>
        </Table>
    );
};

const SakVelger = {
    Root: SakVelgerRoot,
    ToggleGroup: SakVelgerToggleGroup,
    TemaTable: SakVelgerTemaTable,
    SakTable: SakVelgerSakTable
};

export default SakVelger;

function fordelSaker(saker: JournalforingSak[]): Kategorier {
    const kategoriGruppert = saker.reduce(groupBy(sakKategori), {
        [SakKategori.FAG]: [],
        [SakKategori.GEN]: []
    });

    const temaGruppertefagSaker: Group<JournalforingSak> = kategoriGruppert[SakKategori.FAG]
        .filter((sak): sak is JournalforingSak & { temaNavn: string } => typeof sak.temaNavn === 'string')
        .reduce(
            groupBy((sak) => sak.temaNavn),
            {}
        );
    const temaGrupperteGenerelleSaker: Group<JournalforingSak> = kategoriGruppert[SakKategori.GEN]
        .filter((sak): sak is JournalforingSak & { temaNavn: string } => typeof sak.temaNavn === 'string')
        .reduce(
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

function sakKategori(sak: JournalforingSak): SakKategori {
    return sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
}

type Tema = { tema: string; saker: Array<JournalforingSak> };
type Kategorier = { [key in SakKategori]: Tema[] };
