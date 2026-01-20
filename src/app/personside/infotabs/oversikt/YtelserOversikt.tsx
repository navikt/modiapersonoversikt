import { capitalize } from 'lodash';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { type ReactNode, useEffect } from 'react';
import { useInfotabsDyplenker } from 'src/app/personside/infotabs/dyplenker';
import { ytelserTest } from 'src/app/personside/infotabs/dyplenkeTest/utils-dyplenker-test';
import useBrukersYtelserMarkup from 'src/app/personside/infotabs/ytelser/useBrukersYtelserMarkup';
import { CenteredLazySpinner } from 'src/components/LazySpinner';
import VisMerKnapp from 'src/components/VisMerKnapp';
import type { ForeldrepengerFpSak, Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import { getArbeidsavklaringspengerIdDato } from 'src/models/ytelse/arbeidsavklaringspenger';
import { type Foreldrepengerettighet, getForeldepengerIdDato } from 'src/models/ytelse/foreldrepenger';
import { getForeldrepengerFpSakIdDato } from 'src/models/ytelse/foreldrepenger-fpsak';
import { getPensjonIdDato, getUnikPensjonKey, type Pensjon } from 'src/models/ytelse/pensjon';
import type { Pleiepengerettighet } from 'src/models/ytelse/pleiepenger';
import { getSykepengerIdDato, type Sykepenger } from 'src/models/ytelse/sykepenger';
import { getSykepengerSpokelseIdDato } from 'src/models/ytelse/sykepenger-spokelse';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey, type Tiltakspenger } from 'src/models/ytelse/tiltakspenger';
import { getUnikYtelseKey } from 'src/models/ytelse/ytelse-utils';
import theme from 'src/styles/personOversiktTheme';
import { trackingEvents } from 'src/utils/analytics';
import { usePrevious } from 'src/utils/customHooks';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';

