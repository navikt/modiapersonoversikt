import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { SpaceBetween } from '../../../../components/common-styled-components';
import styled from 'styled-components';
import { datoVerbose } from './utbetalingerUtils';
import PrintKnapp from '../../../../components/PrintKnapp';

interface Props {
    utbetaling: Utbetaling;
}

const Opacity = styled.span`
  opacity: .5;
`;

const UtbetalingStyle = styled.div`
  padding: .5rem 1.2rem;
  > *:not(:first-child):not(:nth-child(3)) {
    margin-top: 1rem;
  }
`;

function Utbetaling({utbetaling}: Props) {  // TODO

    const ytelser = utbetaling.ytelser ?
        utbetaling.ytelser.map(ytelse => <li key={ytelse.type}>{ytelse.type}</li>) : null;

    return (
        <UtbetalingStyle>
            <SpaceBetween>
                <Undertekst>
                    <Opacity>
                        {datoVerbose(utbetaling.posteringsdato).sammensatt} / {utbetaling.status}
                    </Opacity>
                </Undertekst>
                <PrintKnapp onClick={() => console.log('ikke implementert')} />
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold>{utbetaling.metode}</UndertekstBold>
                <UndertekstBold>Tekst</UndertekstBold>
            </SpaceBetween>
            <Undertekst><Opacity>Periode</Opacity></Undertekst>
            <Undertekst><Opacity>Utbetalt til</Opacity></Undertekst>
            <UndertekstBold>Ytelser:</UndertekstBold>
            <Undertekst><ul>{ytelser}</ul></Undertekst>
        </UtbetalingStyle>
    );
}

export default Utbetaling;
