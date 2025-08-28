import { LocationPinFillIcon, LocationPinIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import ValidPeriod from '../../common/ValidPeriod';
import { Adresseinfo, InfoElement, LastChanged } from '../components';

interface Props {
    person: PersonData;
}

interface AdresseElementProps {
    adresse: PersonData['oppholdsAdresse'][0] | null;
    beskrivelse: string;
    erOppholdsadresse?: boolean;
}

function AdresseElement({ adresse, beskrivelse, erOppholdsadresse }: AdresseElementProps) {
    if (!adresse) {
        return (
            <InfoElement title={beskrivelse} icon={<LocationPinIcon />}>
                <BodyShort size="small">Ikke registrert</BodyShort>
            </InfoElement>
        );
    }

    const skalViseGyldighetsPeriode =
        erOppholdsadresse || (!erOppholdsadresse && adresse.gyldighetsPeriode?.gyldigTilOgMed);

    return (
        <InfoElement title={beskrivelse} icon={<LocationPinFillIcon fontSize="1.2rem" color="var(--a-gray-400)" />}>
            {skalViseGyldighetsPeriode && (
                <ValidPeriod
                    from={adresse.gyldighetsPeriode?.gyldigFraOgMed}
                    to={adresse.gyldighetsPeriode?.gyldigTilOgMed}
                />
            )}
            <Adresseinfo adresse={adresse} />
            <LastChanged sistEndret={adresse.sistEndret} />
        </InfoElement>
    );
}

function Adresse({ person }: Props) {
    const oppholdsAdresse = person.oppholdsAdresse.firstOrNull();
    return (
        <>
            <AdresseElement adresse={person.bostedAdresse.firstOrNull()} beskrivelse={'Bostedsadresse'} />
            <AdresseElement adresse={person.kontaktAdresse.firstOrNull()} beskrivelse={'Kontaktadresse'} />
            {oppholdsAdresse && (
                <AdresseElement adresse={oppholdsAdresse} beskrivelse={'Oppholdsadresse'} erOppholdsadresse={true} />
            )}
        </>
    );
}

export default Adresse;
