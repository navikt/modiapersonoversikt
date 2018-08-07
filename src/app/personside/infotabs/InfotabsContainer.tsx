import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../redux/reducers';
import { Person, PersonRespons } from '../../../models/person/person';
import Innholdslaster from '../../../components/Innholdslaster';
import { RestReducer } from '../../../redux/restReducers/restReducer';
import InfoTabs from './InfoTabs';

interface VisittkortContainerProps {
    personReducer: RestReducer<PersonRespons>;
}

class InfoTabsContainer extends React.Component<VisittkortContainerProps> {

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.personReducer]}>
                <InfoTabs fødselsnummer={(this.props.personReducer.data as Person).fødselsnummer}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        personReducer: state.restEndepunkter.personinformasjon
    });
};

export default connect(mapStateToProps, null)(InfoTabsContainer);
