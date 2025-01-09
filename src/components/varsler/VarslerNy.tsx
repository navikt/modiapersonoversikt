import { CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { Alert, Box, HStack, Pagination, Skeleton, Table, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { type ReactNode, useEffect, useMemo } from 'react';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import type { FeiletVarsling, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { emptyReplacement } from 'src/utils/string-utils';
import { ENDASH, formaterDato } from 'src/utils/string-utils';

const routeApi = getRouteApi('/new/person/varsler');

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
            <div className="text-sm font-bold">{tittel}</div>
            <div className={`${className} text-base`}>{tekst}</div>
        </HStack>
    );
};

const DittNavInformasjonsLinjer = (varsel: {
    produsent: string;
    tekst: string;
    link: string;
}) => {
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
}: {
    tittel: string;
    feilteVarslinger: FeiletVarsling[];
}) => {
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

const DittNavInformasjonsLinjerV2 = ({ varsel }: { varsel: Varsel }) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    return (
        <>
            <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
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
                <>
                    <hr />
                    <FeilteVarslingerListe
                        tittel="Varslingsfeil"
                        feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                    />
                </>
            )}
            {varslingsTidspunkt?.harFeilteRevarslinger && (
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
    varsel: Varsel
): {
    datoer: string[];
    tittel: string;
    kanaler: string[];
    harFeilteVarsel?: boolean;
    detaljer?: ReactNode;
} => {
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
};

function VarslerNy() {
    const rowsPerPage = 22;
    const { page } = routeApi.useSearch();
    const navigate = routeApi.useNavigate();
    const varslerResponse = useVarslerData();
    const varslerResult = varslerResponse.data || {
        feil: [],
        varsler: []
    };

    const varselElementer = useMemo(
        () => varslerResult.varsler.sort(datoSynkende((v) => v.forstBehandlet)),
        [varslerResult]
    );
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
    }, [maxPage, page, navigate]);

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
                <Alert variant="info" className="my-4" fullWidth={true} contentMaxWidth={false}>
                    Varsler vises kun ett år tilbake i tid. Dersom man trenger å se informasjon om eldre varsler kan man
                    lage en sak i porten for manuell uthenting.
                </Alert>
                {varslerResult.feil.length > 0 && (
                    <Alert variant="error" className="blokk-xs my-4">
                        {varslerResult.feil.join('. ')}
                    </Alert>
                )}
                <Box background="bg-default">
                    <Table size="small" className="border border-gray-300 mb-2" aria-label="Varsler">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell className="w-28">Dato</Table.HeaderCell>
                                <Table.HeaderCell className="w-20">Status</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell className="w-48">Kanal</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {varselPagniated.map((item, index) => {
                                const data = dataExtractor(item);
                                return (
                                    <Table.ExpandableRow
                                        key={`${data.datoer}_${data.tittel}_${index}`}
                                        content={data.detaljer}
                                    >
                                        <Table.DataCell align="left" textSize="small">
                                            {data.datoer}
                                        </Table.DataCell>
                                        <Table.DataCell align="left" textSize="small">
                                            {data.harFeilteVarsel ? (
                                                <ExclamationmarkTriangleFillIcon fontSize="1.5rem" title="Har feil" />
                                            ) : (
                                                <CheckmarkCircleFillIcon fontSize="1.5rem" title="Ok" />
                                            )}
                                        </Table.DataCell>
                                        <Table.DataCell align="left" textSize="small">
                                            {data.tittel}
                                        </Table.DataCell>
                                        <Table.DataCell align="left" textSize="small">
                                            {data.kanaler.join(', ')}
                                        </Table.DataCell>
                                    </Table.ExpandableRow>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    <Pagination
                        page={page}
                        onPageChange={onPageClick}
                        count={maxPage}
                        size="small"
                        srHeading={{ text: 'Varsler tabellpaginering', tag: 'h2' }}
                    />
                </Box>
            </div>
        </QueryErrorBoundary>
    );
}

export default VarslerNy;
