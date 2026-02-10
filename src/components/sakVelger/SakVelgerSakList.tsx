import { BodyShort, Heading, HStack, VStack } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import type { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { usePiltasterIListe } from 'src/components/sakVelger/keyboardHooks';
import type { Kategorier, Tema } from 'src/components/sakVelger/SakVelger';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

interface SakVelgerSakListProps {
    kategorier: Kategorier;
    valgtKategori: SakKategori;
    valgtTema: Tema | undefined;
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
    setSakIFokus: (sak: JournalforingSak | undefined) => void;
    sakIFokus?: JournalforingSak;
    saksListeRef: React.RefObject<HTMLDivElement | null>;
    valgtSak?: JournalforingSak;
}

const SakVelgerSakList: React.FC<SakVelgerSakListProps> = ({
    kategorier,
    valgtKategori,
    valgtTema,
    setSak,
    sakIFokus,
    setSakIFokus,
    saksListeRef,
    valgtSak
}) => {
    const saker = kategorier[valgtKategori].filter((it) => it.tema === valgtTema?.tema).flatMap((it) => it.saker);

    usePiltasterIListe<JournalforingSak>(saksListeRef, [sakIFokus, saker, valgtTema], saker, setSakIFokus, sakIFokus);

    if (!valgtTema) return <BodyShort>Velg et tema</BodyShort>;

    return (
        <VStack className="bg-ax-bg-accent-soft rounded-sm" padding="4">
            <Heading size="xsmall" as="h2" id="heading-listbox2" className="mb-2">
                Velg sak
            </Heading>
            <HStack role="presentation" justify="space-between" className="border-b-2">
                <Heading size="xsmall">SaksId</Heading>
                <Heading className="w-50" size="xsmall">
                    Opprettet
                </Heading>
            </HStack>
            <div
                tabIndex={0}
                className="h-[55vh] overflow-auto"
                // biome-ignore lint/a11y/useSemanticElements: <Custom tabindex og tastaturnavigasjon gir bedre ux enn select/option>
                role="listbox"
                aria-labelledby="heading-listbox2"
                ref={saksListeRef}
                aria-activedescendant={sakIFokus?.saksIdVisning}
            >
                {saker.map((sak) => (
                    <SakListeElement
                        key={sak.saksIdVisning}
                        sak={sak}
                        onClick={() => setSak(sak, valgtKategori, valgtTema)}
                        valgtSak={valgtSak}
                        sakIFokus={sakIFokus}
                    />
                ))}
            </div>
        </VStack>
    );
};

const SakListeElement = ({
    sak,
    onClick,
    valgtSak,
    sakIFokus
}: {
    sak: JournalforingSak;
    onClick: () => void;
    valgtSak?: JournalforingSak;
    sakIFokus?: JournalforingSak;
}) => {
    const sakRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sakIFokus === sak && sakRef.current) {
            sakRef.current.focus();
        }
    }, [sakIFokus, sak]);

    return (
        <div
            ref={sakRef}
            id={sak.saksIdVisning}
            tabIndex={-1}
            // biome-ignore lint/a11y/useSemanticElements: <Custom tabindex og tastaturnavigasjon gir bedre ux enn select/option>
            role="option"
            onClick={onClick}
            className={twMerge(
                valgtSak?.saksIdVisning === sak.saksIdVisning
                    ? 'bg-ax-bg-accent-moderate-pressed outline-ax-border-accent-strong outline-2'
                    : 'border-b-2 focus:border-0 hover:bg-ax-bg-accent-moderate-hover focus:bg-ax-bg-accent-moderate-hover focus:outline-2 focus:outline-ax-border-accent-strong',
                'cursor-pointer py-1'
            )}
            aria-selected={valgtSak?.saksIdVisning === sak.saksIdVisning}
            onSelect={onClick}
            onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
                onClick();
            }}
        >
            <HStack justify="space-between">
                <span>{sak.saksIdVisning}</span>
                <span className="w-50">{formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato)}</span>
            </HStack>
        </div>
    );
};

export default SakVelgerSakList;
