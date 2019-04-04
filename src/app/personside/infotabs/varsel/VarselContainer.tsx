import * as React from 'react';
import { isNotStarted } from '../../../../redux/restReducers/restResource';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { Varsel } from '../../../../models/varsel';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentVarsel } from '../../../../redux/restReducers/varsel';
import { connect } from 'react-redux';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import VarselVisning from './VarselVisningKomponent';
import { RestResource } from '../../../../redux/restReducers/restResource';

interface StateProps {
    baseUrlResource: RestResource<BaseUrlsResponse>;
    varselResource: RestResource<Varsel[]>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentVarsel: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class VarselContainer extends React.PureComponent<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.baseUrlResource)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.varselResource)) {
            this.props.hentVarsel(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData restResource={this.props.varselResource}>
                {data => <VarselVisning varsler={data} />}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlResource: state.restResources.baseUrl,
        varselResource: state.restResources.brukersVarsler
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentVarsel: (fødselsnummer: string) => dispatch(hentVarsel(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VarselContainer);
