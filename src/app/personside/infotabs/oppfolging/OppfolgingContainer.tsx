import * as React from 'react';
import { isLoading, isNotStarted, isReloading, RestReducer } from '../../../../redux/restReducers/restReducer';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentDetaljertOppfolging, reloadDetaljertOppfolging } from '../../../../redux/restReducers/oppfolging';
import { connect } from 'react-redux';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import { FraTilDato } from './OppfolgingDatoKomponent';
import moment from 'moment';

interface State {
    valgtPeriode: FraTilDato;
}

const initialState: State = {
    valgtPeriode: {
        fra: moment()
            .subtract(2, 'month')
            .toDate(),
        til: moment()
            .add(1, 'month')
            .toDate()
    }
};

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    oppfølgingReducer: RestReducer<DetaljertOppfolging>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) => void;
    reloadDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class OppfolgingContainer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
        this.onFilterChange = this.onFilterChange.bind(this);
        this.reloadOppfolging = this.reloadOppfolging.bind(this);
    }

    onFilterChange(change: Partial<FraTilDato>) {
        this.setState({
            valgtPeriode: { ...this.state.valgtPeriode, ...change }
        });
    }

    reloadOppfolging() {
        if (isLoading(this.props.oppfølgingReducer) || isReloading(this.props.oppfølgingReducer)) {
            return;
        }
        this.props.reloadDetaljertOppfølging(
            this.props.fødselsnummer,
            this.state.valgtPeriode.fra,
            this.state.valgtPeriode.til
        );
    }

    componentDidMount() {
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.oppfølgingReducer)) {
            this.props.hentDetaljertOppfølging(
                this.props.fødselsnummer,
                this.state.valgtPeriode.fra,
                this.state.valgtPeriode.til
            );
        }
    }

    render() {
        return (
            <PlukkRestData restReducer={this.props.oppfølgingReducer}>
                {data => (
                    <OppfolgingVisning
                        detaljertOppfølging={data}
                        onChange={this.onFilterChange}
                        valgtPeriode={this.state.valgtPeriode}
                        hentOppfølging={this.reloadOppfolging}
                    />
                )}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        oppfølgingReducer: state.restEndepunkter.oppfolgingReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) =>
            dispatch(hentDetaljertOppfolging(fødselsnummer, startDato, sluttDato)),
        reloadDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) =>
            dispatch(reloadDetaljertOppfolging(fødselsnummer, startDato, sluttDato))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OppfolgingContainer);
