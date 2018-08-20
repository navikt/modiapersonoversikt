import * as React from 'react';
import Utbetalinger from './Utbetalinger';
import { AppState } from '../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { RestReducer } from '../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../models/utbetalinger';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import { Action } from 'redux';
import { hentUtbetalinger } from '../../../../redux/restReducers/utbetalinger';
import { FilterState, PeriodeValg } from './Filter';
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
        utbetaltTil: {
            bruker: true,
            annenMottaker: true
        },
        ytelse: {
            alleYtelser: true
        }
    }
};

interface StateProps {
    utbetalingerReducer: RestReducer<UtbetalingerResponse>;
}

interface DispatchProps {
    hentUtbetalinger: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class UtbetalingerContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {...initialState};
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(change: Partial<FilterState>) {
        this.setState({
            filter: {
                ...this.state.filter,
                ...change
            }
        });
    }

    componentDidMount() {
        if (this.props.utbetalingerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentUtbetalinger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.utbetalingerReducer]}>
                <Utbetalinger
                    utbetalinger={this.props.utbetalingerReducer.data.utbetalinger}
                    onFilterChange={this.onFilterChange}
                    filter={this.state.filter}
                />
            </Innholdslaster>
        );
    }
}

function mapStateToProps (state: AppState): StateProps {
    return ({
        utbetalingerReducer: state.restEndepunkter.utbetalingerReducer
    });
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentUtbetalinger: (fødselsnummer: string) => dispatch(hentUtbetalinger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UtbetalingerContainer);
