import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { isLoading, isNotStarted, isReloading, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { hentUtbetalinger, reloadUtbetalinger } from '../../../../redux/restReducers/utbetalinger';
import { default as Filtrering, FilterState, PeriodeValg } from './filter/Filter';
import { getFraDateFromFilter, getTilDateFromFilter } from './utils/utbetalingerUtils';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components/macro';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { loggEvent } from '../../../../utils/frontendLogger';
import Arenalenke from './Arenalenke/Arenalenke';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import moment from 'moment';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';

interface State {
    filter: FilterState;
}

const initialState: State = {
    filter: {
        periode: {
            radioValg: PeriodeValg.SISTE_30_DAGER,
            egendefinertPeriode: {
                fra: moment()
                    .subtract(1, 'month')
                    .toDate(),
                til: new Date()
            }
        },
        utbetaltTil: [],
        ytelser: []
    }
};

interface StateProps {
    utbetalingerReducer: RestReducer<UtbetalingerResponse>;
    fødselsnummer: string;
}

interface DispatchProps {
    hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
    reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) => void;
}

type Props = StateProps & DispatchProps;

const UtbetalingerArticle = styled.article`
    display: flex;
    align-items: flex-start;
    @media (max-width: ${theme.media.utbetalinger}) {
        display: block;
    }
`;

const FiltreringSection = styled.section`
    min-width: 19rem;
    flex-basis: 19rem;
`;

const UtbetalingerSection = styled.section`
    position: relative;
    flex-grow: 1;
    min-width: 35rem; // Tabellene begynner å wrappe ved bredder mindre enn dette
    @media not all and (max-width: ${theme.media.utbetalinger}) {
        margin-left: ${theme.margin.layout};
    }
`;

class UtbetalingerContainer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
        this.onFilterChange = this.onFilterChange.bind(this);
        this.reloadUtbetalinger = this.reloadUtbetalinger.bind(this);
        loggEvent('Sidevisning', 'Utbetalinger');
    }

    onFilterChange(change: Partial<FilterState>) {
        this.setState(prevState => {
            // Sender inn funksjon her for å motvirke race-conditions fra UtbetaltTilValg og YtelseValg
            return {
                filter: {
                    ...prevState.filter,
                    ...change
                }
            };
        });
    }

    reloadUtbetalinger() {
        if (isLoading(this.props.utbetalingerReducer) || isReloading(this.props.utbetalingerReducer)) {
            return;
        }
        const fra = getFraDateFromFilter(this.state.filter);
        const til = getTilDateFromFilter(this.state.filter);
        this.props.reloadUtbetalinger(this.props.fødselsnummer, fra, til);
    }

    componentDidMount() {
        if (isNotStarted(this.props.utbetalingerReducer)) {
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
                <UtbetalingerArticle role="region" aria-label="Utbetalinger">
                    <VisuallyHiddenAutoFokusHeader tittel="Utbetalinger" />
                    <div>
                        <Arenalenke fødselsnummer={this.props.fødselsnummer} />
                        <FiltreringSection>
                            <Filtrering
                                filterState={this.state.filter}
                                onChange={this.onFilterChange}
                                hentUtbetalinger={this.reloadUtbetalinger}
                                utbetalingReducer={this.props.utbetalingerReducer}
                            />
                        </FiltreringSection>
                    </div>
                    <UtbetalingerSection aria-label="Filtrerte utbetalinger">
                        <Innholdslaster avhengigheter={[this.props.utbetalingerReducer]}>
                            <Utbetalinger
                                utbetalingerData={(this.props.utbetalingerReducer as Loaded<UtbetalingerResponse>).data}
                                filter={this.state.filter}
                            />
                        </Innholdslaster>
                    </UtbetalingerSection>
                </UtbetalingerArticle>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        utbetalingerReducer: state.restEndepunkter.utbetalingerReducer,
        fødselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(hentUtbetalinger(fødselsnummer, fra, til)),
        reloadUtbetalinger: (fødselsnummer: string, fra: Date, til: Date) =>
            dispatch(reloadUtbetalinger(fødselsnummer, fra, til))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UtbetalingerContainer);
