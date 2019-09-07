import * as React from 'react';
import { formaterNOK, getGjeldendeDatoForUtbetaling, getNettoSumYtelser } from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, FlexEnd, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Normaltekst } from 'nav-frontend-typografi';
import { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import DelUtbetaling from './DelUtbetaling';
import Printer from '../../../../../utils/Printer';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { connect } from 'react-redux';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { AnyAction, Dispatch } from 'redux';
import { setEkspanderYtelse } from '../../../../../redux/utbetalinger/actions';
import { datoVerbose } from '../../../../../utils/dateUtils';
import moment from 'moment';
import { RouteComponentProps, withRouter } from 'react-router';
import { utbetalingerTest } from '../../dyplenkeTest/utils';

interface OwnProps {
    utbetaling: Utbetaling;
}

interface DispatchProps {
    ekspanderYtelse: (ytelse: Ytelse) => void;
}

type Props = DispatchProps & OwnProps & RouteComponentProps<{ posteringsdato: string }>;

const SammensattUtbetalingStyle = styled.li`
    padding: ${theme.margin.px20};
    > *:nth-child(3) {
        margin-bottom: 0.8rem;
    }
    @media print {
        list-style-type: none;
        li {
            page-break-inside: avoid;
        }
    }
    &:focus {
        ${theme.focusInset}
    }
`;

const YtelsesListe = styled.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
    border-radius: ${theme.borderRadius.layout};
    border: ${theme.border.skilleSvak};
    @media print {
        border: none;
    }
    > li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

class SammensattUtbetaling extends React.PureComponent<Props> {
    private print?: () => void;
    private utbetalingRef = React.createRef<HTMLLIElement>();

    constructor(props: Props) {
        super(props);
        this.visDetaljerAndPrint = this.visDetaljerAndPrint.bind(this);
    }

    componentDidMount() {
        const posteringsdatoFraUrl = (this.props.match.params.posteringsdato as unknown) as number;
        const erValgtIUrl = moment(this.props.utbetaling.posteringsdato).isSame(moment.unix(posteringsdatoFraUrl));
        if (erValgtIUrl) {
            this.utbetalingRef.current && this.utbetalingRef.current.focus();
        }
    }

    visDetaljerAndPrint() {
        const ytelser = this.props.utbetaling.ytelser;

        if (!ytelser) {
            return;
        }
        ytelser.forEach(ytelse => this.props.ekspanderYtelse(ytelse));
        this.print && this.print();
        loggEvent('SammensattUtbetaling', 'Printer');
    }

    render() {
        const utbetaling = this.props.utbetaling;

        if (!utbetaling.ytelser) {
            return <>'Manglende data i utbetaling.'</>;
        }

        const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
        const sum = formaterNOK(getNettoSumYtelser(utbetaling.ytelser));
        const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato ? `Forfallsdato: ${dato}` : '';
        const ytelsesListe = utbetaling.ytelser.map((ytelse, index) => (
            <DelUtbetaling ytelse={ytelse} konto={utbetaling.konto} melding={utbetaling.melding} key={index} />
        ));

        return (
            <Printer getPrintTrigger={(trigger: () => void) => (this.print = trigger)}>
                <SammensattUtbetalingStyle
                    ref={this.utbetalingRef}
                    tabIndex={-1}
                    className={utbetalingerTest.utbetaling}
                >
                    <UtbetalingTabellStyling>
                        <Normaltekst>
                            {dato} / <Bold>{utbetaling.status}</Bold>
                        </Normaltekst>
                        <SpaceBetween>
                            <Normaltekst tag={'h4'}>
                                <Bold>Diverse ytelser</Bold>
                            </Normaltekst>
                            <Normaltekst>
                                <Bold>{sum}</Bold>
                            </Normaltekst>
                        </SpaceBetween>
                        <FlexEnd>
                            <Normaltekst>{forfallsInfo}</Normaltekst>
                        </FlexEnd>
                        <SpaceBetween>
                            <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                            <PrintKnapp onClick={this.visDetaljerAndPrint} />
                        </SpaceBetween>
                        <YtelsesListe aria-label={`Diverse ytelser`}>{ytelsesListe}</YtelsesListe>
                    </UtbetalingTabellStyling>
                </SammensattUtbetalingStyle>
            </Printer>
        );
    }
}

export default withRouter(
    connect(
        null,
        (dispatch: Dispatch<AnyAction>): DispatchProps => {
            return {
                ekspanderYtelse: ytelse => dispatch(setEkspanderYtelse(ytelse, true))
            };
        }
    )(SammensattUtbetaling)
);
