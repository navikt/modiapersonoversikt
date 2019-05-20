import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgavePanel from './OppgavePanelContainer';

interface Props {
    lukkPanel: () => void;
}

function OppgaveContainer(props: Props) {
    return (
        <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
            {data => <OppgavePanel gsakTema={data} lukkPanel={props.lukkPanel} />}
        </RestResourceConsumer>
    );
}

export default OppgaveContainer;
