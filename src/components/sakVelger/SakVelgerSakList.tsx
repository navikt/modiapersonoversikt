import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import type { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import type { Kategorier, Tema } from 'src/components/sakVelger/SakVelger';
import { usePiltasterIListe } from 'src/components/sakVelger/keyboardHooks';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';

interface SakVelgerSakListProps {
    kategorier: Kategorier;
    valgtKategori: SakKategori;
    valgtTema: Tema | undefined;
    setSak: (sak: JournalforingSak, kategori: SakKategori, tema: Tema) => void;
    setSakIFokus: (sak: JournalforingSak | undefined) => void;
    sakIFokus?: JournalforingSak;
    saksListeRef: React.RefObject<HTMLDivElement | null>;
}

const SakVelgerSakList: React.FC<SakVelgerSakListProps> = ({
    kategorier,
    valgtKategori,
    valgtTema,
    setSak,
    sakIFokus,
    setSakIFokus,
    saksListeRef
}) => {
    const saker = kategorier[valgtKategori].filter((it) => it.tema === valgtTema?.tema).flatMap((it) => it.saker);

    usePiltasterIListe<JournalforingSak>(saksListeRef, [sakIFokus, saker, valgtTema], saker, setSakIFokus, sakIFokus);

    if (!valgtTema) return <BodyShort>Velg et tema</BodyShort>;

    return (
        <VStack className="bg-ax-bg-accent-soft  rounded-sm" padding="4">
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
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="listbox"
                aria-labelledby="heading-listbox2"
                ref={saksListeRef}
                aria-activedescendant={sakIFokus?.saksId}
            >
                {saker.map((sak) => (
                    <SakListeElement
                        key={sak.saksId}
                        sak={sak}
                        onClick={() => setSak(sak, valgtKategori, valgtTema)}
                        valgt={sakIFokus}
                    />
                ))}
            </div>
        </VStack>
    );
};

const SakListeElement = ({
    sak,
    onClick,
    valgt
}: { sak: JournalforingSak; onClick: () => void; valgt?: JournalforingSak }) => {
    const sakRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (valgt === sak && sakRef.current) {
            sakRef.current.focus();
        }
    }, [valgt, sak]);

    return (
        <div
            ref={sakRef}
            id={sak.saksId}
            tabIndex={-1}
            // biome-ignore lint/a11y/useSemanticElements: <Custom tabindex og tastaturnavigasjon gir bedre ux enn select/option>
            role="option"
            onClick={onClick}
            className="z-10 cursor-pointer py-1 border-b-2 focus:border-0 hover:bg-ax-bg-accent-moderate-hover focus:bg-ax-bg-accent-moderate-hover focus:outline-2 focus:outline-ax-border-accent-strong"
            aria-selected={valgt?.saksId === sak.saksId}
            onSelect={onClick}
            onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== 'space') return;
                onClick();
            }}
        >
            <HStack justify="space-between">
                <span>{sak.saksId}</span>
                <span className="w-50">{formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato)}</span>
            </HStack>
        </div>
    );
};

export default SakVelgerSakList;
