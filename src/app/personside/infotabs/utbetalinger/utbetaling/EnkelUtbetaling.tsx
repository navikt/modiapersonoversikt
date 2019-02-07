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
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { AnyAction, Dispatch } from 'redux';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/utbetalingerReducer';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';

interface OwnProps {
    utbetaling: UtbetalingInterface;
    ytelse: Ytelse;
}

interface DispatchProps {
    setYtelseIFokus: () => void;
    setEkspanderYtelse: (ekspander: boolean) => void;
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
    ${theme.focusOverlay}
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

    private printerButtonRef = React.createRef<HTMLSpanElement>();
    private utbetalingRef = React.createRef<HTMLLIElement>();
    private print?: () => void;

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
        this.props.setEkspanderYtelse(!this.props.visDetaljer);
        this.props.setYtelseIFokus();
    }

    handlePrint() {
        loggEvent('EnkeltUtbetaling', 'Printer');
        this.props.setEkspanderYtelse(true);
        this.print && this.print();
    }

    handleClickOnUtbetaling(event: React.MouseEvent<HTMLElement>) {
        const printKnappTrykket = eventTagetIsInsideRef(event, this.printerButtonRef);
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
                <UtbetalingStyle
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                        cancelIfHighlighting(() => this.handleClickOnUtbetaling(event))}
                    ref={this.utbetalingRef}
                    tabIndex={0}
                    onFocus={this.props.setYtelseIFokus}
                >
                    <article aria-expanded={this.props.visDetaljer} aria-label={'Utbetaling ' + ytelse.type}>
                        <UtbetalingTabellStyling>
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
                                    <span ref={this.printerButtonRef}>
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
                        </UtbetalingTabellStyling>
                    </article>
                </UtbetalingStyle>
            </Printer>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
    return {
        setYtelseIFokus: () => dispatch(setNyYtelseIFokus(ownProps.ytelse)),
        setEkspanderYtelse: (ekspander: boolean) => dispatch(setEkspanderYtelse(ownProps.ytelse, ekspander))
    };
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erIFokus: state.utbetalinger.ytelseIFokus === ownProps.ytelse,
        visDetaljer: state.utbetalinger.ekspanderteYtelser.includes(ownProps.ytelse)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnkelUtbetaling);
