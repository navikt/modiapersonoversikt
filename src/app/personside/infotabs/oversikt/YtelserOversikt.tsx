import * as React from 'react';
import { ReactNode, useEffect } from 'react';
import { getSykepengerIdDato, Sykepenger } from '../../../../models/ytelse/sykepenger';
import { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet, getForeldepengerIdDato } from '../../../../models/ytelse/foreldrepenger';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import useBrukersYtelserMarkup from '../ytelser/useBrukersYtelserMarkup';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useInfotabsDyplenker } from '../dyplenker';
import { ytelserTest } from '../dyplenkeTest/utils-dyplenker-test';
import { formaterDato } from '../../../../utils/stringFormatting';
import { usePrevious } from '../../../../utils/customHooks';
import { getUnikYtelseKey } from '../../../../models/ytelse/ytelse-utils';

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
        renderPleiepenger: pleiepenger => (
            <PleiepengerKomponent pleiepenger={pleiepenger} key={getUnikYtelseKey(pleiepenger)} />
        ),
        renderForeldrepenger: foreldrepenger => (
            <ForeldrepengerKomponent foreldrepenger={foreldrepenger} key={getUnikYtelseKey(foreldrepenger)} />
        ),
        renderSykepenger: sykepenger => (
            <SykepengerKomponent sykepenger={sykepenger} key={getUnikYtelseKey(sykepenger)} />
        )
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
            <Normaltekst>
                100% sykemeldt - Maksdato{' '}
                {props.sykepenger.slutt ? formaterDato(props.sykepenger.slutt) : 'ikke tilgjenglig'}
            </Normaltekst>
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

export default YtelserOversikt;
