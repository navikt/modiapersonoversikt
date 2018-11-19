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
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import Printer from '../../../../../utils/Printer';
import DetaljerCollapse from '../DetaljerCollapse';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { Dispatch } from 'redux';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/utbetalingerStateReducer';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';

interface OwnProps {
    utbetaling: UtbetalingInterface;
    ytelse: Ytelse;
}

interface DispatchProps {
    setYtelseIFokus: (ytelse: Ytelse) => void;
    setEkspanderYtelse: (ytelse: Ytelse, ekspander: boolean) => void;
}

interface StateProps {
    erIFokus: boolean;
    visDetaljer: boolean;
}

type Props = DispatchProps & OwnProps & StateProps;

const UtbetalingStyle = styled.li`
  cursor: pointer;
  transition: .3s;
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

class EnkelUtbetaling extends React.PureComponent<Props> {

    private printButtonWrapperRef = React.createRef<HTMLElement>();
    private utbetalingRef = React.createRef<HTMLDivElement>();
    private print: () => void;

    constructor(props: Props) {
        super(props);
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        const fikkFokus = this.props.erIFokus && !prevProps.erIFokus;
        if (fikkFokus && this.utbetalingRef.current) {
            this.utbetalingRef.current.focus();
        }
    }

    toggleVisDetaljer() {
        this.props.setEkspanderYtelse(this.props.ytelse, !this.props.visDetaljer);
    }

    handlePrint() {
        loggEvent('EnkeltUtbetaling', 'Printer');
        this.props.setEkspanderYtelse(this.props.ytelse, true);
        this.print();
    }

    handleClickOnUtbetaling(event: React.MouseEvent<HTMLElement>) {
        if (!this.printButtonWrapperRef.current) {
            return;
        }
        const printKnappTrykket = (event.target instanceof Node)
            && this.printButtonWrapperRef.current.contains(event.target);
        if (!printKnappTrykket) {
            this.toggleVisDetaljer();
        }
    }

    render() {
        const utbetaling = this.props.utbetaling;

        const ytelse = this.props.ytelse;

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
                        innerRef={this.utbetalingRef}
                        tabIndex={0}
                        onFocus={() => this.props.setYtelseIFokus(ytelse)}
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
                            open={this.props.visDetaljer}
                            toggle={this.toggleVisDetaljer}
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

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        setYtelseIFokus: ytelse => dispatch(setNyYtelseIFokus(ytelse)),
        setEkspanderYtelse: (ytelse: Ytelse, ekspander: boolean) => dispatch(setEkspanderYtelse(ytelse, ekspander))
    };
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erIFokus: state.utbetalinger.ytelseIFokus === ownProps.ytelse,
        visDetaljer: state.utbetalinger.ekspanderteYtelser.includes(ownProps.ytelse)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnkelUtbetaling);
