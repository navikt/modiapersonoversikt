import { Detail } from '@navikt/ds-react';
import { hentPeriodeTekst } from '../utils';

type Props = {
    from?: string;
    to?: string;
};

function ValidPeriod({ from, to }: Props) {
    if (!from && !to) {
        return null;
    }

    return <Detail textColor="subtle">Gyldig: {hentPeriodeTekst(from, to)}</Detail>;
}

export default ValidPeriod;
