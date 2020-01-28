import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components/macro';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { isForeldrepenger, isPleiepenger, isSykepenger, Ytelse } from '../../../../models/ytelse/ytelse-utils';
import Foreldrepenger from './foreldrepenger/ForeldrePenger';
import Pleiepenger from './pleiepenger/Pleiepenger';
import Sykepenger from './sykepenger/Sykepenger';
import { loggError } from '../../../../utils/frontendLogger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { useInfotabsDyplenker } from '../dyplenker';
import useBrukersYtelser from './useBrukersYtelser';
import { usePrevious } from '../../../../utils/customHooks';
import { useEffect } from 'react';

interface Props {
    valgtYtelse?: Ytelse;
}

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    padding: ${theme.margin.layout};
`;

function YtelseMarkup(props: { ytelse: Ytelse }) {
    if (isForeldrepenger(props.ytelse)) {
        return <Foreldrepenger foreldrepenger={props.ytelse} />;
    }
    if (isPleiepenger(props.ytelse)) {
        return <Pleiepenger pleiepenger={props.ytelse} />;
    }
    if (isSykepenger(props.ytelse)) {
        return <Sykepenger sykepenger={props.ytelse} />;
    }
    loggError(new Error('Ytelse ikke håndtert, kunne ikke finne markup'));
    return null;
}

function ValgtYtelse(props: Props) {
    const ytelser = useBrukersYtelser();
    const tittelRef = useRef<HTMLHeadingElement>(null);
    const dypLenker = useInfotabsDyplenker();
    const valgtYtelse = ytelser.ytelser.find(ytelse => dypLenker.ytelser.erValgt(ytelse));
    const prevYtelse = usePrevious(valgtYtelse);
    useEffect(
        function focusVedNyYtelse() {
            if (!valgtYtelse || !prevYtelse) {
                return;
            }
            if (prevYtelse !== valgtYtelse) {
                tittelRef.current && tittelRef.current.focus();
            }
        },
        [valgtYtelse, prevYtelse, tittelRef]
    );

    const titleId = useRef(guid());
    if (!props.valgtYtelse) {
        return <AlertStripeInfo>Fant ingen ytelser for bruker</AlertStripeInfo>;
    }

    return (
        <Styling>
            <h2 className="sr-only" id={titleId.current} ref={tittelRef} tabIndex={-1}>
                Valgt ytelse
            </h2>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            <YtelseMarkup ytelse={props.valgtYtelse} />
        </Styling>
    );
}

export default ValgtYtelse;
