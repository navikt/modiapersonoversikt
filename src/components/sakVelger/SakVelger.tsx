import { Alert, HStack, Radio, RadioGroup, Table } from '@navikt/ds-react';
import {
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { type Group, groupBy } from 'src/utils/groupArray';
import { useState } from 'react';
import { useJournalforingSaker } from 'src/lib/clients/modiapersonoversikt-api';
import Spinner from 'nav-frontend-spinner';

interface SakVelgerRootContext {
    valgtSakKategori: SakKategori;
    setSakKategori: (sakKategori: SakKategori) => void;
    valgtTema: Tema | undefined;
    setValgtTema: (tema: Tema) => void;
    saker: JournalforingSak[];
    setSak: (sak: JournalforingSak) => void;
    fordelteSaker: Kategorier;
    feiledeSystemer: string[];
}

interface SakVelgerRootProps {
    setSak: (sak: JournalforingSak) => void;
    children: (context: SakVelgerRootContext) => React.ReactNode;
}

const SakVelgerRoot: React.FC<SakVelgerRootProps> = ({ children, setSak }) => {
    const { data, isPending, isError } = useJournalforingSaker();

    const [valgtSakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [valgtTema, setValgtTema] = useState<Tema | undefined>();
    if (isPending) {
        return <Spinner type="XL" />;
    }
    if (isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }
    const { saker, feiledeSystemer } = data;

    const fordelteSaker = fordelSaker(saker);

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
                setValgtTema
            })}
        </>
    );
};

interface SakVelgerRadioGroupProps {
    valgtSakKategori: SakKategori;
    setSakKategori: (sakKategori: SakKategori) => void;
}

const SakVelgerRadioGroup: React.FC<SakVelgerRadioGroupProps> = ({ valgtSakKategori, setSakKategori }) => {
    return (
        <RadioGroup legend="Saktype" value={valgtSakKategori} onChange={setSakKategori}>
            <HStack gap="2">
                {Object.values(SakKategori).map((sakKategori) => (
                    <Radio value={sakKategori} key={sakKategori}>
                        {sakKategori}
                    </Radio>
                ))}
            </HStack>
        </RadioGroup>
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
        <Table zebraStripes className="table-fixed">
            <Table.Header>
                <Table.HeaderCell scope="col">Tema</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {kategorier[valgtKategori].map((tema) => (
                    <Table.Row
                        key={tema.tema}
                        onClick={() => {
                            setValgtTema(tema);
                        }}
                        selected={tema.tema === valgtTema?.tema}
                        className="cursor-pointer"
                    >
                        <Table.DataCell>{tema.tema}</Table.DataCell>
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
    setSak: (sak: JournalforingSak) => void;
}

const SakVelgerSakTable: React.FC<SakVelgerSakTableProps> = ({ kategorier, valgtKategori, valgtTema, setSak }) => {
    return (
        <Table zebraStripes className="table-fixed">
            <Table.Header>
                <Table.HeaderCell scope="col">SaksId</Table.HeaderCell>
                <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {kategorier[valgtKategori]
                    .filter((it) => it.tema === valgtTema?.tema)
                    .flatMap((it) =>
                        it.saker.map((sak) => (
                            <Table.Row
                                key={sak.saksId}
                                onClick={() => {
                                    setSak(sak);
                                }}
                                className="cursor-pointer"
                            >
                                <Table.HeaderCell scope="row">{sak.saksId}</Table.HeaderCell>
                                <Table.DataCell>{formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato)}</Table.DataCell>
                            </Table.Row>
                        ))
                    )}
            </Table.Body>
        </Table>
    );
};

const SakVelger = {
    Root: SakVelgerRoot,
    RadioGroup: SakVelgerRadioGroup,
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
            acc.push({ tema, saker });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));
    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker)
        .reduce((acc, [tema, saker]) => {
            acc.push({ tema, saker });
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
