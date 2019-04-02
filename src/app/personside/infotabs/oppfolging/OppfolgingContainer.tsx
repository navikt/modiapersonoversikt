import * as React from 'react';
import { isNotStarted, RestResource } from '../../../../redux/restReducers/restResource';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentDetaljertOppfolging, reloadDetaljertOppfolging } from '../../../../redux/restReducers/oppfolging';
import { connect } from 'react-redux';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import { VisOppfolgingFraTilDato } from '../../../../redux/oppfolging/types';

interface StateProps {
    baseUrlResource: RestResource<BaseUrlsResponse>;
    oppfølgingResource: RestResource<DetaljertOppfolging>;
    valgtPeriode: VisOppfolgingFraTilDato;
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

class OppfolgingContainer extends React.PureComponent<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.baseUrlResource)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.oppfølgingResource)) {
            this.props.hentDetaljertOppfølging(
                this.props.fødselsnummer,
                this.props.valgtPeriode.fra,
                this.props.valgtPeriode.til
            );
        }
    }

    render() {
        return (
            <PlukkRestData restResource={this.props.oppfølgingResource}>
                {data => <OppfolgingVisning detaljertOppfølging={data} />}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlResource: state.restResources.baseUrl,
        oppfølgingResource: state.restResources.oppfolging,
        valgtPeriode: state.oppfolging.valgtPeriode
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
