import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import OppfolgingVisning from './OppfolgingVisningKomponent';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';

function OppfolgingContainer() {
    return (
        <RestResourceConsumer<DetaljertOppfolging>
            getResource={restResources => restResources.oppfolging}
            returnOnPending={BigCenteredLazySpinner}
        >
            {data => <OppfolgingVisning detaljertOppfolging={data} />}
        </RestResourceConsumer>
    );
}

export default OppfolgingContainer;
