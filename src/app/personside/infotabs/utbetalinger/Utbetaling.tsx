import * as React from 'react';
import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../components/common-styled-components';
import styled from 'styled-components';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser,
    periodeStringFromYtelse
}
    from './utbetalingerUtils';
import PrintKnapp from '../../../../components/PrintKnapp';
import { ReactNode } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface Props {
    utbetaling: Utbetaling;
}

const Opacity = styled.span`
  opacity: .7;
`;

function UndertekstGrå(props: { children: ReactNode }) {
    return <Undertekst><Opacity>{props.children}</Opacity></Undertekst>;
}

const UtbetalingStyle = styled.div`
  padding: .5rem 1.2rem;
`;

const EnkeltYtelseStyle = styled.div`
  margin-left: .5rem;
`;

const Luft = styled.div`
  margin-top: .5rem;
`;

function EnkeltYtelse({ytelse}: { ytelse: Ytelse }) {
    const periode = periodeStringFromYtelse(ytelse);
    return (
        <EnkeltYtelseStyle>
            <SpaceBetween>
                <UndertekstGrå><Bold>
                    {ytelse.type}
                </Bold></UndertekstGrå>
                <UndertekstGrå><Bold>
                    {formaterNOK(ytelse.nettobeløp)}
                </Bold></UndertekstGrå>
            </SpaceBetween>
            <UndertekstGrå>
                {periode}
            </UndertekstGrå>
        </EnkeltYtelseStyle>
    );
}

const YtelsesListe = styled.div`
  margin-top: 1rem;
  > * {
    margin-top: .2rem;
  }
`;

function Utbetaling({utbetaling}: Props) {
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }
    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
    const sum = formaterNOK(getNettoSumYtelser(utbetaling.ytelser));
    const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
        ? `Forfallsdato: ${dato}` : null;
    const tittel = utbetaling.ytelser.length > 1 ? 'Diverse ytelser' : utbetaling.ytelser[0].type;

    return (
        <UtbetalingStyle>
            <SpaceBetween>
                <UndertekstGrå>
                    {dato} / <Bold>{utbetaling.status}</Bold>
                </UndertekstGrå>
                <PrintKnapp onClick={() => console.log('ikke implementert')}/>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold tag={'h4'}>{tittel}</UndertekstBold>
                <UndertekstBold>{sum}</UndertekstBold>
            </SpaceBetween>

            {utbetaling.ytelser.length === 1
                ? <SpaceBetween>
                    <UndertekstGrå>{periodeStringFromYtelse(utbetaling.ytelser[0])}</UndertekstGrå>
                    <UndertekstGrå>{forfallsInfo}</UndertekstGrå>
                </SpaceBetween>
                : <SpaceBetween>
                    <div/>
                    <UndertekstGrå>{forfallsInfo}</UndertekstGrå>
                </SpaceBetween>
            }

                <Luft/>
            <UndertekstGrå>Utbetaling til: {utbetaling.utbetaltTil}</UndertekstGrå>

            {utbetaling.ytelser.length > 1
                ? <YtelsesListe>
                    {utbetaling.ytelser.map((ytelse, index) => <EnkeltYtelse ytelse={ytelse} key={index}/>)}
                </YtelsesListe>
                : null}

        </UtbetalingStyle>
    );
}

export default Utbetaling;
