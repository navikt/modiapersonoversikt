import { Accordion, Table } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type {
    Adresse,
    GyldighetsPeriode,
    InnflyttingTilNorge,
    SistEndret,
    UtflyttingFraNorge
} from 'src/lib/types/modiapersonoversikt-api';
import { datoEllerNull, ENDASH } from 'src/utils/string-utils';
import { Adresseinfo } from './components';

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
        <Table size="small" zebraStripes aria-label="Bosteder">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Ny adresse</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Angitt flyttedato</Table.HeaderCell>
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
        <Table size="small" zebraStripes aria-label="Inn- og Utflytting">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Fra</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Til</Table.HeaderCell>
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
                        <Table.DataCell>{flytting.fraLand ?? ENDASH}</Table.DataCell>
                        <Table.DataCell>{flytting.tilLand ?? ENDASH}</Table.DataCell>
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
    const person = data?.person;

    if (!person) {
        return null;
    }

    const historiskeBostedAdresser = person.historiskeBostedAdresser ?? [];
    const harInnenlandsflytting = historiskeBostedAdresser.isNotEmpty();
    const harUtenlandsflytting = person.innflyttingTilNorge.isNotEmpty() || person.utflyttingFraNorge.isNotEmpty();

    if (!harInnenlandsflytting && !harUtenlandsflytting) {
        return null;
    }

    return (
        <Accordion size="small" indent={false}>
            {harInnenlandsflytting && (
                <Accordion.Item>
                    <Accordion.Header>Bosteder</Accordion.Header>
                    <Accordion.Content className="overflow-x-auto">
                        <InnenlandsflyttingTabell flyttinger={historiskeBostedAdresser} />
                    </Accordion.Content>
                </Accordion.Item>
            )}
            {harUtenlandsflytting && (
                <Accordion.Item>
                    <Accordion.Header>Inn- og utflytting</Accordion.Header>
                    <Accordion.Content className="overflow-x-auto">
                        <UtenlandsflyttingTabell
                            innflyttinger={person.innflyttingTilNorge}
                            utflyttinger={person.utflyttingFraNorge}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            )}
        </Accordion>
    );
}
