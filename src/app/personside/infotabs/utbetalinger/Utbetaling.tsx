import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../components/common-styled-components';
import styled from 'styled-components';
import {
    datoVerbose, formatNOK,
    getGjeldendeDatoForUtbetaling,
    getOverskriftFromUtbetaling,
    getPeriodeFromUtbetalig,
    getNettoSumUtbetaling
}
    from './utbetalingerUtils';
import PrintKnapp from '../../../../components/PrintKnapp';
import { formaterDato } from '../../../../utils/dateUtils';
import { ReactNode } from 'react';

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
  > *:not(:first-child):not(:nth-child(3)) {
    margin-top: .5rem;
  }
`;

function getDatoForUtbetaling(utbetaling: Utbetaling): string {
    return datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
}

function Utbetaling({ utbetaling }: Props) {

    const periode = getPeriodeFromUtbetalig(utbetaling);
    const sum = formatNOK(getNettoSumUtbetaling(utbetaling));
    const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
        ? `Forfallsdato: ${getDatoForUtbetaling(utbetaling)}` : null;
    return (
        <UtbetalingStyle>
            <SpaceBetween>
                <UndertekstGrå>
                    {getDatoForUtbetaling(utbetaling)} / <Bold>{utbetaling.status}</Bold>
                </UndertekstGrå>
                <PrintKnapp onClick={() => console.log('ikke implementert')}/>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold>{getOverskriftFromUtbetaling(utbetaling)}</UndertekstBold>
                <UndertekstBold>{sum}</UndertekstBold>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstGrå>
                    {formaterDato(periode.fra)} - {formaterDato(periode.til)}
                </UndertekstGrå>
                <UndertekstGrå>
                    {forfallsInfo}
                </UndertekstGrå>
            </SpaceBetween>
            <UndertekstGrå>Utbetaling til: {utbetaling.utbetaltTil}</UndertekstGrå>
        </UtbetalingStyle>
    );
}

export default Utbetaling;
