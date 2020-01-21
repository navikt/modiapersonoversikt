import * as React from 'react';
import {
    getYtelseIdDato,
    isForeldrepenger,
    isPleiepenger,
    isSykepenger,
    Ytelse
} from '../../../../models/ytelse/ytelse-utils';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../utils/stringFormatting';
import { getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getForeldepengerIdDato, getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import { useInfotabsDyplenker } from '../dyplenker';

interface Props {
    ytelse: Ytelse;
}

function YtelserListeElement(props: Props) {
    const dypLenker = useInfotabsDyplenker();

    if (isPleiepenger(props.ytelse)) {
        return (
            <VisMerKnapp
                key={getUnikPleiepengerKey(props.ytelse)}
                ariaDescription="Vis pleiepenger"
                valgt={dypLenker.ytelser.erValgt(props.ytelse)}
                linkTo={dypLenker.ytelser.link(props.ytelse)}
            >
                <Undertittel>Pleiepenger sykt barn</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getYtelseIdDato(props.ytelse))}</Normaltekst>
            </VisMerKnapp>
        );
    }

    if (isSykepenger(props.ytelse)) {
        return (
            <VisMerKnapp
                key={getUnikSykepengerKey(props.ytelse)}
                ariaDescription="Vis sykepenger"
                valgt={dypLenker.ytelser.erValgt(props.ytelse)}
                linkTo={dypLenker.ytelser.link(props.ytelse)}
            >
                <Undertittel>Sykepengerrettighet</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getYtelseIdDato(props.ytelse))}</Normaltekst>
            </VisMerKnapp>
        );
    }

    if (isForeldrepenger(props.ytelse)) {
        return (
            <VisMerKnapp
                key={getUnikForeldrepengerKey(props.ytelse)}
                ariaDescription="Vis foreldrepenger"
                valgt={dypLenker.ytelser.erValgt(props.ytelse)}
                linkTo={dypLenker.ytelser.link(props.ytelse)}
            >
                <Undertittel>Foreldrepenger</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getForeldepengerIdDato(props.ytelse))}</Normaltekst>
            </VisMerKnapp>
        );
    }

    return null;
}

export default YtelserListeElement;
