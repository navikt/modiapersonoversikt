import * as React from 'react';
import { isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { Varsel } from '../../../../models/varsel';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentVarsel } from '../../../../redux/restReducers/varsel';
import { connect } from 'react-redux';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import VarselVisning from './VarselVisningKomponent';

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    varselReducer: RestReducer<Varsel[]>;
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
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.varselReducer)) {
            this.props.hentVarsel(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData restReducer={this.props.varselReducer}>
                {data => <VarselVisning varsler={data} />}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        varselReducer: state.restEndepunkter.varselReducer
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
