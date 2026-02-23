import { Alert, BodyLong, ErrorMessage, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { varslerFilterAtom } from 'src/components/varsler/List/Filter';
import { useFilterVarsler, type VarselData } from 'src/components/varsler/List/utils';
import type { Feilhistorikk, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { varslerRouteMiddleware } from 'src/routes/new/person/varsler';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';

const routeApi = getRouteApi('/new/person/varsler');

const FeilteVarslingerListe = ({
    tittel,
    feiledeVarslinger
}: {
    tittel: string;
    feiledeVarslinger: Feilhistorikk[];
}) => {
    return (
        <HStack gap="1">
            <HStack width="8rem">
                <BodyLong size="medium" weight="semibold">
                    {tittel}
                </BodyLong>
            </HStack>
            <VStack gap="1">
                {feiledeVarslinger.map((varsling) => (
                    <div key={`${varsling.tidspunkt} - ${varsling.feilmelding}`}>
                        <ErrorMessage size="small" showIcon>
                            {formaterDato(varsling.tidspunkt)}: {varsling.feilmelding}
                        </ErrorMessage>
                    </div>
                ))}
            </VStack>
        </HStack>
    );
};

const DittNavInformasjonsLinje = ({ tittel, tekst }: { tittel: string; tekst: string; className?: string }) => {
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

const DittNavInformasjonsLinjer = ({ varsel, kanaler }: { varsel: Varsel; kanaler: string[] }) => {
    const eksternVarsling = varsel.eksternVarsling;

    return (
        <>
            <VStack gap="1" className="p-2">
                <Heading level="3" size="xsmall" className="mb-4">
                    {varsel.innhold.tekst}
                </Heading>
                <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.innhold.link, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Kanaler:" tekst={emptyReplacement(kanaler.join(', '), ENDASH)} />
            </VStack>

            <VStack gap="1" className="px-2">
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={
                        eksternVarsling.sendtTidspunkt
                            ? `${formaterDato(eksternVarsling.sendtTidspunkt)} - ${kanaler.join(', ')}`
                            : '-'
                    }
                />
                {eksternVarsling.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(eksternVarsling.renotifikasjonTidspunkt)} - 
                    ${kanaler.join(', ')}`}
                    />
                )}
                {(eksternVarsling.feilhistorikk.length ?? 0) > 0 && (
                    <FeilteVarslingerListe tittel="Varslingsfeil: " feiledeVarslinger={eksternVarsling.feilhistorikk} />
                )}
            </VStack>
        </>
    );
};

const VarselDetailExtractor = ({ varsler }: { varsler: VarselData[] }) => {
    const { id } = routeApi.useSearch();
    let valgtVarsel = varsler.find((item) => item.eventId === id);
    const filterAtomValue = useAtomValue(varslerFilterAtom);
    const prevFilterRef = useRef(varslerFilterAtom);
    const navigate = routeApi.useNavigate();
    // Fjern varselid i URL og cache kun hvis filteret er endret og varselet ikke finnes i filtrerte varsler
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current) !== JSON.stringify(filterAtomValue);
        const varselIkkeIListe = !valgtVarsel || !varsler.includes(valgtVarsel);
        if (filterEndret && varselIkkeIListe) {
            varslerRouteMiddleware().clear();
        }
    }, [valgtVarsel, varsler, filterAtomValue]);

    if (!varsler.length) {
        return <></>;
    }

    if (id && !valgtVarsel) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Varselet du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    if (!valgtVarsel && !id) {
        valgtVarsel = varsler[0];
        navigate({ search: { id: valgtVarsel.eventId } });
    }

    if (!valgtVarsel) {
        return <></>;
    }

    return (
        <>
            {valgtVarsel && (
                <Card padding="2">
                    <DittNavInformasjonsLinjer varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                </Card>
            )}
        </>
    );
};

export const VarselDetail = () => {
    const { varsler, isLoading } = useFilterVarsler();
    return (
        <ErrorBoundary boundaryName="vaslerDetaljer" errorText="Det oppstod en feil under visning av varsel">
            {isLoading ? <Skeleton variant="rectangle" height="4rem" /> : <VarselDetailExtractor varsler={varsler} />}
        </ErrorBoundary>
    );
};
