import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, RestReducer } from '../../../../../../redux/reducer';
import Mobiltelefon from './Mobiltelefon';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';

interface Props {
    kontaktinformasjon: RestReducer<KRRKontaktinformasjon>;
}

class MobiltelefonContainer extends React.Component<Props> {

    render() {
        return (
            <Mobiltelefon kontaktinformasjonReducer={this.props.kontaktinformasjon} />
        );
    }
}
const mapStateToProps = (state: AppState) => {
    return ({
        kontaktinformasjon: state.kontaktinformasjon
    });
};

export default connect(mapStateToProps, null)(MobiltelefonContainer);
