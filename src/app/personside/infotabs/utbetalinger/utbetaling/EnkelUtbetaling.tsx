import * as React from 'react';
import { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    periodeStringFromYtelse
} from '../utils/utbetalingerUtils';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { UtbetalingTabellStyling } from '../Utbetalinger';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import Printer from '../../../../../utils/Printer';
import DetaljerCollapse from '../DetaljerCollapse';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { loggEvent } from '../../../../../utils/frontendLogger';

interface Props {
    utbetaling: UtbetalingInterface;
    updateYtelseIFokus: (ytelse: Ytelse) => void;
    erIFokus: boolean;
}

interface State {
    visDetaljer: boolean;
}

const UtbetalingStyle = styled.li`
  cursor: pointer;
  &:focus {
    ${theme.focus}
  }
  @media print{
    list-style-type: none;
  }
`;

const UtbetalingHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.margin.px10} ${theme.margin.px20} 0;
  transition: 0.3s;
  cursor: pointer;
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
  .order-first {
    order: -1;
  }
`;

class EnkelUtbetaling extends React.PureComponent<Props, State> {

    private printButtonWrapperRef = React.createRef<HTMLElement>();
    private utbetalingRef = React.createRef<HTMLDivElement>();
    private print: () => void;

    constructor(props: Props) {
        super(props);
        this.state = {
            visDetaljer: false
        };
        this.setVisDetaljer = this.setVisDetaljer.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        const fikkFokus = this.props.erIFokus && !prevProps.erIFokus;
        if (fikkFokus && this.utbetalingRef.current) {
            this.utbetalingRef.current.focus();
        }
    }

    setVisDetaljer(vis: boolean) {
        this.setState({
            visDetaljer: vis
        });
    }

    handlePrint() {
        loggEvent('EnkeltUtbetaling', 'Printer');
        this.setState(
            {
                visDetaljer: true
            },
            this.print
        );
    }

    handleClickOnUtbetaling(event: React.MouseEvent<HTMLElement>) {
        if (!this.printButtonWrapperRef.current) {
            return;
        }
        const printKnappTrykket = (event.target instanceof Node)
            && this.printButtonWrapperRef.current.contains(event.target);
        if (!printKnappTrykket) {
            this.setVisDetaljer(!this.state.visDetaljer);
        }
    }

    handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && !event.repeat) {
            this.setVisDetaljer(!this.state.visDetaljer);
        }
    }

    render() {
        const utbetaling = this.props.utbetaling;
        if (!utbetaling.ytelser) {
            return 'Manglende data i utbetaling.';
        }

        const ytelse = utbetaling.ytelser[0];

        const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
        const tittel = ytelse.type;
        const sum = formaterNOK(ytelse.nettobeløp);
        const periode = periodeStringFromYtelse(ytelse);
        const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
            ? `Forfallsdato: ${dato}` : '';

        return (
            <Printer getPrintTrigger={(trigger: () => void) => (this.print = trigger)}>
                <UtbetalingTabellStyling>
                    <UtbetalingStyle
                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                            cancelIfHighlighting(() => this.handleClickOnUtbetaling(event))}
                        onKeyPress={this.handleKeyPress}
                        innerRef={this.utbetalingRef}
                        tabIndex={0}
                        onFocus={() => this.props.updateYtelseIFokus(ytelse)}
                    >
                        <UtbetalingHeaderStyle>
                            <SpaceBetween>
                                <Normaltekst tag={'h4'}><Bold>{tittel}</Bold></Normaltekst>
                                <Normaltekst><Bold>{sum}</Bold></Normaltekst>
                            </SpaceBetween>
                            <Normaltekst className="order-first">
                                {dato} / <Bold>{utbetaling.status}</Bold>
                            </Normaltekst>
                            <SpaceBetween>
                                <Normaltekst>{periode}</Normaltekst>
                                <Normaltekst>{forfallsInfo}</Normaltekst>
                            </SpaceBetween>
                            <SpaceBetween>
                                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                                <span ref={this.printButtonWrapperRef}>
                                    <PrintKnapp onClick={this.handlePrint}/>
                                </span>
                            </SpaceBetween>
                        </UtbetalingHeaderStyle>
                        <DetaljerCollapse
                            open={this.state.visDetaljer}
                            toggle={() => this.setVisDetaljer(!this.state.visDetaljer)}
                        >
                            <UtbetalingsDetaljer
                                ytelse={ytelse}
                                konto={utbetaling.konto}
                                melding={utbetaling.melding}
                            />
                        </DetaljerCollapse>
                    </UtbetalingStyle>
                </UtbetalingTabellStyling>
            </Printer>
        );
    }
}

export default EnkelUtbetaling;