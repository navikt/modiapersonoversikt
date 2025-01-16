import { BodyShort } from '@navikt/ds-react';
import { hentPeriodeTekst } from '../utils';

type Props = {
    from?: string;
    to?: string;
};

function ValidPeriod({ from, to }: Props) {
    if (!from && !to) {
        return null;
    }

    return (
        <BodyShort textColor="subtle" size="small">
            Gyldig: {hentPeriodeTekst(from, to)}
        </BodyShort>
    );
}

export default ValidPeriod;
