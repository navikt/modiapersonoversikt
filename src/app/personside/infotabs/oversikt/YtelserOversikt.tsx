import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { type ReactNode, useEffect } from 'react';
import { type Pensjon, getPensjonIdDato, getUnikPensjonKey } from 'src/models/ytelse/pensjon';
import styled from 'styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { type Foreldrepengerettighet, getForeldepengerIdDato } from '../../../../models/ytelse/foreldrepenger';
import type { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { type Sykepenger, getSykepengerIdDato } from '../../../../models/ytelse/sykepenger';
import {
    type Tiltakspenger,
    getTiltakspengerIdDato,
    getUnikTiltakspengerKey
} from '../../../../models/ytelse/tiltakspenger';
import { getUnikYtelseKey } from '../../../../models/ytelse/ytelse-utils';
import theme from '../../../../styles/personOversiktTheme';
import { usePrevious } from '../../../../utils/customHooks';
import { formaterDato } from '../../../../utils/string-utils';
import { ytelserTest } from '../dyplenkeTest/utils-dyplenker-test';
import { useInfotabsDyplenker } from '../dyplenker';
import useBrukersYtelserMarkup from '../ytelser/useBrukersYtelserMarkup';

const YtelserStyle = styled.div`
  > *:not(:first-child) {
    border-top: ${theme.border.skille};
  }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

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
        renderTiltakspenger: (tiltakspenger) => (
            <TiltakspengerKomponent tiltakspenger={tiltakspenger} key={getUnikTiltakspengerKey(tiltakspenger)} />
        ),
        renderPensjon: (pensjon) => <PensjonKomponent pensjon={pensjon} key={getUnikPensjonKey(pensjon)} />
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
        >
            <Normaltekst>ID dato: {formaterDato(getSykepengerIdDato(props.sykepenger))}</Normaltekst>
            <Element>Sykepenger</Element>
            <Normaltekst>100% sykemeldt - Dokumentet Sykepenger behandlet i ny løsning inneholder maksdato</Normaltekst>
        </VisMerKnapp>
    );
}

function ForeldrepengerKomponent(props: {
    foreldrepenger: Foreldrepengerettighet;
}) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(props.foreldrepenger)}
            valgt={false}
            ariaDescription="Vis foreldrepenger"
            className={ytelserTest.oversikt}
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
        >
            <Normaltekst>ID dato: {formaterDato(fom)}</Normaltekst>
            <Element>Pensjon</Element>
            <Normaltekst>
                {props.pensjon.fom ? formaterDato(props.pensjon.fom) : ''} -{' '}
                {props.pensjon.tom ? formaterDato(props.pensjon.tom) : ''}
                {': '}
                {`Type: ${props.pensjon.type ? props.pensjon.type.decode : ''}`}
            </Normaltekst>
        </VisMerKnapp>
    );
}

export default YtelserOversikt;
