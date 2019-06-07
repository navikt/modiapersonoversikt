import * as React from 'react';
import { Utbetaling, UtbetalingerPeriode } from '../../../../../models/utbetalinger';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { formaterDato } from '../../../../../utils/stringFormatting';
import {
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getTrekkSumYtelser,
    summertBeløpStringFraUtbetalinger
} from '../utils/utbetalingerUtils';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { FlexEnd } from '../../../../../components/common-styled-components';
import Printer from '../../../../../utils/Printer';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import { Table } from '../../../../../utils/table/Table';

export interface TotaltUtbetaltProps {
    utbetalinger: Utbetaling[];
    periode: UtbetalingerPeriode;
}

interface State {
    visDetaljer: boolean;
}

const Wrapper = styled.article`
    ${theme.hvittPanel};
    cursor: pointer;
`;

const Header = styled.div`
    padding: ${theme.margin.px20} ${theme.margin.px20} 0;
`;

const TotaltUtbetaltOversikt = styled.section`
    margin: 1rem 0;
    th {
        font-weight: normal;
    }
    th {
        text-transform: uppercase;
    }
    td {
        font-weight: bold;
    }
`;

class TotaltUtbetalt extends React.PureComponent<TotaltUtbetaltProps, State> {
    private print?: () => void;
    private printerButtonRef = React.createRef<HTMLButtonElement>();

    constructor(props: TotaltUtbetaltProps) {
        super(props);
        this.state = { visDetaljer: false };
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    handlePrint() {
        loggEvent('UtskriftTotaltUtbetalt', 'Printer');
        this.setState(
            {
                visDetaljer: true
            },
            this.print
        );
    }

    handleClickOnUtbetaling(event: React.MouseEvent<HTMLElement>) {
        const printerButtonClicked = eventTagetIsInsideRef(event, this.printerButtonRef);
        if (!printerButtonClicked) {
            this.toggleVisDetaljer();
        }
    }

    render() {
        const sluttDato =
            new Date(this.props.periode.sluttDato) > new Date() ? new Date() : this.props.periode.sluttDato;
        const periode: string = formaterDato(this.props.periode.startDato) + ' - ' + formaterDato(sluttDato);
        const brutto: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getBruttoSumYtelser);
        const trekk: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getTrekkSumYtelser);
        const utbetalt: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getNettoSumYtelser);
        const totaltUtbetaltTabell = (
            <Table
                tittelRekke={['Totalt Utbetalt', 'Brutto', 'Trekk', 'Utbetalt']}
                rows={[[periode, brutto, trekk, utbetalt]]}
            />
        );

        return (
            <Printer getPrintTrigger={trigger => (this.print = trigger)}>
                <Wrapper
                    aria-label="Totalt utbetalt"
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                        cancelIfHighlighting(() => this.handleClickOnUtbetaling(event))
                    }
                >
                    <UtbetalingTabellStyling>
                        <Header>
                            <Undertittel>Totalt utbetalt for perioden</Undertittel>
                            <TotaltUtbetaltOversikt>
                                <Normaltekst tag="span">{totaltUtbetaltTabell}</Normaltekst>
                            </TotaltUtbetaltOversikt>
                            <FlexEnd>
                                <span ref={this.printerButtonRef}>
                                    <PrintKnapp onClick={this.handlePrint} />
                                </span>
                            </FlexEnd>
                        </Header>
                        <TotaltUtbetaltDetaljer
                            visDetaljer={this.state.visDetaljer}
                            toggleVisDetaljer={this.toggleVisDetaljer}
                            {...this.props}
                        />
                    </UtbetalingTabellStyling>
                </Wrapper>
            </Printer>
        );
    }
}

export default TotaltUtbetalt;
