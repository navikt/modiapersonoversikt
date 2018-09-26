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
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import moment = require('moment');

interface State {
    filter: FilterState;
    valgtYtelse?: Ytelse;
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
        this.reloadUtbetalinger = this.reloadUtbetalinger.bind(this);
        this.handleShortcut = this.handleShortcut.bind(this);
        this.updateValgtYtelse = this.updateValgtYtelse.bind(this);
        setTimeout(() => this.setState({valgtYtelse: undefined}), 2000);
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

    updateValgtYtelse(nyYtelse: Ytelse | undefined) {
        this.setState({
            valgtYtelse: nyYtelse
        });
    }

    handleShortcut(event: KeyboardEvent) {
        const ytelser: Ytelse[] = flatMapYtelser(this.props.utbetalingerReducer.data.utbetalinger);
        if (this.state.valgtYtelse === undefined) {
            this.updateValgtYtelse(ytelser[0]);
        } else if (event.key === 'ArrowDown') {
            this.updateValgtYtelse(finnNesteYtelse(this.state.valgtYtelse, ytelser, true));
        } else if (event.key === 'ArrowUp') {
            this.updateValgtYtelse(finnNesteYtelse(this.state.valgtYtelse, ytelser, false));
        }
    }

    render() {
        return (
            <ErrorBoundary>
                <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                    <FiltreringSection>
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
                                valgtYtelse={this.state.valgtYtelse}
                                filter={this.state.filter}
                                handleShortcut={this.handleShortcut}
                                updateValgtYtelse={this.updateValgtYtelse}
                            />
                        </Innholdslaster>
                        <ArenaLenke/>
                    </UtbetalingerSection>
                </UtbetalingerArticle>
            </ErrorBoundary>
        );
    }
}

function finnNesteYtelse(valgtYtelse: Ytelse, ytelser: Ytelse[], retningNed: boolean) {
    const currentIndex = ytelser.findIndex(ytelse => ytelse === valgtYtelse);
    let nextIndex = retningNed ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= ytelser.length) {
        nextIndex = 0;
    } else if (nextIndex <= 0) {
        nextIndex = ytelser.length - 1;
    }
    return ytelser[nextIndex];
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
