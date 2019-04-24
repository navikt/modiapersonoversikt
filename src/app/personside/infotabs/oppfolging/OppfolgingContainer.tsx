import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

function OppfolgingContainer() {
    return (
        <RestResourceConsumer<DetaljertOppfolging> getResource={restResources => restResources.oppfolging}>
            {data => <OppfolgingVisning detaljertOppfølging={data} />}
        </RestResourceConsumer>
    );
}

export default OppfolgingContainer;
