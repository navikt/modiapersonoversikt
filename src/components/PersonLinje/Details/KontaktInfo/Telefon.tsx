import { PhoneIcon } from '@navikt/aksel-icons';
import { Alert } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import { InfoElement } from '../components';
import KRRInfo from './KRRInfo';

interface Props {
    harFeilendeSystem: boolean;
    kontaktinformasjon?: PersonData['kontaktInformasjon'];
}

function Telefon({ harFeilendeSystem, kontaktinformasjon }: Props) {
    if (harFeilendeSystem) {
        return (
            <InfoElement title="Telefon" icon={<PhoneIcon />}>
                <Alert variant="warning">Feilet ved uthenting av data fra Kontakt- og reservasjonsregisteret</Alert>
            </InfoElement>
        );
    }

    if (!kontaktinformasjon) {
        return null;
    }

    const telefonnummer = formaterMobiltelefonnummer(kontaktinformasjon.mobil?.value ?? '');
    const sistOppdatert = kontaktinformasjon.mobil?.sistOppdatert
        ? formaterDato(kontaktinformasjon.mobil.sistOppdatert)
        : null;

    return (
        <InfoElement title="Telefon" icon={<PhoneIcon />}>
            <KRRInfo
                erReservert={kontaktinformasjon.erReservert}
                kontaktinformasjonVerdi={telefonnummer}
                sistOppdatert={sistOppdatert}
            />
        </InfoElement>
    );
}

export default Telefon;
