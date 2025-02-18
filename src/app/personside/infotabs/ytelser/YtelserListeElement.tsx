import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getPensjonIdDato, getUnikPensjonKey } from 'src/models/ytelse/pensjon';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { getForeldepengerIdDato, getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import { getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey } from '../../../../models/ytelse/tiltakspenger';
import {
    type Ytelse,
    getYtelseIdDato,
    isForeldrepenger,
    isPensjon,
    isPleiepenger,
    isSykepenger,
    isTiltakspenger
} from '../../../../models/ytelse/ytelse-utils';
import { formaterDato } from '../../../../utils/string-utils';
import { useInfotabsDyplenker } from '../dyplenker';

interface Props {
    ytelse: Ytelse;
    erValgt: boolean;
}

function YtelserListeElement(props: Props) {
    const dypLenker = useInfotabsDyplenker();

    if (isPleiepenger(props.ytelse)) {
        return (
            <li key={getUnikPleiepengerKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikPleiepengerKey(props.ytelse)}
                    ariaDescription="Vis pleiepenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                >
                    <Undertittel tag={'h3'}>Pleiepenger sykt barn</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{formaterDato(getYtelseIdDato(props.ytelse))}</Normaltekst>
                    <Element>Barnets f.nr: </Element>
                    <Normaltekst>{props.ytelse.barnet}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isSykepenger(props.ytelse)) {
        return (
            <li key={getUnikSykepengerKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikSykepengerKey(props.ytelse)}
                    ariaDescription="Vis sykepenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                >
                    <Undertittel tag={'h3'}>Sykepengerrettighet</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{formaterDato(getYtelseIdDato(props.ytelse))}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isForeldrepenger(props.ytelse)) {
        return (
            <li key={getUnikForeldrepengerKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikForeldrepengerKey(props.ytelse)}
                    ariaDescription="Vis foreldrepenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                >
                    <Undertittel tag={'h3'}>Foreldrepenger</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{formaterDato(getForeldepengerIdDato(props.ytelse))}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isTiltakspenger(props.ytelse)) {
        return (
            <li key={getUnikTiltakspengerKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikTiltakspengerKey(props.ytelse)}
                    ariaDescription="Vis tiltakspenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                >
                    <Undertittel tag={'h3'}>Tiltakspenger</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{formaterDato(getTiltakspengerIdDato(props.ytelse))}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isPensjon(props.ytelse)) {
        const fom = getPensjonIdDato(props.ytelse);
        return (
            <li key={getUnikPensjonKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikPensjonKey(props.ytelse)}
                    ariaDescription="Vis pensjon"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                >
                    <Undertittel tag={'h3'}>Pensjon</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{fom ? formaterDato(fom) : ''}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    return null;
}

export default YtelserListeElement;
