import { ReactNode } from 'react';
import { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Sykepenger } from '../../../../models/ytelse/sykepenger';
import { Foreldrepengerettighet } from '../../../../models/ytelse/foreldrepenger';
import { isForeldrepenger, isPleiepenger, isSykepenger, isTiltakspenger } from '../../../../models/ytelse/ytelse-utils';
import useBrukersYtelser from './useBrukersYtelser';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { Tiltakspenger } from '../../../../models/ytelse/tiltakspenger';
import { getFraDateFromPeriod } from '../utbetalinger/utils/utbetalinger-utils';
import { PeriodeValg } from '../../../../redux/utbetalinger/types';

interface Props {
    renderPleiepenger: (pleiepenger: Pleiepengerettighet) => ReactNode;
    renderSykepenger: (sykepenger: Sykepenger) => ReactNode;
    renderForeldrepenger: (foreldrepenger: Foreldrepengerettighet) => ReactNode;
    renderTiltakspenger: (tiltakspenger: Tiltakspenger) => ReactNode;
}

interface Returns {
    ytelserMarkup: ReactNode[];
    pending: boolean;
    feilmeldinger: ReactNode[];
    harFeil: boolean;
}

function useBrukersYtelserMarkup(props: Props): Returns {
    const brukersYtelser = useBrukersYtelser(getFraDateFromPeriod(PeriodeValg.EGENDEFINERT));

    const ytelserMarkup: ReactNode[] = brukersYtelser.ytelser.map((ytelse) => {
        if (isForeldrepenger(ytelse)) {
            return props.renderForeldrepenger(ytelse);
        }
        if (isSykepenger(ytelse)) {
            return props.renderSykepenger(ytelse);
        }
        if (isPleiepenger(ytelse)) {
            return props.renderPleiepenger(ytelse);
        }
        if (isTiltakspenger(ytelse)) {
            return props.renderTiltakspenger(ytelse);
        }
        loggError(new Error('Fant ikke rendermetode for ytelsen'));
        return null;
    });

    return {
        ytelserMarkup: ytelserMarkup,
        pending: brukersYtelser.pending,
        feilmeldinger: brukersYtelser.placeholders,
        harFeil: brukersYtelser.harFeil
    };
}

export default useBrukersYtelserMarkup;
