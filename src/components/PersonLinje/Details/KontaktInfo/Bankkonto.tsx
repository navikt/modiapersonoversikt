import { BankNoteIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { FormatertKontonummer } from 'src/utils/FormatertKontonummer';
import { InfoElement, LastChanged } from '../components';

interface Props {
    harFeilendeSystem: boolean;
    bankkonto: PersonData['bankkonto'];
}

function BankkontoBody({ harFeilendeSystem, bankkonto }: Props) {
    if (harFeilendeSystem) {
        return <Alert variant="warning">Feilet ved uthenting av kontonummer</Alert>;
    }

    if (!bankkonto) {
        return <BodyShort size="small">Ikke registrert</BodyShort>;
    }

    return (
        <>
            <BodyShort size="small">
                <FormatertKontonummer kontonummer={bankkonto.kontonummer} />
            </BodyShort>
            <LastChanged sistEndret={bankkonto.sistEndret} />
        </>
    );
}

function Bankkonto({ bankkonto, harFeilendeSystem }: Props) {
    const title = bankkonto?.landkode && bankkonto.landkode.kode !== 'NOR' ? 'Kontonummer utland' : 'Kontonummer';
    return (
        <InfoElement title={title} icon={<BankNoteIcon />}>
            <BankkontoBody bankkonto={bankkonto} harFeilendeSystem={harFeilendeSystem} />
        </InfoElement>
    );
}

export default Bankkonto;
