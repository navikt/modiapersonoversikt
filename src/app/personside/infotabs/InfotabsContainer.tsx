import * as React from 'react';
import { PersonRespons } from '../../../models/person/person';
import InfoTabs from './InfoTabs';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';

function InfoTabsContainer() {
    return (
        <RestResourceConsumer<PersonRespons> getResource={restResources => restResources.personinformasjon}>
            {person => <InfoTabs personRespons={person} />}
        </RestResourceConsumer>
    );
}

export default InfoTabsContainer;
