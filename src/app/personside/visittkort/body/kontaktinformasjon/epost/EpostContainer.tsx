import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';
import Epost from './Epost';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { RestReducer } from '../../../../../../redux/restReducers/restReducer';

interface Props {
    kontaktinformasjon: RestReducer<KRRKontaktinformasjon>;
}

class EpostContainer extends React.Component<Props> {
    render() {
        return <Epost kontaktinformasjonReducer={this.props.kontaktinformasjon} />;
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        kontaktinformasjon: state.restEndepunkter.kontaktinformasjon
    };
};

export default connect(
    mapStateToProps,
    null
)(EpostContainer);
