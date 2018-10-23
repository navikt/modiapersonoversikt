import * as React from 'react';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { FilterState } from '../filter/Filter';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { formaterDato } from '../../../../../utils/dateUtils';
import {
    createTable,
    getBruttoSumYtelser,
    getFraDateFromFilter,
    getNettoSumYtelser,
    getTilDateFromFilter,
    getTrekkSumYtelser,
    summertBeløpStringFraUtbetalinger
} from '../utils/utbetalingerUtils';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { FlexEnd } from '../../../../../components/common-styled-components';
import { UtbetalingTabellStyling } from '../Utbetalinger';
import Printer from '../../../../../utils/Printer';

export interface TotaltUtbetaltProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
}

interface State {
    visDetaljer: boolean;
}

const Wrapper = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
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

class TotaltUtbetalt extends React.Component<TotaltUtbetaltProps, State> {
    private print: () => void;
    private printerButtonRef = React.createRef<HTMLButtonElement>();

    constructor(props: TotaltUtbetaltProps) {
        super(props);
        this.state = {visDetaljer: false};
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
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
        if (!this.printerButtonRef.current) {
            return;
        }

        const buttonsClicked = (event.target instanceof Node) && this.printerButtonRef.current.contains(event.target);

        if (!buttonsClicked) {
            this.toggleVisDetaljer();
        }
    }

    render() {
        const periode: string =
            formaterDato(getFraDateFromFilter(this.props.filter))
            + ' - '
            + formaterDato(getTilDateFromFilter(this.props.filter));
        const brutto: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getBruttoSumYtelser);
        const trekk: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getTrekkSumYtelser);
        const utbetalt: string = summertBeløpStringFraUtbetalinger(this.props.utbetalinger, getNettoSumYtelser);
        const totaltUtbetaltTabell = createTable(
            ['Totalt Utbetalt', 'Brutto', 'Trekk', 'Utbetalt'],
            [[periode, brutto, trekk, utbetalt]]);

        return (
            <Printer getPrintFunc={(func: () => void) => this.print = func}>
                <Wrapper
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                        cancelIfHighlighting(() => this.handleClickOnUtbetaling(event))}
                >
                    <UtbetalingTabellStyling>
                        <Header>
                            <Undertittel>Totalt utbetalt for perioden</Undertittel>
                            <TotaltUtbetaltOversikt>
                                <Normaltekst tag="span">
                                    {totaltUtbetaltTabell}
                                </Normaltekst>
                            </TotaltUtbetaltOversikt>
                            <FlexEnd innerRef={this.printerButtonRef}>
                                <PrintKnapp onClick={this.handlePrint}/>
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
