import * as React from 'react';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { hentHistoriskeUtbetalinger } from '../../../../../redux/restReducers/ytelser/historiskeUtbetalinger';
import { connect } from 'react-redux';
import { isLoaded, isNotStarted, Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { UtbetalingerResponse } from '../../../../../models/utbetalinger';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { YtelserKeys } from '../ytelserKeys';
import HistoriskeUtbetalinger from './HistoriskeUtbetalinger';
import { HistoriskUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';

interface OwnProps {
    ytelseType: YtelserKeys;
    historiskeUtbetalinger: HistoriskUtbetaling[];
}

interface StateProps {
    toÅrGamleUtbetalingerFraUtbetalingerRestkonto: RestReducer<UtbetalingerResponse>;
    personInformasjon: RestReducer<PersonRespons>;
}

interface DispatchProps {
    hentHistoriskeUtbetalinger: (fnr: string) => void;
}

type Props = DispatchProps & StateProps & OwnProps;

class HistoriskeUtbetalingerContainer extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.hentAlleHistoriskeUtbetalinger = this.hentAlleHistoriskeUtbetalinger.bind(this);
    }

    hentAlleHistoriskeUtbetalinger() {
        if (
            isNotStarted(this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto) &&
            isLoaded(this.props.personInformasjon)
        ) {
            const fnr = (this.props.personInformasjon as Loaded<Person>).data.fødselsnummer;
            this.props.hentHistoriskeUtbetalinger(fnr);
        }
    }

    render() {
        const toÅrGamleUtbetalingerFraUtbetalingerRestkonto = isLoaded(
            this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto
        )
            ? this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto.data.utbetalinger
            : null;
        return (
            <HistoriskeUtbetalinger
                historiskeUtbetalinger={this.props.historiskeUtbetalinger}
                ytelseType={this.props.ytelseType}
                hentHistoriskeUtbetalinger={this.hentAlleHistoriskeUtbetalinger}
                reducerStatus={this.props.toÅrGamleUtbetalingerFraUtbetalingerRestkonto.status}
                toÅrGamleUtbetalingerFraUtbetalingerRestkonto={toÅrGamleUtbetalingerFraUtbetalingerRestkonto}
            />
        );
    }
}

function mapStateToProops(state: AppState): StateProps {
    return {
        toÅrGamleUtbetalingerFraUtbetalingerRestkonto: state.restEndepunkter.historiskeUtbetalingerYtelser,
        personInformasjon: state.restEndepunkter.personinformasjon
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentHistoriskeUtbetalinger: (fnr: string) => dispatch(hentHistoriskeUtbetalinger(fnr))
    };
}

export default connect(
    mapStateToProops,
    mapDispatchToProps
)(HistoriskeUtbetalingerContainer);
