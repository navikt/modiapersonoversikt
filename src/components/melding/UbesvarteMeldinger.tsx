import { Alert } from '@navikt/ds-react';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { erUbesvartHenvendelseFraBruker } from '../Meldinger/List/utils';

export const UbesvarteMeldinger = () => {
    const { data: traader } = useMeldinger();

    const antallUbesvarteTraader = traader?.filter((traad) => erUbesvartHenvendelseFraBruker(traad))?.length;

    if (!antallUbesvarteTraader) {
        return null;
    }

    return (
        <Alert variant="warning" size="small">
            Brukeren har {antallUbesvarteTraader}{' '}
            {antallUbesvarteTraader > 1 ? 'ubesvarte henvendelser' : 'ubesvart henvendelse'}
        </Alert>
    );
};
