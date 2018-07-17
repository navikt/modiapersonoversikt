import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';
import Mobiltelefon from './Mobiltelefon';
import { Kontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { RestReducer } from '../../../../../../redux/restReducers/restReducers';

interface Props {
    kontaktinformasjon: RestReducer<Kontaktinformasjon>;
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
        kontaktinformasjon: state.restEndepunkter.kontaktinformasjon
    });
};

export default connect(mapStateToProps, null)(MobiltelefonContainer);
