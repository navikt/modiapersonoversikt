import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgavePanel from './OppgavePanelContainer';

function OppgaveContainer() {
    return (
        <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
            {data => <OppgavePanel gsakTema={data} />}
        </RestResourceConsumer>
    );
}

export default OppgaveContainer;
