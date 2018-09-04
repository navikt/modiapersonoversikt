import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { FilterState } from './Filter';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../components/PrintKnapp';
import { formaterDato } from '../../../../utils/dateUtils';
import {
    createTable,
    getBruttoSumYtelser,
    getFraDateFromFilter,
    getNettoSumYtelser,
    getTilDateFromFilter,
    getTrekkSumYtelser, summertBeløpStringFraUtbetalinger
}
    from './utbetalingerUtils';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import DetaljerKnapp from './DetaljerKnapp';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';

export interface TotaltUtbetaltProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
}

interface State {
    visDetaljer: boolean;
}

const Wrapper = styled<{åpen?: boolean}, 'div'>('div')`
    padding: .2rem 1.2rem 1.2rem;
    ${props => props.åpen && 'background-color: rgba(0, 0, 0, 0.03);'}
`;

const TotaltUtbetaltOversikt = styled.div`
  th:not(:first-child) {
    font-weight: normal;
  }
  th {
    text-transform: uppercase;
  }
  td {
    font-weight: bold;
  }
`;

const KnappWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  > *:not(:first-child) {
    margin-left: .5rem;
  }
`;

class TotaltUtbetalt extends React.Component<TotaltUtbetaltProps, State> {

    constructor(props: TotaltUtbetaltProps) {
        super(props);
        this.state = { visDetaljer: false };
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
            <Wrapper åpen={this.state.visDetaljer}>
                <Undertittel>Totalt utbetalt for perioden</Undertittel>
                <KnappWrapper>
                    <PrintKnapp onClick={() => console.log('ikke implementert')}/>
                    <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                </KnappWrapper>
                <TotaltUtbetaltOversikt>
                    <Undertekst tag="span">
                        {totaltUtbetaltTabell}
                    </Undertekst>
                </TotaltUtbetaltOversikt>
                {this.state.visDetaljer && <TotaltUtbetaltDetaljer {...this.props} />}
            </Wrapper>
        );
    }
}

export default TotaltUtbetalt;
