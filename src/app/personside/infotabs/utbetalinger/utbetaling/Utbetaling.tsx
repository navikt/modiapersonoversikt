import * as React from 'react';
import { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import { Normaltekst } from 'nav-frontend-typografi';
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
import SammensattUtbetaling from './SammensattUtbetaling';
import theme from '../../../../../styles/personOversiktTheme';
import { FokusProps, UtbetalingTabellStyling } from '../Utbetalinger';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import Printer from '../../../../../utils/Printer';

interface UtbetalingComponentProps {
    utbetaling: UtbetalingInterface;
}

type Props = UtbetalingComponentProps & FokusProps;

interface State {
    visDetaljer: boolean;
}

const UtbetalingStyle = styled.li`
  cursor: pointer;
  &:focus {
    ${theme.focus}
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

class EnkelUtbetaling extends React.Component<Props, State> {

    private buttonWrapperRef = React.createRef<HTMLDivElement>();
    private print: () => void;

    private myRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            visDetaljer: false,
        };
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.setTilYtelseIFokus = this.setTilYtelseIFokus.bind(this);
        this.removeEnterListener = this.removeEnterListener.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    handlePrint() {
        this.setState(
            {
                visDetaljer: true,
            },
            this.print
        );
    }

    handleClickOnUtbetaling(event: React.MouseEvent<HTMLElement>) {
        if (!this.buttonWrapperRef.current) {
            return;
        }

        const buttonsClicked = (event.target instanceof Node) && this.buttonWrapperRef.current.contains(event.target);

        if (!buttonsClicked) {
            this.toggleVisDetaljer();
        }
    }

    handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.toggleVisDetaljer();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.erIFokus(this.props) && !this.erIFokus(prevProps) && this.myRef.current) {
            this.myRef.current.focus();
            this.addEnterListener();
        } else if (!this.erIFokus(this.props)) {
            this.removeEnterListener();
        }
    }

    removeEnterListener() {
        window.removeEventListener('keydown', this.handleEnter);
    }

    addEnterListener() {
        window.addEventListener('keydown', this.handleEnter);
    }

    erIFokus(props: Props) {
        if (props.utbetaling && props.utbetaling.ytelser) {
            return props.ytelseIFokus === props.utbetaling.ytelser[0];
        }
        return false;
    }

    setTilYtelseIFokus(ytelse: Ytelse) {
        this.props.updateYtelseIFokus(ytelse);
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
            <Printer getPrintFunc={(func: () => void) => (this.print = func)}>
                <UtbetalingTabellStyling>
                    <UtbetalingStyle
                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                            cancelIfHighlighting(() => this.handleClickOnUtbetaling(event))}
                        innerRef={this.myRef}
                        tabIndex={0}
                        onFocus={() => this.setTilYtelseIFokus(ytelse)}
                        onBlur={this.removeEnterListener}
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
                            <SpaceBetween innerRef={this.buttonWrapperRef}>
                                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                                <PrintKnapp onClick={this.handlePrint}/>
                            </SpaceBetween>
                        </UtbetalingHeaderStyle>
                        <UtbetalingsDetaljer
                            visDetaljer={this.state.visDetaljer}
                            toggleVisDetaljer={this.toggleVisDetaljer}
                            ytelse={ytelse}
                            konto={utbetaling.konto}
                            melding={utbetaling.melding}
                        />
                    </UtbetalingStyle>
                </UtbetalingTabellStyling>
            </Printer>
        );
    }
}

function Utbetaling(props: Props) {
    if (!props.utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', props.utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = props.utbetaling.ytelser.length === 1;

    return enkeltYtelse
        ? <EnkelUtbetaling {...props}/>
        : <SammensattUtbetaling {...props}/>;
}

export default Utbetaling;
