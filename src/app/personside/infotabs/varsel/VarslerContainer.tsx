import * as React from 'react';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { Varsel } from '../../../../models/varsel';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentVarsel } from '../../../../redux/restReducers/varsel';
import { connect } from 'react-redux';
import Varsler from './Varsler';
import PlukkRestDataDeprecated from '../ytelser/pleiepenger/PlukkRestDataDeprecated';
import { DeprecatedRestResource, isNotStarted } from '../../../../redux/restReducers/deprecatedRestResource';

interface StateProps {
    fødselsnummer: string;
    baseUrlResource: DeprecatedRestResource<BaseUrlsResponse>;
    varselResource: DeprecatedRestResource<Varsel[]>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentVarsel: (fødselsnummer: string) => void;
}

type Props = StateProps & DispatchProps;

class VarslerContainer extends React.PureComponent<Props> {
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
            <PlukkRestDataDeprecated restResource={this.props.varselResource}>
                {data => <Varsler varsler={data} />}
            </PlukkRestDataDeprecated>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
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
)(VarslerContainer);
