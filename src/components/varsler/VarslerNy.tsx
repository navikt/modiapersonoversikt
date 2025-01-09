import { CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { Alert, Box, HStack, Pagination, Skeleton, Table, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { type ReactNode, useEffect, useMemo } from 'react';
import { emptyReplacement, getVarselTekst } from 'src/app/personside/infotabs/varsel/varsel-utils';
import VarselMeldinger from 'src/app/personside/infotabs/varsel/varselDetaljer/VarselMeldinger';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import {
    type DittNavEvent,
    type FeiletVarsling,
    type UnifiedVarsel,
    type UnifiedVarsel as UnifiedVarselModell,
    type Varsel as VarselModell,
    type VarslerResult,
    isDittNavEvent
} from 'src/models/varsel';
import { datoSynkende } from 'src/utils/date-utils';
import { ENDASH, formaterDato } from 'src/utils/string-utils';

const routeApi = getRouteApi('/new/person/varsler');

const datoExtractor = (varsel: UnifiedVarsel) => {
    if (isDittNavEvent(varsel)) {
        return varsel.forstBehandlet;
    }
    return varsel.mottattTidspunkt;
};

const DittNavInformasjonsLinje = ({
    tittel,
    tekst,
    className
}: { tittel: string; tekst: string; className?: string }) => {
    return (
        <HStack gap="4">
            <div className="text-sm font-bold">{tittel}</div>
            <div className={`${className} text-base`}>{tekst}</div>
        </HStack>
    );
};

const DittNavInformasjonsLinjer = (varsel: { produsent: string; tekst: string; link: string }) => {
    return (
        <VStack gap="1" className="p-2">
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Tekst:" tekst={emptyReplacement(varsel.tekst, ENDASH)} />
            <DittNavInformasjonsLinje
                tittel="Link:"
                tekst={emptyReplacement(varsel.link, ENDASH)}
                className="no-underline hover:underline hover:text-blue-600"
            />
        </VStack>
    );
};

const FeilteVarslingerListe = ({
    tittel,
    feilteVarslinger
}: { tittel: string; feilteVarslinger: FeiletVarsling[] }) => {
    return (
        <div className="my-2">
            <div className="font-bold">{tittel}</div>
            <div>
                {feilteVarslinger.map((varsling) => (
                    <li key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                        {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                    </li>
                ))}
            </div>
        </div>
    );
};

const DittNavInformasjonsLinjerV2 = (varsel: DittNavEvent) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    return (
        <>
            <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
            <DittNavInformasjonsLinje
                tittel="Varslet: "
                tekst={`${formaterDato(varslingsTidspunkt.tidspunkt)} - ${varslingsTidspunkt.sendteKanaler.join(', ')}`}
            />
            {varslingsTidspunkt.renotifikasjonTidspunkt && (
                <DittNavInformasjonsLinje
                    tittel="Revarslet: "
                    tekst={`${formaterDato(
                        varslingsTidspunkt.renotifikasjonTidspunkt
                    )} - ${varslingsTidspunkt.renotifikasjonsKanaler.join(', ')}`}
                />
            )}
            {varslingsTidspunkt.harFeilteVarslinger && (
                <>
                    <hr />
                    <FeilteVarslingerListe
                        tittel="Varslingsfeil"
                        feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                    />
                </>
            )}
            {varslingsTidspunkt.harFeilteRevarslinger && (
                <>
                    <hr />
                    <FeilteVarslingerListe
                        tittel="Revarslingsfeil"
                        feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                    />
                </>
            )}
        </>
    );
};

const dataExtractor = (
    varsel: UnifiedVarselModell
): { datoer: string[]; tittel: string; kanaler: string[]; harFeilteVarsel?: boolean; detaljer?: ReactNode } => {
    if (isDittNavEvent(varsel)) {
        const varslingsTidspunkt = varsel.varslingsTidspunkt;
        const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
        const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;

        if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
            const datoer = [formaterDato(varsel.forstBehandlet)];
            const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];

            const detaljer = (
                <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
            );

            return { datoer, tittel, kanaler, detaljer };
        }

        const datoer = [formaterDato(varslingsTidspunkt.tidspunkt)];
        if (varslingsTidspunkt.renotifikasjonTidspunkt) {
            datoer.push(formaterDato(varslingsTidspunkt.renotifikasjonTidspunkt));
        }

        const kanaler = [
            'DITT_NAV',
            ...varsel.eksternVarslingKanaler,
            ...varslingsTidspunkt.renotifikasjonsKanaler
        ].unique();

        const harFeilteVarsel = varslingsTidspunkt.harFeilteVarslinger || varslingsTidspunkt.harFeilteRevarslinger;
        const detaljer = <DittNavInformasjonsLinjerV2 varsel={varsel} />;

        return { datoer, tittel, kanaler, detaljer, harFeilteVarsel };
    }

    const meldingsliste = varsel.meldingListe?.sort(datoSynkende((melding) => melding.utsendingsTidspunkt)) || [];
    const datoer = meldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)).unique();
    const tittel = getVarselTekst(varsel);
    const kanaler = meldingsliste.map((melding) => melding.kanal).unique();
    const detaljer = <VarselMeldinger sortertMeldingsliste={meldingsliste} />;

    return { datoer, tittel, kanaler, detaljer };
};

