import { Alert } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import SakVelgerSakList from 'src/components/sakVelger/SakVelgerSakList';
import SakVelgerTemaList from 'src/components/sakVelger/SakVelgerTemaList';
import SakVelgerToggleGroup from 'src/components/sakVelger/SakVelgerToggleGroup';
import { useFokusVedPiltaster } from 'src/components/sakVelger/keyboardHooks';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { useJournalforingSaker } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
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
    sakIFokus: JournalforingSak | undefined;
    setSakIFokus: (sak: JournalforingSak | undefined) => void;
    temaListeRef: React.RefObject<HTMLDivElement | null>;
    saksListeRef: React.RefObject<HTMLDivElement | null>;
}

interface SakVelgerRootProps {
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
    children: (context: SakVelgerRootContext) => React.ReactNode;
}

const SakVelgerRoot: React.FC<SakVelgerRootProps> = ({ children, setSak }) => {
    const { data, isPending, isError } = useJournalforingSaker();

    const [valgtSakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [valgtTema, setTema] = useState<Tema | undefined>();

    const [sakIFokus, setSakIFokus] = useState<JournalforingSak | undefined>();

    const { saker, feiledeSystemer } = data || { saker: [], feiledeSystemer: [] };
    const fordelteSaker = useMemo(() => fordelSaker(saker), [saker]);

    const temaListeRef = useRef<HTMLDivElement>(null);
    const saksListeRef = useRef<HTMLDivElement>(null);

    const valgteSaker = useMemo(
        () => fordelteSaker[valgtSakKategori].filter((tema) => tema === valgtTema).flatMap((tema) => tema.saker),
        [valgtTema, fordelteSaker, valgtSakKategori]
    );

    const foksuserPaaValgtTema = () => {
        setSakIFokus(undefined);
        const valgTemaDOM = document.getElementById(valgtTema?.tema.replace(/\s+/g, '') ?? '');
        if (valgTemaDOM) {
            valgTemaDOM.focus();
        }
    };

    const fokuserPaaForsteSak = () => {
        valgteSaker.length ? setSakIFokus(valgteSaker[0]) : undefined;
    };

    useFokusVedPiltaster(
        saksListeRef,
        temaListeRef,
        [valgtTema, valgteSaker],
        foksuserPaaValgtTema,
        fokuserPaaForsteSak
    );

    useEffect(() => {
        setTema(fordelteSaker[valgtSakKategori][0]);
    }, [valgtSakKategori, fordelteSaker]);

    if (isPending) {
        return <Spinner type="XL" />;
    }
    if (isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }

    return (
        <>
            {/* eslint-disable-next-line react-compiler/react-compiler */}
            {children({
                saker,
                setSak,
                fordelteSaker,
                feiledeSystemer,
                valgtSakKategori,
                setSakKategori,
                valgtTema,
                setTema,
                sakIFokus,
                setSakIFokus,
                temaListeRef,
                saksListeRef
            })}
        </>
    );
};

const SakVelger = {
    Root: SakVelgerRoot,
    ToggleGroup: SakVelgerToggleGroup,
    TemaListe: SakVelgerTemaList,
    SakListe: SakVelgerSakList
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

export type Tema = { tema: string; saker: Array<JournalforingSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };
