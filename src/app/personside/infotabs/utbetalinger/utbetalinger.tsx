import * as React from 'react';
import { UtbetalingerResponse, Ytelse } from '../../../../models/utbetalinger';
import { EtikettLiten, Undertekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { formaterDato } from '../../../../utils/dateUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

type Props = UtbetalingerResponse;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  > *:first-child {
    flex: 1 0 100%;
    text-align: center;
  }
  > *:not(:first-child) {
    flex: 1 0 12em;
  }
`;

const Utbetaling = styled.div`
  margin: .5em;
  padding: .5em;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: .1em;
`;

function lagYtelserInfo(ytelser: Ytelse[]) {
    return ytelser.map((ytelse, index) => ( // TODO ikke bruke index som id her
        <div key={index}>
            <br/>
            <EtikettLiten>Ytelse</EtikettLiten>
            <Undertekst>{ytelse.type}</Undertekst>
            <Undertekst>Beløp: {ytelse.nettobeløp},-</Undertekst>
            <Undertekst>
                {formaterDato(ytelse.periode.start)} - {formaterDato(ytelse.periode.slutt)}
            </Undertekst>
        </div>
    ));
}

function lagUtbetalingsinfo(props: Props) {
    if (props.utbetalinger) {
        return props.utbetalinger.map((utbetaling, index) => ( // TODO ikke bruke index som id her
            <Utbetaling key={index}>
                <Undertittel>Utbetaling</Undertittel>
                <Undertekst>{utbetaling.metode}</Undertekst>
                <Undertekst>{utbetaling.status}</Undertekst>
                <Undertekst>Postert: {formaterDato(utbetaling.posteringsdato)}</Undertekst>
                {
                    utbetaling.utbetalingsdato
                        ? <Undertekst>Utbetalt: {formaterDato(utbetaling.utbetalingsdato)}</Undertekst> : null
                }
                {
                    utbetaling.forfallsdato
                        ? <Undertekst>Forfall: {formaterDato(utbetaling.forfallsdato)}</Undertekst> : null
                }
                <Undertekst>Beløp: {utbetaling.nettobeløp},-</Undertekst>
                <Undertekst>{utbetaling.utbetaltTil}</Undertekst>
                <Undertekst>{utbetaling.melding}</Undertekst>
                <Undertekst>Kontonr: {utbetaling.konto}</Undertekst>
                {utbetaling.ytelser ? lagYtelserInfo(utbetaling.ytelser) : null}
            </Utbetaling>
        ));
    }
    return <AlertStripeInfo>'Ingen utbetalinger registrert.'</AlertStripeInfo>;
}

function Utbetalinger(props: Props) {
    const utbetalinger = lagUtbetalingsinfo(props);

    return (
        <Wrapper>
            <UndertekstBold>
                Viser {props.utbetalinger ? props.utbetalinger.length : '0'} utbetalinger
            </UndertekstBold>
            {utbetalinger}
        </Wrapper>
    );
}

export default Utbetalinger;
