import { Alert, BodyShort } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { InfoElement, LastChanged } from '../components';

interface Props {
    harFeilendeSystem: boolean;
    telefonnummer: PersonData['telefonnummer'];
}

function Telefon(props: { telefonnummer: PersonData['telefonnummer'][0] }) {
    const formatertNummer = formaterMobiltelefonnummer(props.telefonnummer.identifikator);
    const retningsnummmer = props.telefonnummer.retningsnummer ? props.telefonnummer.retningsnummer.kode : '';
    return (
        <>
            <BodyShort size="small">{`${retningsnummmer} ${formatertNummer}`}</BodyShort>
            <LastChanged sistEndret={props.telefonnummer.sistEndret} />
        </>
    );
}

function NavKontaktinfo({ harFeilendeSystem, telefonnummer }: Props) {
    if (harFeilendeSystem) {
        return (
            <InfoElement title="Telefon til bruk for NAV">
                <Alert variant="warning">Feilet ved uthenting av kontaktinformasjon</Alert>
            </InfoElement>
        );
    }
    if (telefonnummer.isEmpty()) {
        return null;
    }

    return (
        <InfoElement title="Telefon til bruk for NAV">
            {telefonnummer
                .sort((nr1, nr2) => nr1.prioritet - nr2.prioritet)
                .map((telefonnummer) => (
                    <Telefon telefonnummer={telefonnummer} key={telefonnummer.identifikator} />
                ))}
        </InfoElement>
    );
}

export default NavKontaktinfo;
