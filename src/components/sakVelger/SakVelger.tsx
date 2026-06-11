import { Alert, HGrid, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { useFokusVedPiltaster } from 'src/components/sakVelger/keyboardHooks';
import SakVelgerSakList from 'src/components/sakVelger/SakVelgerSakList';
import SakVelgerTemaList from 'src/components/sakVelger/SakVelgerTemaList';
import SakVelgerToggleGroup from 'src/components/sakVelger/SakVelgerToggleGroup';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { useJournalforingSaker } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { type Group, groupBy } from 'src/utils/groupArray';

export type Tema = { tema: string; saker: Array<JournalforingSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };

interface SakVelgerProps {
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema?: Tema) => void;
    valgtSak?: JournalforingSak;
}

const SakVelger: React.FC<SakVelgerProps> = ({ setSak, valgtSak }) => {
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
        if (valgteSaker.length) setSakIFokus(valgteSaker[0]);
    };

    useFokusVedPiltaster(
        temaListeRef,
        saksListeRef,
        [valgtTema, valgteSaker],
        foksuserPaaValgtTema,
        fokuserPaaForsteSak
    );

    useEffect(() => {
        setTema(fordelteSaker[valgtSakKategori][0]);
    }, [valgtSakKategori, fordelteSaker]);

    if (isPending) return <Spinner type="XL" />;
    if (isError) return <Alert variant="error">Feil ved henting av journalsaker</Alert>;

    return (
        <VStack gap="space-8">
            <SakVelgerToggleGroup valgtSakKategori={valgtSakKategori} setSakKategori={setSakKategori} />
            {valgtSakKategori === SakKategori.GEN ? (
                <GenerelleSakerListe
                    saker={fordelteSaker[SakKategori.GEN].flatMap((tema) => tema.saker)}
                    setSak={(sak) => setSak(sak, SakKategori.GEN)}
                />
            ) : (
                <HGrid align="start" columns={2} gap="space-8">
                    <div className="h-[60vh]">
                        <SakVelgerTemaList
                            kategorier={fordelteSaker}
                            valgtKategori={valgtSakKategori}
                            valgtTema={valgtTema}
                            setValgtTema={setTema}
                            temaListeRef={temaListeRef}
                        />
                    </div>
                    <div className="h-[60vh]">
                        <SakVelgerSakList
                            kategorier={fordelteSaker}
                            valgtKategori={valgtSakKategori}
                            valgtTema={valgtTema}
                            setSak={setSak}
                            setSakIFokus={setSakIFokus}
                            sakIFokus={sakIFokus}
                            saksListeRef={saksListeRef}
                            valgtSak={valgtSak}
                        />
                    </div>
                </HGrid>
            )}
            {feiledeSystemer.map((feiledeSystem) => (
                <Alert variant="warning" key={feiledeSystem}>
                    {feiledeSystem}
                </Alert>
            ))}
        </VStack>
    );
};

interface GenerelleSakerListeProps {
    saker: JournalforingSak[];
    setSak: (sak: JournalforingSak) => void;
}

const GenerelleSakerListe: React.FC<GenerelleSakerListeProps> = ({ saker, setSak }) => {
    const velgSak = (temaKode: string) => {
        const sak = saker.find((s) => s.temaKode === temaKode);
        if (sak) setSak(sak);
    };

    return (
        <UNSAFE_Combobox
            description="Ved å knytte dialogen til et tema vil dialogen bli journalført på generell sak med valgt tema"
            label="Velg tema"
            size="small"
            onToggleSelected={(option) => velgSak(option)}
            options={saker
                .filter(
                    (sak): sak is JournalforingSak & { temaNavn: string; temaKode: string } =>
                        typeof sak.temaNavn === 'string' && typeof sak.temaKode === 'string'
                )
                .map((sak) => ({ label: sak.temaNavn, value: sak.temaKode }))}
        />
    );
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
            acc.push({ tema, saker: saker.sort(datoSynkende((t) => t.opprettetDato || new Date(0))) });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));

    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker)
        .reduce((acc, [tema, saker]) => {
            acc.push({ tema, saker: saker.sort(datoSynkende((t) => t.opprettetDato || new Date(0))) });
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
