import { ReactNode } from 'react';
import { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Sykepenger } from '../../../../models/ytelse/sykepenger';
import { Foreldrepengerettighet } from '../../../../models/ytelse/foreldrepenger';
import { isForeldrepenger, isPleiepenger, isSykepenger } from '../../../../models/ytelse/ytelse-utils';
import useBrukersYtelser from './useBrukersYtelser';
import { loggError } from '../../../../utils/logger/frontendLogger';

interface Props {
    renderPleiepenger: (pleiepenger: Pleiepengerettighet) => ReactNode;
    renderSykepenger: (sykepenger: Sykepenger) => ReactNode;
    renderForeldrepenger: (foreldrepenger: Foreldrepengerettighet) => ReactNode;
}

interface Returns {
    ytelserMarkup: ReactNode[];
    pending: boolean;
    feilmeldinger: ReactNode[];
}

function useBrukersYtelserMarkup(props: Props): Returns {
    const brukersYtelser = useBrukersYtelser();

    const ytelserMarkup: ReactNode[] = brukersYtelser.ytelser.map(ytelse => {
        if (isForeldrepenger(ytelse)) {
            return props.renderForeldrepenger(ytelse);
        }
        if (isSykepenger(ytelse)) {
            return props.renderSykepenger(ytelse);
        }
        if (isPleiepenger(ytelse)) {
            return props.renderPleiepenger(ytelse);
        }
        loggError(new Error('Fant ikke rendermetode for ytelsen'));
        return null;
    });

    return {
        ytelserMarkup: ytelserMarkup,
        pending: brukersYtelser.pending,
        feilmeldinger: brukersYtelser.feilmeldinger
    };
}

export default useBrukersYtelserMarkup;
