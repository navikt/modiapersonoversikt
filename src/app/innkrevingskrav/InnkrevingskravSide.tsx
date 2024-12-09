import { PropsWithChildren, useEffect, useState } from 'react';
import {
    Alert,
    BodyShort,
    Box,
    Detail,
    Heading,
    HStack,
    Label,
    Page,
    Radio,
    RadioGroup,
    Search,
    Skeleton,
    Stack,
    Table,
    VStack
} from '@navikt/ds-react';
import { formaterNOK } from '../personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { ArrowLeftIcon, ArrowRightIcon, GavelIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { formaterDato } from 'src/utils/string-utils';
import { paths } from 'src/generated/modiapersonoversikt-api';
import { getRouteApi } from '@tanstack/react-router';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import IfFeatureToggleOn from 'src/components/featureToggle/IfFeatureToggleOn';

const InfoPoint = ({ label, text }: { label: string; text: string }) => {
    return (
        <HStack align="center" gap="2">
            <Label size="small" textColor="subtle">
                {label}:
            </Label>
            <Detail textColor="subtle">{text}</Detail>
        </HStack>
    );
};

const InnkrevingsKravDetaljer = ({ kravId }: { kravId: string }) => {
    const { data, isLoading, error } = $api.useQuery('get', '/rest/innkrevingskrav/{innkrevingskravId}', {
        params: { path: { innkrevingskravId: kravId } }
    });

    return (
        <Box marginBlock="4">
            <QueryErrorBoundary error={error} loading={isLoading}>
                {data && (
                    <Box>
                        <Box>
                            <InfoPoint label="Krav ID" text={kravId} />
                        </Box>
                        <HStack gap="8" marginBlock="2">
                            <InfoPoint label="Debitor" text={data.debitor.name} />
                            <InfoPoint label="Kreditor" text={data.kreditor.name} />
                            <InfoPoint label="KID" text={data.kid} />
                            <InfoPoint label="Kravtype" text={data.kravType} />
                        </HStack>
                        <Box borderWidth="1" borderColor="border-subtle" borderRadius="large" padding="4">
                            <Table size="small" zebraStripes={true}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell scope="col">Kode</Table.HeaderCell>
                                        <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                                        <Table.HeaderCell scope="col">Opprinnelig beløp</Table.HeaderCell>
                                        <Table.HeaderCell scope="col">Gjenstående beløp</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {data.posteringer.map((p) => (
                                        <Table.Row key={p.kode}>
                                            <Table.DataCell>{p.kode}</Table.DataCell>
                                            <Table.DataCell>
                                                {p.opprettetDato ? formaterDato(p.opprettetDato) : '-'}
                                            </Table.DataCell>
                                            <Table.DataCell>{formaterNOK(p.opprinneligBelop)}</Table.DataCell>
                                            <Table.DataCell>{formaterNOK(p.gjenstaendeBelop)}</Table.DataCell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Box>
                    </Box>
                )}
            </QueryErrorBoundary>
        </Box>
    );
};

const SearchResultTable = ({
    data
}: {
    data: paths['/rest/innkrevingskrav']['post']['responses']['200']['content']['*/*'];
}) => {
    const debitor = data.length > 0 ? data[0].debitor : undefined;
    const debitorType = debitor?.identType;

    return (
        <Box>
            {debitor && (
                <VStack marginBlock="2">
                    <BodyShort>
                        Viser krav knyttet til <b>{debitor.name}</b>
                    </BodyShort>
                    <InfoPoint label={debitorType === 'FNR' ? 'Fnr' : 'Org. nr'} text={debitor.ident} />
                </VStack>
            )}
            <Table size="small" zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Krav ID</Table.HeaderCell>
                        <Table.HeaderCell>Debitor</Table.HeaderCell>
                        <Table.HeaderCell>Reg. Dato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data?.map((k) => (
                        <Table.Row key={k.kravId}>
                            <Table.DataCell>{k.kravId}</Table.DataCell>
                            <Table.DataCell>{k.debitor.name}</Table.DataCell>
                            <Table.DataCell>{formaterDato(k.opprettetDato)}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Box>
    );
};

const SearchResults = ({ id, identType }: { id: string; identType: 'FNR' | 'ORG_NR' }) => {
    const { isLoading, data, error } = $api.useQuery('post', '/rest/innkrevingskrav', {
        body: { ident: id, identType }
    });

    return (
        <QueryErrorBoundary
            error={error}
            loading={isLoading}
            loader={
                <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </>
            }
        >
            {data ? <SearchResultTable data={data} /> : <Detail>Fant ingen innkrevingskrav</Detail>}
        </QueryErrorBoundary>
    );
};

const KravSearchResults = ({ kravId }: { kravId: string }) => {
    const { data, isLoading, error } = $api.useQuery('get', '/rest/innkrevingskrav/{innkrevingskravId}', {
        params: { path: { innkrevingskravId: kravId } }
    });

    return (
        <QueryErrorBoundary
            error={error}
            loading={isLoading}
            loader={
                <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </>
            }
        >
            {data ? <SearchResultTable data={[data]} /> : <Detail>Fant ikke innkrevingskravet</Detail>}
        </QueryErrorBoundary>
    );
};

const routeApi = getRouteApi('/innkrevingskrav');

const Sidebar = ({ children }: PropsWithChildren) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Box
            width={isExpanded ? '25%' : '3em'}
            padding="1"
            borderWidth="0 1 0 0"
            borderColor="border-subtle"
            onClick={isExpanded ? undefined : () => setIsExpanded(true)}
        >
            <HStack
                gap="2"
                marginBlock="2"
                padding="2"
                align="center"
                className="hover:bg-blue-50 cursor-pointer rounded group"
                onClick={() => setIsExpanded((v) => !v)}
                aria-hidden
            >
                {isExpanded ? (
                    <ArrowLeftIcon className="group-hover:-translate-x-1" fontSize="1.2rem" />
                ) : (
                    <ArrowRightIcon className="group-hover:translate-x-1" fontSize="1.2rem" />
                )}
                <BodyShort size="small" hidden={!isExpanded}>
                    Skjul
                </BodyShort>
            </HStack>
            <HStack gap="2" align="center" marginBlock="4" padding="2">
                <MagnifyingGlassIcon />
                <Heading size="xsmall" hidden={!isExpanded}>
                    Søk innkrevingskrav
                </Heading>
            </HStack>
            {isExpanded && children}
        </Box>
    );
};

const InnkrevingskravSide = () => {
    const { kravId } = routeApi.useSearch();
    const [nyKravId, setNyKravId] = useState(kravId);
    const [ident, setIdent] = useState<string | undefined>();
    const [nyIdent, setNyIdent] = useState<string | undefined>();
    const [searchType, setSearchType] = useState<'kravId' | 'fnr' | 'orgnr'>('kravId');

    useEffect(() => {
        if (searchType === 'fnr' || searchType === 'orgnr') {
            setIdent('');
            setNyIdent(undefined);
        }
    }, [searchType]);

    const navigate = routeApi.useNavigate();
    const setKravId = (clear?: boolean) => navigate({ search: { kravId: clear ? undefined : nyKravId } });

    return (
        <Page style={{ width: '100%', height: '100%' }}>
            <HStack gap="6" minHeight="90vh">
                <Sidebar>
                    <Box marginInline="4">
                        <RadioGroup legend="Søk med" value={searchType} onChange={setSearchType}>
                            <Stack gap="0 8" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                                <Radio size="small" value="kravId">
                                    Krav-ID
                                </Radio>
                                <IfFeatureToggleOn toggleID={FeatureToggles.FnrSokForInnkreving}>
                                    <Radio size="small" value="fnr">
                                        Fnr/Dnr
                                    </Radio>
                                </IfFeatureToggleOn>
                                <IfFeatureToggleOn toggleID={FeatureToggles.OrgnrSokForInnkreving}>
                                    <Radio size="small" value="orgnr">
                                        Org. nr
                                    </Radio>
                                </IfFeatureToggleOn>
                            </Stack>
                        </RadioGroup>
                        <Box marginBlock="4">
                            <form
                                role="search"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    setKravId();
                                    setNyIdent(ident);
                                }}
                            >
                                <Search
                                    placeholder={
                                        searchType === 'kravId'
                                            ? 'Krav ID'
                                            : searchType === 'fnr'
                                              ? 'F.nr/D-nr'
                                              : 'Org. nr'
                                    }
                                    label={
                                        searchType === 'kravId'
                                            ? 'Krav ID'
                                            : searchType === 'fnr'
                                              ? 'Fødselsnummer/D-nummer'
                                              : 'Organisasjonsnr.'
                                    }
                                    hideLabel={false}
                                    variant="secondary"
                                    size="small"
                                    value={searchType === 'kravId' ? nyKravId : ident}
                                    onChange={searchType === 'kravId' ? setNyKravId : setIdent}
                                    onClear={() => {
                                        if (searchType === 'kravId') setKravId(true);
                                        else setIdent(undefined);
                                    }}
                                />
                            </form>
                        </Box>

                        {searchType !== 'kravId' && nyIdent && (
                            <SearchResults id={nyIdent} identType={searchType === 'fnr' ? 'FNR' : 'ORG_NR'} />
                        )}
                        {searchType === 'kravId' && kravId && <KravSearchResults kravId={kravId} />}
                    </Box>
                </Sidebar>
                <Box padding="4" flexGrow="1">
                    <HStack align="center" gap="2">
                        <GavelIcon fontSize="1.8rem" />
                        <Heading size="medium">Innkrevingskrav</Heading>
                    </HStack>
                    {!kravId ? (
                        <Box marginBlock="4">
                            <Alert variant="info">Gjør et søk i sidemenyen for å velge et krav</Alert>
                        </Box>
                    ) : (
                        <InnkrevingsKravDetaljer kravId={kravId} />
                    )}
                </Box>
            </HStack>
        </Page>
    );
};

export default InnkrevingskravSide;
