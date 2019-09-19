import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgaveSkjemaContainer from './OppgaveSkjemaContainer';

interface Props {
    lukkPanel: () => void;
    kontorsperreFunksjon?: () => void;
}

function OpprettOppgaveContainer(props: Props) {
    return (
        <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
            {data => (
                <OppgaveSkjemaContainer
                    gsakTema={data}
                    lukkPanel={props.lukkPanel}
                    kontorsperreFunksjon={props.kontorsperreFunksjon}
                />
            )}
        </RestResourceConsumer>
    );
}

export default OpprettOppgaveContainer;
