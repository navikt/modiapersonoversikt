import * as React from 'react';
import { Varsel } from '../../../../models/varsel';
import Varsler from './Varsler';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

function VarslerContainer() {
    return (
        <RestResourceConsumer<Varsel[]> getResource={restResources => restResources.brukersVarsler}>
            {data => <Varsler varsler={data} />}
        </RestResourceConsumer>
    );
}

export default VarslerContainer;
