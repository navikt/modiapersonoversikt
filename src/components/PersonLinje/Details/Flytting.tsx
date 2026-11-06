import { Button, Modal, Table } from '@navikt/ds-react';
import { useState } from 'react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type {
    Adresse,
    GyldighetsPeriode,
    InnflyttingTilNorge,
    SistEndret,
    UtflyttingFraNorge
} from 'src/lib/types/modiapersonoversikt-api';
import { datoEllerNull, ENDASH } from 'src/utils/string-utils';
import { Adresseinfo, IngenInfo } from './components';

type Utenlandsflytting = {
    fraLand?: string | null;
    tilLand?: string | null;
    gyldighetsPeriode?: GyldighetsPeriode | null;
    flyttedato?: string | null;
    sistEndret?: SistEndret | null;
};

function sorterNyesteForst<T>(liste: T[], hentDato: (element: T) => string | null | undefined): T[] {
    return [...liste].sort((a, b) => (hentDato(b) ?? '').localeCompare(hentDato(a) ?? ''));
}

function formaterDato(dato: string | null | undefined): string {
    return datoEllerNull(dato) ?? ENDASH;
}

function formaterKilde(adresse: Adresse): string {
    const kildeinformasjon = [adresse.sistEndret?.system, adresse.sistEndret?.kilde].filter(Boolean);
    return kildeinformasjon.join(' / ') || ENDASH;
}

function skjulNorgeFraAdresse(adresse: Adresse): Adresse {
    return adresse.linje3?.trim().toLocaleLowerCase('nb') === 'norge' ? { ...adresse, linje3: null } : adresse;
}

function InnenlandsflyttingTabell({ flyttinger }: { flyttinger: Adresse[] }) {
    const sorterteFlyttinger = sorterNyesteForst(
        flyttinger,
        (flytting) => flytting.gyldighetsPeriode?.gyldigFraOgMed ?? flytting.angittFlyttedato
    );

    return (
        <Table size="small" zebraStripes aria-label="Bosteder" tabIndex={0}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Ny adresse</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Angitt flyttedato til ny bolig</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Gyldig fra</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Gyldig til</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Sist endret</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sorterteFlyttinger.map((flytting, index) => (
                    <Table.Row
                        key={`${flytting.linje1}-${flytting.gyldighetsPeriode?.gyldigFraOgMed ?? index}`}
                        shadeOnHover={false}
                    >
                        <Table.HeaderCell scope="row">
                            <Adresseinfo adresse={skjulNorgeFraAdresse(flytting)} size="medium" />
                        </Table.HeaderCell>
                        <Table.DataCell>{formaterDato(flytting.angittFlyttedato)}</Table.DataCell>
                        <Table.DataCell>{formaterKilde(flytting)}</Table.DataCell>
                        <Table.DataCell>
                            {formaterDato(flytting.gyldighetsPeriode?.gyldigFraOgMed ?? flytting.angittFlyttedato)}
                        </Table.DataCell>
                        <Table.DataCell>{formaterDato(flytting.gyldighetsPeriode?.gyldigTilOgMed)}</Table.DataCell>
                        <Table.DataCell>{formaterDato(flytting.sistEndret?.tidspunkt)}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

function UtenlandsflyttingTabell({
    innflyttinger,
    utflyttinger
}: {
    innflyttinger: InnflyttingTilNorge[];
    utflyttinger: UtflyttingFraNorge[];
}) {
    const flyttinger: Utenlandsflytting[] = [
        ...innflyttinger.map((flytting) => ({
            fraLand: flytting.fraflyttingsland,
            tilLand: 'Norge',
            gyldighetsPeriode: flytting.gyldighetsPeriode,
            sistEndret: flytting.sistEndret
        })),
        ...utflyttinger.map((flytting) => ({
            fraLand: 'Norge',
            tilLand: flytting.tilflyttingsland,
            gyldighetsPeriode: flytting.gyldighetsPeriode,
            flyttedato: flytting.utflyttingsdato,
            sistEndret: flytting.sistEndret
        }))
    ];
    const sorterteFlyttinger = sorterNyesteForst(
        flyttinger,
        (flytting) => flytting.gyldighetsPeriode?.gyldigFraOgMed ?? flytting.flyttedato
    );

    return (
        <Table size="small" zebraStripes aria-label="Inn- og Utflytting" tabIndex={0}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Fra - Til</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Gyldig fra</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Gyldig til</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Sist endret</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sorterteFlyttinger.map((flytting, index) => (
                    <Table.Row
                        key={`${flytting.fraLand}-${flytting.tilLand}-${flytting.gyldighetsPeriode?.gyldigFraOgMed ?? index}`}
                        shadeOnHover={false}
                    >
                        <Table.HeaderCell scope="row">
                            {flytting.fraLand ?? ENDASH} - {flytting.tilLand ?? ENDASH}
                        </Table.HeaderCell>
                        <Table.DataCell>{formaterDato(flytting.flyttedato)}</Table.DataCell>
                        <Table.DataCell>{formaterDato(flytting.gyldighetsPeriode?.gyldigFraOgMed)}</Table.DataCell>
                        <Table.DataCell>{formaterDato(flytting.gyldighetsPeriode?.gyldigTilOgMed)}</Table.DataCell>
                        <Table.DataCell>{formaterDato(flytting.sistEndret?.tidspunkt)}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default function Flytting() {
    const { data } = usePersonData();
    const [valgtKategori, setValgtKategori] = useState<'Bosteder' | 'Inn- og utflytting Norge' | null>(null);
    const person = data?.person;

    if (!person) {
        return null;
    }

    const historiskeBostedAdresser = person.historiskeBostedAdresser ?? [];
    const harInnenlandsflytting = historiskeBostedAdresser.isNotEmpty();
    const harUtenlandsflytting = person.innflyttingTilNorge.isNotEmpty() || person.utflyttingFraNorge.isNotEmpty();

    if (!harInnenlandsflytting && !harUtenlandsflytting) {
        return <IngenInfo tekst="Ingen info om flytting og bostedsadresser" />;
    }

    return (
        <div className="flex flex-col items-start gap-2">
            {harInnenlandsflytting && (
                <Button
                    variant="tertiary"
                    size="small"
                    aria-haspopup="dialog"
                    onClick={() => setValgtKategori('Bosteder')}
                >
                    Bosteder
                </Button>
            )}
            <Button
                variant="tertiary"
                size="small"
                aria-haspopup="dialog"
                onClick={() => setValgtKategori('Inn- og utflytting Norge')}
            >
                Inn- og utflytting Norge
            </Button>
            <Modal
                open={valgtKategori !== null}
                onClose={() => setValgtKategori(null)}
                header={{ heading: valgtKategori ?? 'Flytting' }}
                width="80rem"
                closeOnBackdropClick
            >
                <Modal.Body className="overflow-x-auto">
                    {valgtKategori === 'Bosteder' && <InnenlandsflyttingTabell flyttinger={historiskeBostedAdresser} />}
                    {valgtKategori === 'Inn- og utflytting Norge' &&
                        (harUtenlandsflytting ? (
                            <UtenlandsflyttingTabell
                                innflyttinger={person.innflyttingTilNorge}
                                utflyttinger={person.utflyttingFraNorge}
                            />
                        ) : (
                            <IngenInfo tekst="Ingen inn- og utflytting til Norge" />
                        ))}
                </Modal.Body>
            </Modal>
        </div>
    );
}
