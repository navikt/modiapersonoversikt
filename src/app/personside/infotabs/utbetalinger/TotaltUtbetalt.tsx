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
import theme from '../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';

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
  padding: ${theme.margin.px20} ${theme.margin.px20} 2rem;
  cursor: pointer;
`;

const TotaltUtbetaltOversikt = styled.section`
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

const KnappWrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 2rem;
  padding-bottom: .2rem;
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
            <Wrapper onClick={this.toggleVisDetaljer}>
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
                <UnmountClosed isOpened={this.state.visDetaljer}>
                    <TotaltUtbetaltDetaljer {...this.props} />
                </UnmountClosed>
            </Wrapper>
        );
    }
}

export default TotaltUtbetalt;
