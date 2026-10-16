import { BodyShort, Box, Button, Checkbox, CheckboxGroup, HGrid, HStack, Tooltip } from '@navikt/ds-react';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import Card from 'src/components/Card';
import type { TemaDokumentStatistikk } from 'src/components/Dokumenter/utils';
import { formaterDato } from 'src/utils/string-utils';

const ingenDokumenterTekst = 'Ingen dokumenter fra temaet med nåværende filtrering.';
const numberFormatter = new Intl.NumberFormat('nb-NO');

type Props = {
    temaer: TemaDokumentStatistikk[];
    selectedTemaer: string[];
    onChange: (temaer: string[]) => void;
    dataLoaded: boolean;
};

export const TemaFilterKort = ({ temaer, selectedTemaer, onChange, dataLoaded }: Props) => {
    const [visAlleTemaer, setVisAlleTemaer] = useState(false);
    const [antallTemaerPåFørsteLinje, setAntallTemaerPåFørsteLinje] = useState(temaer.length);
    const [høydePåFørsteLinje, setHøydePåFørsteLinje] = useState(0);
    const listeRef = useRef<HTMLDivElement>(null);
    const temaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const listeId = useId();

    useLayoutEffect(() => {
        const liste = listeRef.current;
        if (!liste) return;

        const oppdaterSynligeTemaer = () => {
            const listegrenser = liste.getBoundingClientRect();
            if (listegrenser.width === 0) {
                setAntallTemaerPåFørsteLinje(temaer.length);
                return;
            }

            let antallSomFårPlass = 0;
            const førsteTemaGrenser = temaRefs.current[0]?.getBoundingClientRect();
            let førsteLinjeBunn = førsteTemaGrenser?.bottom ?? listegrenser.top;
            for (const temaElement of temaRefs.current.slice(0, temaer.length)) {
                if (!temaElement) continue;
                const grenser = temaElement.getBoundingClientRect();
                if (grenser.top !== førsteTemaGrenser?.top) break;
                antallSomFårPlass++;
                førsteLinjeBunn = Math.max(førsteLinjeBunn, grenser.bottom);
            }
            setAntallTemaerPåFørsteLinje(Math.max(1, antallSomFårPlass));
            setHøydePåFørsteLinje(Math.max(0, førsteLinjeBunn - listegrenser.top));
        };

        oppdaterSynligeTemaer();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', oppdaterSynligeTemaer);
            return () => window.removeEventListener('resize', oppdaterSynligeTemaer);
        }

        const observer = new ResizeObserver(oppdaterSynligeTemaer);
        observer.observe(liste);
        temaRefs.current.slice(0, temaer.length).forEach((element) => {
            if (element) observer.observe(element);
        });
        return () => observer.disconnect();
    }, [temaer]);

    const antallSkjulteTemaer = temaer.length - antallTemaerPåFørsteLinje;

    return (
        <Card background="neutral-soft" padding="space-16" borderRadius="16">
            <CheckboxGroup
                legend="Velg tema for å filtrere dokumenter"
                description={
                    <BodyShort size="small">
                        Velg ett eller flere tema. Hvis du ikke velger tema, vises dokumenter fra alle tema.
                    </BodyShort>
                }
                value={selectedTemaer}
                onChange={onChange}
            >
                {dataLoaded && temaer.length === 0 ? (
                    <BodyShort size="small">Ingen tema er tilgjengelige.</BodyShort>
                ) : (
                    <>
                        <HGrid
                            id={listeId}
                            ref={listeRef}
                            data-tema-filter-liste
                            columns="repeat(auto-fit, minmax(min(100%, 14rem), 1fr))"
                            gap="space-24"
                            maxHeight={
                                visAlleTemaer || høydePåFørsteLinje === 0 ? undefined : `${høydePåFørsteLinje}px`
                            }
                            overflow={visAlleTemaer ? 'visible' : 'hidden'}
                        >
                            {temaer.map((tema, index) => {
                                const skjult = !visAlleTemaer && index >= antallTemaerPåFørsteLinje;
                                return (
                                    <Box
                                        key={tema.temakode}
                                        ref={(element) => {
                                            temaRefs.current[index] = element;
                                        }}
                                        data-tema-filter-element
                                        maxWidth="100%"
                                        className="wrap-break-word"
                                        aria-hidden={skjult || undefined}
                                        inert={skjult}
                                        style={{ visibility: skjult ? 'hidden' : 'visible' }}
                                    >
                                        <TemaValg tema={tema} />
                                    </Box>
                                );
                            })}
                        </HGrid>
                        {antallSkjulteTemaer > 0 && (
                            <Box paddingBlock="space-8 space-0">
                                <HStack justify="center">
                                    <Button
                                        type="button"
                                        size="small"
                                        variant="secondary"
                                        aria-controls={listeId}
                                        aria-expanded={visAlleTemaer}
                                        onClick={() => setVisAlleTemaer((vises) => !vises)}
                                    >
                                        {visAlleTemaer ? 'Vis færre tema' : `Vis flere tema (${antallSkjulteTemaer})`}
                                    </Button>
                                </HStack>
                            </Box>
                        )}
                    </>
                )}
            </CheckboxGroup>
        </Card>
    );
};

const TemaValg = ({ tema }: { tema: TemaDokumentStatistikk }) => {
    const deaktivert = tema.antallDokumenter === 0;
    const beskrivelse = deaktivert ? ingenDokumenterTekst : formaterDato(tema.nyesteDokumentDato ?? '');

    return (
        <Box>
            {deaktivert ? (
                <Tooltip content={ingenDokumenterTekst} describesChild>
                    <Box>
                        <Checkbox value={tema.temakode} disabled description={beskrivelse} size="small">
                            {`${tema.temanavn} (${numberFormatter.format(tema.antallDokumenter)})`}
                        </Checkbox>
                    </Box>
                </Tooltip>
            ) : (
                <Checkbox value={tema.temakode} description={beskrivelse} size="small">
                    {`${tema.temanavn} (${numberFormatter.format(tema.antallDokumenter)})`}
                </Checkbox>
            )}
        </Box>
    );
};
