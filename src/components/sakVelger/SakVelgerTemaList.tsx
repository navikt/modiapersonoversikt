import { Heading, VStack } from '@navikt/ds-react';
import type { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import TemaListeElement from 'src/components/melding/TemaListeElement';
import type { Kategorier, Tema } from 'src/components/sakVelger/SakVelger';
import { usePiltasterIListe } from 'src/components/sakVelger/keyboardHooks';

interface SakVelgerTemaListProps {
    kategorier: Kategorier;
    valgtKategori: SakKategori;
    valgtTema: Tema | undefined;
    setValgtTema: (tema: Tema) => void;
    temaListeRef: React.RefObject<HTMLDivElement | null>;
}

const SakVelgerTemaList = ({
    kategorier,
    valgtKategori,
    valgtTema,
    setValgtTema,
    temaListeRef
}: SakVelgerTemaListProps) => {
    usePiltasterIListe<Tema>(temaListeRef, [valgtTema], kategorier[valgtKategori], setValgtTema, valgtTema);

    return (
        <>
            <Heading size="xsmall" as="h2" className="mb-2" id="listboxlabel">
                Velg tema
            </Heading>
            <VStack height="58vh" overflow="auto" tabIndex={-1}>
                <div
                    tabIndex={0}
                    id="velg-sak-liste"
                    ref={temaListeRef}
                    aria-labelledby="listboxlabel"
                    // biome-ignore lint/a11y/useSemanticElements: <Custom tabindex og tastaturnavigasjon gir bedre ux enn select/option>
                    role="listbox"
                    aria-activedescendant={valgtTema?.tema.replace(/\s+/g, '')}
                >
                    {kategorier[valgtKategori].map((tema) => (
                        <TemaListeElement
                            key={tema.tema}
                            tema={tema.tema}
                            onChange={() => setValgtTema(tema)}
                            valgt={tema === valgtTema}
                        />
                    ))}
                </div>
            </VStack>
        </>
    );
};

export default SakVelgerTemaList;
