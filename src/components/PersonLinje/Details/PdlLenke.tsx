import { HStack, Link } from '@navikt/ds-react';
import useUrlNyPersonforvalter from 'src/app/brukerprofil/useUrlNyPersonforvalter';

function PdlLenke() {
    const personforvalterUrl = useUrlNyPersonforvalter();
    return (
        <HStack justify="end" align="end" flexGrow="1" className="pb-12">
            <Link href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                Endre personopplysninger
            </Link>
        </HStack>
    );
}

export default PdlLenke;
