import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { RestReducer } from '../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import { Action } from 'redux';
import { hentUtbetalinger, reloadUtbetalinger } from '../../../../redux/restReducers/utbetalinger';
import { default as Filtrering, FilterState, PeriodeValg } from './Filter';
import { getFraDateFromFilter, getTilDateFromFilter } from './utbetalingerUtils';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Undertekst } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import moment = require('moment');

interface State {
    filter: FilterState;
}

const initialState: State = {
    filter: {
        periode: {
            radioValg: PeriodeValg.SISTE_30_DAGER,
            egendefinertPeriode: {
                fra: moment().subtract(1, 'year').toDate(),
                til: new Date()
            }
        },
        utbetaltTil: [],
        ytelser: []
    }
};

interface StateProps {
    utbetalingerReducer: RestReducer<UtbetalingerResponse>;
}

interface DispatchProps {
    hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
    reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const utbetalingerMediaTreshold = '80rem';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  @media(max-width: ${utbetalingerMediaTreshold}) {
    display: block;
  }
`;

const Venstre = styled.div`
  flex-basis: 16em;
  flex-shrink: 1;
`;

const Hoyre = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
  @media not all and (max-width: ${utbetalingerMediaTreshold}) {
      margin-left: ${theme.margin.layout};
  }
`;

const ArenaLenkeStyle = styled.div`
  text-align: right;
  position: absolute;
  top: ${theme.margin.px20}
  right: ${theme.margin.px20}
`;

function ArenaLenke() {
    return (
        <ArenaLenkeStyle>
            <Undertekst>
                <a className="lenke">Meldinger/utbetalinger i Arena</a>
            </Undertekst>
        </ArenaLenkeStyle>
    );
}

class UtbetalingerContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {...initialState};
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(change: Partial<FilterState>) {
        this.setState(
            (prevState) => { // Sender inn funksjon her for å motvirke race-conditions fra UtbetaltTilValg og YtelseValg
                return {
                    filter: {
                        ...prevState.filter,
                        ...change
                    }
                };
            },
            () => change.periode && this.reloadUtbetalinger()
        );
    }

    reloadUtbetalinger() {
        const fra = getFraDateFromFilter(this.state.filter);
        const til = getTilDateFromFilter(this.state.filter);
        this.props.reloadUtbetalinger(this.props.fødselsnummer, fra, til);
    }

    componentDidMount() {
        if (this.props.utbetalingerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentUtbetalinger(
                this.props.fødselsnummer,
                getFraDateFromFilter(this.state.filter),
                getTilDateFromFilter(this.state.filter)
            );
        }
    }

    render() {
        return (
            <ErrorBoundary>
                <Wrapper>
                    <Venstre>
                        <Filtrering
                            filterState={this.state.filter}
                            onChange={this.onFilterChange}
                            showSpinner={this.props.utbetalingerReducer.status === STATUS.RELOADING}
                            utbetalingReducer={this.props.utbetalingerReducer}
                        />
                    </Venstre>
                    <Hoyre>
                        <ArenaLenke/>
                        <Innholdslaster avhengigheter={[this.props.utbetalingerReducer]}>
                            <Utbetalinger
                                utbetalinger={this.props.utbetalingerReducer.data.utbetalinger}
                                filter={this.state.filter}
                            />
                        </Innholdslaster>
                    </Hoyre>
                </Wrapper>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        utbetalingerReducer: state.restEndepunkter.utbetalingerReducer
    });
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(hentUtbetalinger(fødselsnummer, fra, til)),
        reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(reloadUtbetalinger(fødselsnummer, fra, til))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UtbetalingerContainer);
