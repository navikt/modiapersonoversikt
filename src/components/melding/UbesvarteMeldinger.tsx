import { Alert } from '@navikt/ds-react';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { erUbesvartHenvendelseFraBruker } from '../Meldinger/List/utils';

export const UbesvarteMeldinger = () => {
    const { data: traader } = useTraader();

    const antallUbesvarteTraader = traader?.filter((traad) => erUbesvartHenvendelseFraBruker(traad))?.length;

    if (!antallUbesvarteTraader) {
        return null;
    }

    return (
        <aside aria-label="Ubesvarte henvendelser">
            <Alert variant="warning" size="small" className="mt-1">
                Brukeren har {antallUbesvarteTraader}{' '}
                {antallUbesvarteTraader > 1 ? 'ubesvarte henvendelser' : 'ubesvart henvendelse'}
            </Alert>
        </aside>
    );
};
