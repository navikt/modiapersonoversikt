import { Alert, BodyShort, Button, Loader, Table } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom } from 'src/lib/state/context';
import type { PersonsokRequest, PersonsokResponse } from 'src/lib/types/modiapersonoversikt-api';
import type { Kodeverk } from 'src/models/kodeverk';
import { useSettAktivBruker } from 'src/utils/customHooks';

export function PersonsokResult({
    query,
    onClick
}: {
    query: PersonsokRequest;
    onClick: () => void;
}) {
    const enhet = useAtomValue(aktivEnhetAtom);
    const settAktivBruker = useSettAktivBruker();

    const { isLoading, data, error } = $api.useQuery('post', '/rest/personsok/v3', {
        body: { enhet, ...query }
    });
    if (isLoading) return <Loader />;
    if (error) return <Alert variant="error">En feil oppsto under søket</Alert>;
    if (data && data.length === 0) {
        return <BodyShort>Fant ingen resultater</BodyShort>;
    }

    if (data) {
        const hasUtenlandskID = data.some((person) =>
            person.utenlandskID?.some((utenlandskID) => utenlandskID.identifikasjonsnummer !== undefined)
        );

        return (
            <>
                <span tabIndex={-1} className="sr-only" aria-live="polite">
                    Søket fant {data.length} treff
                </span>
                <Table size="small" zebraStripes aria-label="Søkeresultat">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Fødselsnummer</Table.HeaderCell>
                            {hasUtenlandskID && <Table.HeaderCell scope="col">Utenlandsk ID</Table.HeaderCell>}
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Adresser</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Bosted</Table.HeaderCell>
                            <Table.HeaderCell scope="col" className="sr-only">
                                Velg
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((res) => (
                            <Table.Row
                                className="cursor-pointer"
                                key={res.ident.ident}
                                onClick={() => {
                                    settAktivBruker(res.ident.ident);
                                    onClick();
                                }}
                            >
                                <Table.HeaderCell scope="row">{res.ident.ident}</Table.HeaderCell>
                                {hasUtenlandskID && (
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
            </>
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

function MidlertidigAdresseCelle(props: {
    brukerinfo: PersonsokResponse['brukerinfo'];
}) {
    if (props.brukerinfo?.midlertidigPostadresse) {
        const celletekst = `(M) ${props.brukerinfo.midlertidigPostadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function PostadresseCelle(props: { postadresse?: string }) {
    if (props.postadresse) {
        const celletekst = `(P) ${props.postadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function BostedsadresseCelle(props: { bostedsadresse?: string }) {
    if (props.bostedsadresse) {
        const celletekst = `(B) ${props.bostedsadresse}`;
        return <BodyShort size="small">{celletekst}</BodyShort>;
    }
    return null;
}

function UtenlandskIDCelle(props: {
    utenlandskID?: PersonsokResponse['utenlandskID'];
}) {
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

function formatNullableString(str?: string, prefixWithSpace?: boolean) {
    return str ? (prefixWithSpace ? ' ' : `${str}`) : '';
}

function formatterNavn(navn: PersonsokResponse['navn'], status?: Partial<Kodeverk>) {
    let personNavn = `${navn.etternavn}, ${navn.fornavn}${formatNullableString(navn.mellomnavn, true)}`;
    if (status?.beskrivelse === 'DØD') {
        personNavn += ' (død)';
    }
    return personNavn;
}
