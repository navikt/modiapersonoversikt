import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, RestReducer } from '../../../../../../redux/reducer';
import Epost from './Epost';
import { Kontaktinformasjon } from '../../../../../../models/kontaktinformasjon';

interface Props {
    kontaktinformasjon: RestReducer<Kontaktinformasjon>;
}

class EpostContainer extends React.Component<Props> {

    render() {
        return (
            <Epost kontaktinformasjonReducer={this.props.kontaktinformasjon} />
        );
    }
}
const mapStateToProps = (state: AppState) => {
    return ({
        kontaktinformasjon: state.kontaktinformasjon
    });
};

export default connect(mapStateToProps, null)(EpostContainer);