function VarslerNy() {
    const rowsPerPage = 22;
    const { page } = routeApi.useSearch();
    const navigate = routeApi.useNavigate();
    const varslerResponse = useVarslerData();
    const varslerResult: VarslerResult = varslerResponse.data || { feil: [], varsler: [] };

    const varselElementer = useMemo(() => varslerResult.varsler.sort(datoSynkende(datoExtractor)), [varslerResult]);
    const varselPagniated = useMemo(
        () => varselElementer.slice((page - 1) * rowsPerPage, page * rowsPerPage),
        [varselElementer, page]
    );
    const maxPage = Math.ceil(varselElementer.length / rowsPerPage);

    const onPageClick = (pageNumber: number) => {
        navigate({ search: { page: pageNumber } });
    };

    useEffect(() => {
        if (page > maxPage) {
            navigate({ search: { page: 1 } });
        }
    }, [maxPage]);

    return (
        <QueryErrorBoundary
            error={varslerResponse.error}
            loading={varslerResponse.isLoading}
            loader={
                <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </>
            }
        >
            <div className="flex flex-col w-full max-h-screen overflow-auto pb-6">
                <Alert variant="info" className="my-4 rounded-xl" fullWidth={true} contentMaxWidth={false}>
                    Varsler vises kun ett år tilbake i tid. Dersom man trenger å se informasjon om eldre varsler kan man
                    lage en sak i porten for manuell uthenting.
                </Alert>
                {varslerResult.feil.length > 0 && (
                    <Alert variant="error" className="blokk-xs my-4">
                        {varsler.feil.join('. ')}
                    </Alert>
                )}
                <Box background="bg-default">
                    <Table size="small" className="border border-gray-300 mb-2">
                        <Table.Header textSize="small">
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell className="w-36">Dato</Table.HeaderCell>
                                <Table.HeaderCell className="w-24">Status</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell className="w-48">Kanal</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {useMemo(
                                () =>
                                    varselPagniated.map((item: VarselModell) => {
                                        const data = dataExtractor(item);
                                        return (
                                            <>
                                                <Table.ExpandableRow key={data.tittel} content={data.detaljer}>
                                                    <Table.DataCell align="left" textSize="small">
                                                        {data.datoer}
                                                    </Table.DataCell>
                                                    <Table.DataCell align="left" textSize="small">
                                                        {data.harFeilteVarsel ? (
                                                            <ExclamationmarkTriangleFillIcon fontSize="1.5rem" />
                                                        ) : (
                                                            <CheckmarkCircleFillIcon fontSize="1.5rem" />
                                                        )}
                                                    </Table.DataCell>
                                                    <Table.DataCell align="left" textSize="small">
                                                        {data.tittel}
                                                    </Table.DataCell>
                                                    <Table.DataCell align="left" textSize="small">
                                                        {data.kanaler.join(', ')}
                                                    </Table.DataCell>
                                                </Table.ExpandableRow>
                                            </>
                                        );
                                    }),
                                [varselPagniated]
                            )}
                        </Table.Body>
                    </Table>
                    <Pagination page={page} onPageChange={onPageClick} count={maxPage} size="small" />
                </Box>
            </div>
        </QueryErrorBoundary>
    );
}

export default VarslerNy;
