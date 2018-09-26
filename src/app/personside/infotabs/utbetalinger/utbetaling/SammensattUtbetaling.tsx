import * as React from 'react';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser
} from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { Utbetaling } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import EnkeltYtelse from './EnkeltYtelse';
import { FokusProps } from '../Utbetalinger';

interface SammensattUtbetalingProps {
    utbetaling: Utbetaling;
}

type Props = SammensattUtbetalingProps & FokusProps;

const SammensattUtbetalingStyle = styled.li`
  padding: ${theme.margin.px20} ${theme.margin.px10};
  > *:first-child, > *:nth-child(2), > *:nth-child(3) {
    height: 1.3rem;
  }
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
`;

const YtelsesListe = styled.ul`
  list-style: none;
  padding: 0;
  > * {
    padding-left: .5rem;
    margin-top: 1rem;
  }
`;

function SammensattUtbetaling(props: Props) {
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        return <>'Manglende data i utbetaling.'</>;
    }

    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
    const sum = formaterNOK(getNettoSumYtelser(utbetaling.ytelser));
    const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
        ? `Forfallsdato: ${dato}` : '';
    const ytelsesListe = utbetaling.ytelser.map((ytelse, index) => (
        <EnkeltYtelse
            ytelse={ytelse}
            konto={utbetaling.konto}
            melding={utbetaling.melding}
            key={index}
            valgtYtelse={props.valgtYtelse}
            updateValgtYtelse={props.updateValgtYtelse}
        />
    ));

    return (
        <SammensattUtbetalingStyle>
            <SpaceBetween>
                <Undertekst>
                    {dato} / <Bold>{utbetaling.status}</Bold>
                </Undertekst>
                <PrintKnapp onClick={() => alert('ikke implementert')}/>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold tag={'h4'}>{'Diverse ytelser'}</UndertekstBold>
                <UndertekstBold>{sum}</UndertekstBold>
            </SpaceBetween>
            <SpaceBetween>
                <Undertekst>Utbetaling til: {utbetaling.utbetaltTil}</Undertekst>
                <Undertekst>{forfallsInfo}</Undertekst>
            </SpaceBetween>
            <YtelsesListe>
                {ytelsesListe}
            </YtelsesListe>
        </SammensattUtbetalingStyle>
    );
}

export default SammensattUtbetaling;
