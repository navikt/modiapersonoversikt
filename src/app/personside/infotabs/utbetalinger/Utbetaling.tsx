import * as React from 'react';
import { Utbetaling as UtbetalingInterface } from '../../../../models/utbetalinger';
import { UndertekstBold } from 'nav-frontend-typografi';
import { Bold, SpaceBetween, UndertekstGrå } from '../../../../components/common-styled-components';
import styled from 'styled-components';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    periodeStringFromYtelse
}
    from './utbetalingerUtils';
import PrintKnapp from '../../../../components/PrintKnapp';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import DetaljerKnapp from './DetaljerKnapp';
import SammensattUtbetaling from './SammensattUtbetaling';

interface Props {
    utbetaling: UtbetalingInterface;
}

interface State {
    visDetaljer: boolean;
}

export const UtbetalingStyle = styled<{ focus?: boolean }, 'li'>('li')`
  padding: .5rem 1.2rem;
  transition: 0.3s;
  ${props => props.focus && 'background-color: rgba(0, 0, 0, 0.03);'}
`;

const Luft = styled.div`
  margin-top: .5rem;
`;

const KnappWrapper = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: .5rem;
  }
`;

class EnkelUtbetaling extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            visDetaljer: false
        };
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    render() {
        const utbetaling = this.props.utbetaling;
        if (!utbetaling.ytelser) { return 'Manglende data i utbetaling.'; }

        const ytelse = utbetaling.ytelser[0];

        const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
        const tittel = ytelse.type;
        const sum = formaterNOK(ytelse.nettobeløp);
        const periode = periodeStringFromYtelse(ytelse);
        const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
            ? `Forfallsdato: ${dato}` : '';
        const utbetalingsDetaljer = this.state.visDetaljer && (
            <UtbetalingsDetaljer
                ytelse={ytelse}
                konto={utbetaling.konto}
                melding={utbetaling.melding}
            />
        );

        return (
            <UtbetalingStyle focus={this.state.visDetaljer}>
                <SpaceBetween>
                    <UndertekstGrå>
                        {dato} / <Bold>{utbetaling.status}</Bold>
                    </UndertekstGrå>
                    <KnappWrapper>
                        <PrintKnapp onClick={() => alert('ikke implementert')}/>
                        <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                    </KnappWrapper>
                </SpaceBetween>
                <SpaceBetween>
                    <UndertekstBold tag={'h4'}>{tittel}</UndertekstBold>
                    <UndertekstBold>{sum}</UndertekstBold>
                </SpaceBetween>
                <SpaceBetween>
                    <UndertekstGrå>{periode}</UndertekstGrå>
                    <UndertekstGrå>{forfallsInfo}</UndertekstGrå>
                </SpaceBetween>
                <Luft/>
                <UndertekstGrå>Utbetaling til: {utbetaling.utbetaltTil}</UndertekstGrå>
                {utbetalingsDetaljer}
            </UtbetalingStyle>
        );
    }
}

function Utbetaling(props: Props) {
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;
    return enkeltYtelse
        ? <EnkelUtbetaling utbetaling={utbetaling}/>
        : <SammensattUtbetaling utbetaling={utbetaling}/>;
}

export default Utbetaling;
