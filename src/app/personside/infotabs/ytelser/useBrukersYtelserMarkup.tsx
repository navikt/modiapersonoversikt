import type { ReactNode } from 'react';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import type { Pensjon } from 'src/models/ytelse/pensjon';
import type { Foreldrepengerettighet } from '../../../../models/ytelse/foreldrepenger';
import type { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import type { Sykepenger } from '../../../../models/ytelse/sykepenger';
import type { Tiltakspenger } from '../../../../models/ytelse/tiltakspenger';
import {
    isArbeidsavklaringspenger,
    isForeldrepenger,
    isPensjon,
    isPleiepenger,
    isSykepenger,
    isTiltakspenger
} from '../../../../models/ytelse/ytelse-utils';
import { PeriodeValg } from '../../../../redux/utbetalinger/types';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { getFraDateFromPeriod } from '../utbetalinger/utils/utbetalinger-utils';
import useBrukersYtelser from './useBrukersYtelser';

interface Props {
    renderPleiepenger: (pleiepenger: Pleiepengerettighet) => ReactNode;
    renderSykepenger: (sykepenger: Sykepenger) => ReactNode;
    renderForeldrepenger: (foreldrepenger: Foreldrepengerettighet) => ReactNode;
    renderTiltakspenger: (tiltakspenger: Tiltakspenger) => ReactNode;
    renderPensjon: (pensjon: Pensjon) => ReactNode;
    renderArbeidsavklaringspenger: (aap: Arbeidsavklaringspenger) => ReactNode;
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
        if (isPensjon(ytelse)) {
            return props.renderPensjon(ytelse);
        }
        if (isArbeidsavklaringspenger(ytelse)) {
            return props.renderArbeidsavklaringspenger(ytelse);
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
