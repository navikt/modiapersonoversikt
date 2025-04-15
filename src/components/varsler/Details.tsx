import { ErrorMessage, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useFilterVarsler } from 'src/components/varsler/List/utils';
import type { FeiletVarsling, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/varsler');

const FeilteVarslingerListe = ({
    tittel,
    feilteVarslinger
}: {
    tittel: string;
    feilteVarslinger: FeiletVarsling[];
}) => {
    return (
        <div className="my-1">
            <div className="font-bold">{tittel}</div>
            <div>
                {feilteVarslinger.map((varsling) => (
                    <div key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                        <ErrorMessage size="small" showIcon>
                            {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                        </ErrorMessage>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DittNavInformasjonsLinje = ({
    tittel,
    tekst,
    className
}: {
    tittel: string;
    tekst: string;
    className?: string;
}) => {
    return (
        <HStack gap="4">
            <div className="font-bold">{tittel}</div>
            <div className={twMerge('text-base', className)}>{tekst}</div>
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
            <Heading level="3" size="xsmall">
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
                        tittel="Varslingsfeil"
                        feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                    />
                )}
                {varslingsTidspunkt?.harFeilteRevarslinger && (
                    <FeilteVarslingerListe
                        tittel="Revarslingsfeil"
                        feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                    />
                )}
            </VStack>
        </>
    );
};

const VarselDetailExtractor = () => {
    const { id } = routeApi.useSearch();
    const varlser = useFilterVarsler();
    const varsel = varlser.find((item) => item.eventId === id);

    return (
        <>
            {varsel && (
                <Card>
                    {varsel.erVarslerV2 ? (
                        <DittNavInformasjonsLinjerV2 varsel={varsel.event} kanaler={varsel.kanaler} />
                    ) : (
                        <DittNavInformasjonsLinjer varsel={varsel.event} kanaler={varsel.kanaler} />
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
