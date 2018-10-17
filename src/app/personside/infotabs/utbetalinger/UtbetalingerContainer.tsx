import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { RestReducer } from '../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse, Ytelse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import { Action } from 'redux';
import { hentUtbetalinger, reloadUtbetalinger } from '../../../../redux/restReducers/utbetalinger';
import { default as Filtrering, FilterState, PeriodeValg } from './filter/Filter';
import { flatMapYtelser, getFraDateFromFilter, getTilDateFromFilter } from './utils/utbetalingerUtils';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { loggEvent } from '../../../../utils/frontendLogger';
import Arenalenke from './Arenalenke/Arenalenke';
import moment = require('moment');

interface State {
    filter: FilterState;
    ytelseIFokus: Ytelse | null;
}

const initialState: State = {
    filter: {
        periode: {
            radioValg: PeriodeValg.SISTE_30_DAGER,
            egendefinertPeriode: {
                fra: moment().subtract(1, 'month').toDate(),
                til: new Date()
            }
        },
        utbetaltTil: [],
        ytelser: []
    },
    ytelseIFokus: null
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

const UtbetalingerArticle = styled.article`
  display: flex;
  align-items: flex-start;
  @media(max-width: ${utbetalingerMediaTreshold}) {
    display: block;
  }
`;

const FiltreringSection = styled.section`
  min-width: 18rem;
  flex-basis: 18rem;
`;

const UtbetalingerSection = styled.section`
  position: relative;
  flex-grow: 1;
  min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
  @media not all and (max-width: ${utbetalingerMediaTreshold}) {
      margin-left: ${theme.margin.layout};
  }
`;

class UtbetalingerContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {...initialState};
        this.onFilterChange = this.onFilterChange.bind(this);
        this.reloadUtbetalinger = this.reloadUtbetalinger.bind(this);
        this.handlePilknapper = this.handlePilknapper.bind(this);
        this.updateYtelseIFokus = this.updateYtelseIFokus.bind(this);
        loggEvent('utbetalinger.sidevisning');
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
            }
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

    updateYtelseIFokus(nyYtelse: Ytelse | null) {
        this.setState({
            ytelseIFokus: nyYtelse
        });
    }

    handlePilknapper(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this.updateYtelseIFokus(this.finnNesteYtelse());
        } else if (event.key === 'ArrowUp') {
            this.updateYtelseIFokus(this.finnForrigeYtelse());
        }
    }

    finnNesteYtelse() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalingerReducer.data.utbetalinger);
        const currentIndex = this.state.ytelseIFokus ? ytelser.indexOf(this.state.ytelseIFokus) : -1;
        return ytelser[currentIndex + 1] || ytelser[0];
    }

    finnForrigeYtelse() {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalingerReducer.data.utbetalinger);
        const currentIndex = this.state.ytelseIFokus ? ytelser.indexOf(this.state.ytelseIFokus) : ytelser.length;
        return ytelser[currentIndex - 1] || ytelser[ytelser.length - 1];
    }

    render() {
        return (
            <ErrorBoundary>
                <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                    <FiltreringSection>
                        <Arenalenke fødselsnummer={this.props.fødselsnummer}/>
                        <Filtrering
                            filterState={this.state.filter}
                            onChange={this.onFilterChange}
                            hentUtbetalinger={this.reloadUtbetalinger}
                            utbetalingReducer={this.props.utbetalingerReducer}
                        />
                    </FiltreringSection>
                    <UtbetalingerSection>
                        <Undertittel className="visually-hidden">Filtrerte utbetalinger</Undertittel>
                        <Innholdslaster avhengigheter={[this.props.utbetalingerReducer]}>
                            <Utbetalinger
                                utbetalinger={this.props.utbetalingerReducer.data.utbetalinger}
                                ytelseIFokus={this.state.ytelseIFokus}
                                filter={this.state.filter}
                                handleShortcut={this.handlePilknapper}
                                updateYtelseIFokus={this.updateYtelseIFokus}
                            />
                        </Innholdslaster>
                    </UtbetalingerSection>
                </UtbetalingerArticle>
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
