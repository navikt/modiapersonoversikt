import { HStack, Link } from '@navikt/ds-react';
import useUrlNyPersonforvalter from 'src/app/brukerprofil/useUrlNyPersonforvalter';

function PdlLenke({ utenBunnpadding = false }: { utenBunnpadding?: boolean }) {
    const personforvalterUrl = useUrlNyPersonforvalter();
    return (
        <HStack justify="end" align="end" flexGrow="1" className={utenBunnpadding ? undefined : 'pb-12'}>
            <Link href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                Endre personopplysninger
            </Link>
        </HStack>
    );
}

export default PdlLenke;