const YtelserStyle = styled.div`
  > *:not(:first-child) {
    border-top: ${theme.border.skille};
  }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

const umamiEvent = {
    name: trackingEvents.detaljvisningKlikket,
    data: {
        fane: 'oversikt',
        tekst: 'vis ytelse'
    }
};

function YtelserOversikt(props: Props) {
    const { ytelserMarkup, pending, feilmeldinger, harFeil } = useBrukersYtelserMarkup({
        renderPleiepenger: (pleiepenger) => (
            <PleiepengerKomponent pleiepenger={pleiepenger} key={getUnikYtelseKey(pleiepenger)} />
        ),
        renderForeldrepenger: (foreldrepenger) => (
            <ForeldrepengerKomponent foreldrepenger={foreldrepenger} key={getUnikYtelseKey(foreldrepenger)} />
        ),
        renderSykepenger: (sykepenger) => (
            <SykepengerKomponent sykepenger={sykepenger} key={getUnikYtelseKey(sykepenger)} />
        ),
        renderSykepengerSpokelse: (ytelse) => <SykepengerSpokelseKomponent sykepenger={ytelse} />,
        renderTiltakspenger: (tiltakspenger) => (
            <TiltakspengerKomponent tiltakspenger={tiltakspenger} key={getUnikTiltakspengerKey(tiltakspenger)} />
        ),
        renderPensjon: (pensjon) => <PensjonKomponent pensjon={pensjon} key={getUnikPensjonKey(pensjon)} />,
        renderArbeidsavklaringspenger: (aap) => <ArbeidsavklaringspengerKomponent aap={aap} />,
        renderForeldrepengerFpSak: (ytelse) => <ForeldrepengerFpSakKomponent ytelse={ytelse} />
    });

    const ytelserListe = ytelserMarkup.slice(0, 2);

    const prevAntallYtelser = usePrevious(ytelserMarkup.length);
    useEffect(() => {
        const antallYtelser = ytelserMarkup.length;
        if (prevAntallYtelser !== antallYtelser) {
            props.setHeaderContent(
                <Normaltekst>
                    {ytelserListe.length} / {antallYtelser}
                </Normaltekst>
            );
        }
    }, [ytelserMarkup, ytelserListe, props, prevAntallYtelser]);

    return (
        <YtelserStyle>
            {ytelserListe}
            {!pending && !harFeil && ytelserMarkup.length === 0 && (
                <AlertStripeInfo>
                    Det finnes ikke foreldrepenger, sykepenger eller pleiepenger for brukeren
                </AlertStripeInfo>
            )}
            {pending ? <CenteredLazySpinner padding={theme.margin.layout} /> : feilmeldinger}
        </YtelserStyle>
    );
}

function PleiepengerKomponent(props: { pleiepenger: Pleiepengerettighet }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.pleiepenger)}
            valgt={false}
            ariaDescription="Vis pleiepenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Element>Pleiepenger sykt barn</Element>
            <Normaltekst>Barnets f.nr: {props.pleiepenger.barnet}</Normaltekst>
        </VisMerKnapp>
    );
}

function SykepengerKomponent(props: { sykepenger: Sykepenger }) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.sykepenger)}
            valgt={false}
            ariaDescription="Vis sykepenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(getSykepengerIdDato(props.sykepenger))}</Normaltekst>
            <Element>Sykepenger</Element>
            <Normaltekst>100% sykemeldt - Dokumentet Sykepenger behandlet i ny løsning inneholder maksdato</Normaltekst>
        </VisMerKnapp>
    );
}

function SykepengerSpokelseKomponent(props: { sykepenger: Utbetalingsperioder }) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.sykepenger)}
            valgt={false}
            ariaDescription="Vis sykepenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(getSykepengerSpokelseIdDato(props.sykepenger))}</Normaltekst>
            <Element>Sykepenger</Element>
        </VisMerKnapp>
    );
}

function ForeldrepengerKomponent(props: { foreldrepenger: Foreldrepengerettighet }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.foreldrepenger)}
            valgt={false}
            ariaDescription="Vis foreldrepenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(getForeldepengerIdDato(props.foreldrepenger))}</Normaltekst>
            <Element>Foreldrepenger</Element>
            <Normaltekst>
                {props.foreldrepenger.dekningsgrad}% dekningsgrad - Maksdato{' '}
                {props.foreldrepenger.slutt ? formaterDato(props.foreldrepenger.slutt) : 'ikke tilgjengelig'}
            </Normaltekst>
        </VisMerKnapp>
    );
}

function TiltakspengerKomponent(props: { tiltakspenger: Tiltakspenger }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.tiltakspenger)}
            valgt={false}
            ariaDescription="Vis tiltakspenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(getTiltakspengerIdDato(props.tiltakspenger))}</Normaltekst>
            <Element>Tiltakspenger</Element>
            <Normaltekst>
                {formaterDato(props.tiltakspenger.periode.fraOgMed)} -{' '}
                {formaterDato(props.tiltakspenger.periode.tilOgMed)}
                {': '}
                {props.tiltakspenger.barnetillegg?.perioder &&
                    `(Antall barn: ${props.tiltakspenger.barnetillegg.perioder.map((p) => `${p.antallBarn}, `)})`}
            </Normaltekst>
        </VisMerKnapp>
    );
}

function PensjonKomponent(props: { pensjon: Pensjon }) {
    const dyplenker = useInfotabsDyplenker();
    const fom = getPensjonIdDato(props.pensjon) ?? '';
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.pensjon)}
            valgt={false}
            ariaDescription="Vis pensjon"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(fom)}</Normaltekst>
            <Element>Pensjon</Element>
            <Normaltekst>
                {props.pensjon.fomDato ? formaterDato(props.pensjon.fomDato) : ''} -{' '}
                {props.pensjon.tomDato ? formaterDato(props.pensjon.tomDato) : ''}
                {': '}
                {`Type: ${props.pensjon.sakType ?? ''}`}
            </Normaltekst>
        </VisMerKnapp>
    );
}

function ArbeidsavklaringspengerKomponent(props: { aap: Arbeidsavklaringspenger }) {
    const dyplenker = useInfotabsDyplenker();
    const fomId = getArbeidsavklaringspengerIdDato(props.aap);
    const fom = props.aap.periode.fraOgMedDato;
    const tom = props.aap.periode.tilOgMedDato;
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.aap)}
            valgt={false}
            ariaDescription="Vis arbeidsavklaringspenger"
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(fomId)}</Normaltekst>
            <Element>Arbeidsavklaringspenger</Element>
            <Normaltekst>
                {fom ? formaterDato(fom) : ''} - {tom ? formaterDato(tom) : ''}
            </Normaltekst>
        </VisMerKnapp>
    );
}
function ForeldrepengerFpSakKomponent(props: { ytelse: ForeldrepengerFpSak }) {
    const dyplenker = useInfotabsDyplenker();
    const fomId = getForeldrepengerFpSakIdDato(props.ytelse);
    const fom = props.ytelse.fom;
    const tom = props.ytelse.tom;
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.ytelse)}
            valgt={false}
            ariaDescription={`Vis ${props.ytelse.ytelse.toLowerCase()}`}
            className={ytelserTest.oversikt}
            umamiEvent={umamiEvent}
        >
            <Normaltekst>ID dato: {formaterDato(fomId)}</Normaltekst>
            <Element>{capitalize(props.ytelse.ytelse)}</Element>
            <Normaltekst>
                {fom ? formaterDato(fom) : ''} - {tom ? formaterDato(tom) : ''}
            </Normaltekst>
        </VisMerKnapp>
    );
}

export default YtelserOversikt;
