import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgaveSkjemaContainer from './OppgaveSkjemaContainer';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

interface Props {
    lukkPanel: () => void;
    kontorsperreFunksjon?: () => void;
    valgtTraad?: Traad;
}

function OpprettOppgaveContainer(props: Props) {
    return (
        <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
            {data => (
                <OppgaveSkjemaContainer
                    gsakTema={data}
                    lukkPanel={props.lukkPanel}
                    kontorsperreFunksjon={props.kontorsperreFunksjon}
                    valgtTraad={props.valgtTraad}
                />
            )}
        </RestResourceConsumer>
    );
}

export default OpprettOppgaveContainer;
