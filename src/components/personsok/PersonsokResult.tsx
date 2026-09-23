import { Alert, BodyShort, Button, HStack, Loader, Pagination, Table, Tag, VStack } from '@navikt/ds-react';
import { keepPreviousData } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useLayoutEffect, useRef, useState } from 'react';
import { FetchError } from 'src/api/api';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom } from 'src/lib/state/context';
import type { PersonsokRequest, PersonsokResponse } from 'src/lib/types/modiapersonoversikt-api';
import { useSettAktivBruker } from 'src/utils/customHooks';
import { lagTreffTekst, RESULTATER_PER_SIDE } from './utils';

export const FOR_MANGE_TREFF_TEKST = 'Søket gav for mange treff. Legg til flere søkekriterier og prøv igjen.';

export function PersonsokResult({ query, onClick }: { query: PersonsokRequest; onClick: () => void }) {
    const enhet = useAtomValue(aktivEnhetAtom);
    const settAktivBruker = useSettAktivBruker();
    const [valgtSide, setValgtSide] = useState(1);

    // Én side per query-nøkkel: PDL kalles bare når saksbehandler blar til en side som ikke er hentet før.
    const { isLoading, isPlaceholderData, data, error } = $api.useQuery(
        'post',
        '/rest/personsok/v4',
        {
            body: { enhet, ...query, pageNumber: valgtSide, resultsPerPage: RESULTATER_PER_SIDE }
        },
        { placeholderData: keepPreviousData }
    );

    // Mens en ny side lastes, viser tabellen fortsatt forrige side. sideSomVises følger treffene i tabellen.
    const sideSomVises = data?.pageNumber ?? valgtSide;
    const paginering = useRef<HTMLElement>(null);
    const brukerHarByttetSide = useRef(false);
    useLayoutEffect(() => {
        if (!brukerHarByttetSide.current || isPlaceholderData || !data) return;
        paginering.current?.scrollIntoView?.({ block: 'nearest' });
    }, [isPlaceholderData, data]);

    const byttSide = (nySide: number) => {
        brukerHarByttetSide.current = true;
        setValgtSide(nySide);
    };

    if (isLoading) return <Loader />;
    if (error) {
        const fetchError: unknown = error;
        if (fetchError instanceof FetchError && fetchError.response.status === 400) {
            return <Alert variant="warning">{FOR_MANGE_TREFF_TEKST}</Alert>;
        }
        return <Alert variant="error">En feil oppsto under søket</Alert>;
    }
    if (data && data.treff.length === 0) {
        return <BodyShort>Fant ingen resultater</BodyShort>;
    }

    if (data) {
        const treff = data.treff;
        const totaltAntallTreff = data.totalHits ?? treff.length;
        const antallSider = data.totalPages ?? 1;
        const harUtenlandskID = treff.some((person) =>
            person.utenlandskID?.some((utenlandskID) => utenlandskID.identifikasjonsnummer !== undefined)
        );

        return (
            <VStack gap="space-8">
                <HStack gap="space-8" align="center">
                    <span aria-live="polite" aria-atomic="true">
                        <Tag size="small" variant="moderate" data-color="neutral">
                            {lagTreffTekst(sideSomVises, totaltAntallTreff)}
                        </Tag>
                    </span>
                    {isPlaceholderData && <Loader size="xsmall" title="Henter treff" />}
                </HStack>
                <Table size="small" zebraStripes aria-label="Søkeresultat" aria-busy={isPlaceholderData}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Fødselsnummer</Table.HeaderCell>
                            {harUtenlandskID && <Table.HeaderCell scope="col">Utenlandsk ID</Table.HeaderCell>}
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Adresser</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Bosted</Table.HeaderCell>
                            <Table.HeaderCell scope="col" className="sr-only">
                                Velg
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {treff.map((res) => (
                            <Table.Row
                                className="cursor-pointer"
                                key={res.ident.ident}
                                onClick={() => {
                                    settAktivBruker(res.ident.ident);
                                    onClick();
                                }}
                            >
                                <Table.HeaderCell scope="row">{res.ident.ident}</Table.HeaderCell>
                                {harUtenlandskID && (
                                    <Table.DataCell>
                                        <UtenlandskIDCelle utenlandskID={res.utenlandskID} />
                                    </Table.DataCell>
                                )}
                                <Table.DataCell>{formatterNavn(res.navn, res.status)}</Table.DataCell>
                                <Table.DataCell>
                                    <Address person={res} />
                                </Table.DataCell>
                                <Table.DataCell>{res.brukerinfo?.ansvarligEnhet}</Table.DataCell>
                                <Table.DataCell className="sr-only">
                                    <Button
                                        size="xsmall"
                                        variant="secondary"
                                        onClick={() => {
                                            settAktivBruker(res.ident.ident);
                                            onClick();
                                        }}
                                    >
                                        Velg
                                    </Button>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                {antallSider > 1 && (
                    <Pagination
                        ref={paginering}
                        page={valgtSide}
                        onPageChange={byttSide}
                        count={antallSider}
                        size="xsmall"
                        srHeading={{ tag: 'h2', text: 'Sidenavigasjon for søkeresultat' }}
                    />
                )}
            </VStack>
        );
    }
    return null;
}

function Address({ person }: { person: PersonsokResponse }) {
    if (!person.brukerinfo?.midlertidigPostadresse && !person.postadresse && !person.bostedsadresse) {
        return <BodyShort size="small">Ingen registrert adresse</BodyShort>;
    }

    return (
        <div>
            <MidlertidigAdresseCelle brukerinfo={person.brukerinfo} />
            <PostadresseCelle postadresse={person.postadresse} />
            <BostedsadresseCelle bostedsadresse={person.bostedsadresse} />
        </div>
    );
}

function MidlertidigAdresseCelle(props: { brukerinfo: PersonsokResponse['brukerinfo'] }) {
    if (props.brukerinfo?.midlertidigPostadresse) {
        const celletekst = `(M) ${props.brukerinfo.midlertidigPostadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function PostadresseCelle(props: { postadresse?: string | null }) {
    if (props.postadresse) {
        const celletekst = `(P) ${props.postadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function BostedsadresseCelle(props: { bostedsadresse?: string | null }) {
    if (props.bostedsadresse) {
        const celletekst = `(B) ${props.bostedsadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function UtenlandskIDCelle(props: { utenlandskID?: PersonsokResponse['utenlandskID'] }) {
    const harUtenlandskID = props.utenlandskID?.some(
        (utenlandskID) => utenlandskID.identifikasjonsnummer !== undefined
    );
    if (harUtenlandskID) {
        const celletekst = props.utenlandskID?.map((utenlandskID) => {
            const celletekst = `(${utenlandskID.utstederland}) ${utenlandskID.identifikasjonsnummer} `;
            return <BodyShort key={utenlandskID.identifikasjonsnummer}>{celletekst}</BodyShort>;
        });
        return <div>{celletekst}</div>;
    }
    return null;
}

function formatNullableString(str?: string | null, prefixWithSpace?: boolean) {
    return str ? (prefixWithSpace ? ' ' : `${str}`) : '';
}

function formatterNavn(navn: PersonsokResponse['navn'], status?: PersonsokResponse['status']) {
    let personNavn = `${navn.etternavn}, ${navn.fornavn}${formatNullableString(navn.mellomnavn, true)}`;
    if (status?.beskrivelse === 'DØD') {
        personNavn += ' (død)';
    }
    return personNavn;
}
