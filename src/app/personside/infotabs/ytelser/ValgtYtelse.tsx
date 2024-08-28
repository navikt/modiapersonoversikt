import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import {
    isForeldrepenger,
    isPleiepenger,
    isSykepenger,
    isTiltakspenger,
    Ytelse
} from '../../../../models/ytelse/ytelse-utils';
import Foreldrepenger from './foreldrepenger/ForeldrePenger';
import Pleiepenger from './pleiepenger/Pleiepenger';
import Sykepenger from './sykepenger/Sykepenger';
import Tiltakspenger from './tiltakspenger/Tiltakspenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { usePrevious } from '../../../../utils/customHooks';
import { useEffect } from 'react';
import { loggError } from '../../../../utils/logger/frontendLogger';

interface Props {
    valgtYtelse?: Ytelse;
}

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
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
    if (isTiltakspenger(props.ytelse)) {
        return <Tiltakspenger tiltakspenger={props.ytelse} />;
    }
    loggError(new Error('Ytelse ikke håndtert, kunne ikke finne markup'));
    return null;
}

function ValgtYtelse(props: Props) {
    const tittelRef = useRef<HTMLHeadingElement>(null);
    const prevYtelse = usePrevious(props.valgtYtelse);

    useEffect(
        function focusVedNyYtelse() {
            if (!props.valgtYtelse || !prevYtelse) {
                return;
            }
            if (prevYtelse !== props.valgtYtelse) {
                tittelRef.current && tittelRef.current.focus();
            }
        },
        [props.valgtYtelse, prevYtelse, tittelRef]
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
            <YtelseMarkup ytelse={props.valgtYtelse} />
        </Styling>
    );
}

export default ValgtYtelse;
