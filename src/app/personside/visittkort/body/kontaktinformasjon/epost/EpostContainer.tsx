import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';
import Epost from './Epost';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { RestResource } from '../../../../../../redux/restReducers/restResource';

interface Props {
    kontaktinformasjon: RestResource<KRRKontaktinformasjon>;
}

class EpostContainer extends React.Component<Props> {
    render() {
        return <Epost kontaktinformasjonResource={this.props.kontaktinformasjon} />;
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        kontaktinformasjon: state.restResources.kontaktinformasjon
    };
};

export default connect(
    mapStateToProps,
    null
)(EpostContainer);
