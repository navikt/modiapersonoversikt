import { capitalize } from 'lodash';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VisMerKnapp from 'src/components/VisMerKnapp';
import {
    getArbeidsavklaringspengerIdDato,
    getUnikArbeidsavklaringspengerKey
} from 'src/models/ytelse/arbeidsavklaringspenger';
import { getForeldepengerIdDato, getUnikForeldrepengerKey } from 'src/models/ytelse/foreldrepenger';
import { getForeldrepengerFpSakIdDato, getUnikForeldrepengerFpSakKey } from 'src/models/ytelse/foreldrepenger-fpsak';
import { getPensjonIdDato, getUnikPensjonKey } from 'src/models/ytelse/pensjon';
import { getUnikPleiepengerKey } from 'src/models/ytelse/pleiepenger';
import { getUnikSykepengerKey } from 'src/models/ytelse/sykepenger';
import { getSykepengerSpokelseIdDato, getUnikSykepengerSpokelseKey } from 'src/models/ytelse/sykepenger-spokelse';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey } from 'src/models/ytelse/tiltakspenger';
import {
    getYtelseIdDato,
    isArbeidsavklaringspenger,
    isForeldrePengerFpSak,
    isForeldrepenger,
    isPensjon,
    isPleiepenger,
    isSykepenger,
    isSykepengerSpokelse,
    isTiltakspenger,
    type Ytelse
} from 'src/models/ytelse/ytelse-utils';
import { trackingEvents } from 'src/utils/analytics';
import { formaterDato } from 'src/utils/string-utils';
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
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'pleiepenger' }
                    }}
                >
                    <Undertittel tag="h3">Pleiepenger sykt barn</Undertittel>
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
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'sykepenger' }
                    }}
                >
                    <Undertittel tag="h3">Sykepengerrettighet</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{formaterDato(getYtelseIdDato(props.ytelse))}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isSykepengerSpokelse(props.ytelse)) {
        const fom = getSykepengerSpokelseIdDato(props.ytelse);

        return (
            <li key={getUnikSykepengerSpokelseKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikSykepengerSpokelseKey(props.ytelse)}
                    ariaDescription="Vis sykepenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'sykepenger' }
                    }}
                >
                    <Undertittel tag="h3">Sykepenger</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{fom ? formaterDato(fom) : ''}</Normaltekst>
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
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'foreldrepenger' }
                    }}
                >
                    <Undertittel tag="h3">Foreldrepenger</Undertittel>
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
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'tiltakspenger' }
                    }}
                >
                    <Undertittel tag="h3">Tiltakspenger</Undertittel>
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
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'pensjon' }
                    }}
                >
                    <Undertittel tag="h3">Pensjon</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{fom ? formaterDato(fom) : ''}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isArbeidsavklaringspenger(props.ytelse)) {
        const fom = getArbeidsavklaringspengerIdDato(props.ytelse);
        return (
            <li key={getUnikArbeidsavklaringspengerKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikArbeidsavklaringspengerKey(props.ytelse)}
                    ariaDescription="Vis arbeidsavklaringspenger"
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: 'arbeidsavklaringspenger' }
                    }}
                >
                    <Undertittel tag="h3">Arbeidsavklaringspenger</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{fom ? formaterDato(fom) : ''}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    if (isForeldrePengerFpSak(props.ytelse)) {
        const fom = getForeldrepengerFpSakIdDato(props.ytelse);

        return (
            <li key={getUnikForeldrepengerFpSakKey(props.ytelse)}>
                <VisMerKnapp
                    key={getUnikForeldrepengerFpSakKey(props.ytelse)}
                    ariaDescription={`Vis ${props.ytelse.ytelse.toLowerCase()}`}
                    valgt={props.erValgt}
                    linkTo={dypLenker.ytelser.link(props.ytelse)}
                    umamiEvent={{
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: props.ytelse.ytelse.toLowerCase() }
                    }}
                >
                    <Undertittel tag="h3">{capitalize(props.ytelse.ytelse)}</Undertittel>
                    <Element>ID-dato</Element>
                    <Normaltekst>{fom ? formaterDato(fom) : ''}</Normaltekst>
                </VisMerKnapp>
            </li>
        );
    }

    return null;
}

export default YtelserListeElement;
