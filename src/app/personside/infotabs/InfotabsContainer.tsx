import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../redux/reducers';
import { PersonRespons } from '../../../models/person/person';
import Innholdslaster from '../../../components/Innholdslaster';
import { Loaded, RestResource } from '../../../redux/restReducers/restResource';
import InfoTabs from './InfoTabs';

interface VisittkortContainerProps {
    personResource: RestResource<PersonRespons>;
}

class InfoTabsContainer extends React.Component<VisittkortContainerProps> {
    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.personResource]}>
                <InfoTabs personRespons={(this.props.personResource as Loaded<PersonRespons>).data} />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        personResource: state.restResources.personinformasjon
    };
};

export default connect(
    mapStateToProps,
    null
)(InfoTabsContainer);
