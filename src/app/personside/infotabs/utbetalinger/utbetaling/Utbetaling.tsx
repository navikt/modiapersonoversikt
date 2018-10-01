import * as React from 'react';
import { Utbetaling as UtbetalingInterface } from '../../../../../models/utbetalinger';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import styled from 'styled-components';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    periodeStringFromYtelse
} from '../utils/utbetalingerUtils';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import DetaljerKnapp from '../utils/DetaljerKnapp';
import SammensattUtbetaling from './SammensattUtbetaling';
import theme from '../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';

interface Props {
    utbetaling: UtbetalingInterface;
}

interface State {
    visDetaljer: boolean;
}

const UtbetalingStyle = styled<{ åpen?: boolean }, 'li'>('li')`
  display: flex;
  flex-direction: column;
  .order-first {
    order: -1;
  }
  padding: ${theme.margin.px20} ${theme.margin.px10};
  transition: 0.3s;
  ${props => props.åpen && 'background-color: rgba(0, 0, 0, 0.03);'}
  cursor: pointer;
  > *:first-child, > *:nth-child(2), > *:nth-child(3) {
    height: 1.3rem;
  }
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
`;

const KnappWrapper = styled.div`
  display: flex;
  padding-bottom: .2rem;
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

        return (
            <UtbetalingStyle onClick={() => cancelIfHighlighting(this.toggleVisDetaljer)} åpen={this.state.visDetaljer}>
                <SpaceBetween>
                    <UndertekstBold tag={'h4'}>{tittel}</UndertekstBold>
                    <UndertekstBold>{sum}</UndertekstBold>
                </SpaceBetween>
                <SpaceBetween className="order-first">
                    <Undertekst>
                        {dato} / <Bold>{utbetaling.status}</Bold>
                    </Undertekst>
                    <KnappWrapper>
                        <PrintKnapp onClick={() => alert('ikke implementert')}/>
                        <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                    </KnappWrapper>
                </SpaceBetween>
                <SpaceBetween>
                    <Undertekst>{periode}</Undertekst>
                    <Undertekst>{forfallsInfo}</Undertekst>
                </SpaceBetween>
                <Undertekst>Utbetaling til: {utbetaling.utbetaltTil}</Undertekst>
                <UnmountClosed isOpened={this.state.visDetaljer}>
                    <UtbetalingsDetaljer
                        ytelse={ytelse}
                        konto={utbetaling.konto}
                        melding={utbetaling.melding}
                    />
                </UnmountClosed>
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
