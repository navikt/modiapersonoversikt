import { Alert, BodyLong, ErrorMessage, GuidePanel, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { varslerFilterAtom } from 'src/components/varsler/List/Filter';
import { useFilterVarsler } from 'src/components/varsler/List/utils';
import type { FeiletVarsling, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { varslerRouteMiddleware } from 'src/routes/new/person/varsler';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';

const routeApi = getRouteApi('/new/person/varsler');

const FeilteVarslingerListe = ({
    tittel,
    feilteVarslinger
}: {
    tittel: string;
    feilteVarslinger: FeiletVarsling[];
}) => {
    return (
        <HStack gap="1">
            <HStack width="8rem">
                <BodyLong size="medium" weight="semibold">
                    {tittel}
                </BodyLong>
            </HStack>
            {feilteVarslinger.map((varsling) => (
                <div key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                    <ErrorMessage size="small" showIcon>
                        {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                    </ErrorMessage>
                </div>
            ))}
        </HStack>
    );
};

const DittNavInformasjonsLinje = ({
    tittel,
    tekst
}: {
    tittel: string;
    tekst: string;
    className?: string;
}) => {
    return (
        <HStack gap="1">
            <HStack width="8rem">
                <BodyLong size="medium" weight="semibold">
                    {tittel}
                </BodyLong>
            </HStack>
            <BodyLong>{tekst}</BodyLong>
        </HStack>
    );
};

const DittNavInformasjonsLinjer = ({
    varsel,
    kanaler
}: {
    varsel: Varsel;
    kanaler: string[];
}) => {
    return (
        <VStack gap="1" className="p-2">
            <Heading level="3" size="xsmall" className="mb-4">
                {varsel.tekst}
            </Heading>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Kanaler:" tekst={emptyReplacement(kanaler?.join(', '), ENDASH)} />
        </VStack>
    );
};

const DittNavInformasjonsLinjerV2 = ({
    varsel,
    kanaler
}: {
    varsel: Varsel;
    kanaler: string[];
}) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    return (
        <>
            <DittNavInformasjonsLinjer varsel={varsel} kanaler={kanaler} />
            <VStack gap="1" className="px-2">
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={
                        varslingsTidspunkt?.tidspunkt
                            ? `${formaterDato(varslingsTidspunkt.tidspunkt)} - ${varslingsTidspunkt.sendteKanaler.join(', ')}`
                            : '-'
                    }
                />
                {varslingsTidspunkt?.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(
                            varslingsTidspunkt.renotifikasjonTidspunkt
                        )} - ${varslingsTidspunkt.renotifikasjonsKanaler.join(', ')}`}
                    />
                )}
                {varslingsTidspunkt?.harFeilteVarslinger && (
                    <FeilteVarslingerListe
                        tittel="Varslingsfeil: "
                        feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                    />
                )}
                {varslingsTidspunkt?.harFeilteRevarslinger && (
                    <FeilteVarslingerListe
                        tittel="Revarslingsfeil: "
                        feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                    />
                )}
            </VStack>
        </>
    );
};

const VarselDetailExtractor = () => {
    const { id } = routeApi.useSearch();
    const varsler = useFilterVarsler();
    const valgtVarsel = varsler.find((item) => item.eventId === id);
    const filterAtomValue = useAtomValue(varslerFilterAtom);
    const prevFilterRef = useRef(varslerFilterAtom);

    // Fjern varselid i URL og cache kun hvis filteret er endret og varselet ikke finnes i filtrerte varsler
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current) !== JSON.stringify(filterAtomValue);
        const varselIkkeIListe = !valgtVarsel || !varsler.includes(valgtVarsel);
        if (filterEndret && varselIkkeIListe) {
            varslerRouteMiddleware.clear();
        }
    }, [valgtVarsel, varsler, filterAtomValue]);

    if (!varsler.length) {
        return (
            <Alert className="mt-2" variant="info">
                Fant ingen varsler
            </Alert>
        );
    }

    if (!id) {
        return (
            <HStack margin="4">
                <GuidePanel>Velg et varsel fra listen til venstre for å se detaljer.</GuidePanel>
            </HStack>
        );
    }

    if (!valgtVarsel) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Varselet du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    return (
        <>
            {valgtVarsel && (
                <Card>
                    {valgtVarsel.erVarslerV2 ? (
                        <DittNavInformasjonsLinjerV2 varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                    ) : (
                        <DittNavInformasjonsLinjer varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                    )}
                </Card>
            )}
        </>
    );
};

export const VarselDetail = () => {
    return (
        <ErrorBoundary boundaryName="vaslerDetaljer">
            <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
                <VarselDetailExtractor />
            </Suspense>
        </ErrorBoundary>
    );
};
