import * as React from 'react';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { FilterState } from '../filter/Filter';
import { Undertittel } from 'nav-frontend-typografi';
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
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { FlexEnd } from '../../../../../components/common-styled-components';

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

    constructor(props: TotaltUtbetaltProps) {
        super(props);
        this.state = {visDetaljer: false};
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
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
            <Wrapper onClick={() => cancelIfHighlighting(this.toggleVisDetaljer)}>
                <Header>
                    <Undertittel>Totalt utbetalt for perioden</Undertittel>
                    <TotaltUtbetaltOversikt>
                        <Undertekst tag="span">
                            {totaltUtbetaltTabell}
                        </Undertekst>
                    </TotaltUtbetaltOversikt>
                    <FlexEnd>
                        <PrintKnapp onClick={() => console.log('ikke implementert')}/>
                    </FlexEnd>
                </Header>
                <TotaltUtbetaltDetaljer
                    visDetaljer={this.state.visDetaljer}
                    toggleVisDetaljer={this.toggleVisDetaljer}
                    {...this.props}
                />
            </Wrapper>
        );
    }
}

export default TotaltUtbetalt;
