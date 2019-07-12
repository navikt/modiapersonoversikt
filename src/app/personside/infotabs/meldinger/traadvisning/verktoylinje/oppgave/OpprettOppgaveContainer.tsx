import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgaveSkjemaContainer from './OppgaveSkjemaContainer';
import styled from 'styled-components';

interface Props {
    lukkPanel: () => void;
    kontorsperreFunksjon?: () => void;
}

const PanelStyle = styled.div`
    margin-top: 1.5rem;
`;

function OpprettOppgaveContainer(props: Props) {
    return (
        <PanelStyle>
            <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
                {data => (
                    <OppgaveSkjemaContainer
                        gsakTema={data}
                        lukkPanel={props.lukkPanel}
                        kontorsperreFunksjon={props.kontorsperreFunksjon}
                    />
                )}
            </RestResourceConsumer>
        </PanelStyle>
    );
}

export default OpprettOppgaveContainer;
