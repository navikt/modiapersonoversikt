import * as React from 'react';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser
} from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, FlexEnd, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Normaltekst } from 'nav-frontend-typografi';
import { Utbetaling } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { FokusProps } from '../Utbetalinger';
import EnkeltYtelse from './EnkeltYtelse';

interface SammensattUtbetalingProps {
    utbetaling: Utbetaling;
}

type Props = SammensattUtbetalingProps & FokusProps;

const SammensattUtbetalingStyle = styled.li`
  padding: ${theme.margin.px20} ${theme.margin.px10};
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
`;

const YtelsesListe = styled.ul`
  padding: 0;
  margin-top: 2rem;
  > li {
    margin-left: 1.5rem;
    border-top: ${theme.border.skilleSvak};
    padding-top: 1rem;
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
            ytelseIFokus={props.ytelseIFokus}
            updateYtelseIFokus={props.updateYtelseIFokus}
        />
    ));

    return (
        <SammensattUtbetalingStyle>
                <Normaltekst>
                    {dato} / <Bold>{utbetaling.status}</Bold>
                </Normaltekst>
            <SpaceBetween>
                <Normaltekst tag={'h4'}><Bold>Diverse ytelser</Bold></Normaltekst>
                <Normaltekst><Bold>{sum}</Bold></Normaltekst>
            </SpaceBetween>
            <FlexEnd>
                <Normaltekst>{forfallsInfo}</Normaltekst>
            </FlexEnd>
            <SpaceBetween>
                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                <PrintKnapp onClick={() => alert('ikke implementert')}/>
            </SpaceBetween>
            <YtelsesListe>
                {ytelsesListe}
            </YtelsesListe>
        </SammensattUtbetalingStyle>
    );
}

export default SammensattUtbetaling;
