import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgavePanel from './OppgaveSkjemaContainer';
import styled from 'styled-components';

interface Props {
    lukkPanel: () => void;
}

const PanelStyle = styled.div`
    margin-top: 1.5rem;
`;

function OpprettOppgaveContainer(props: Props) {
    return (
        <PanelStyle>
            <RestResourceConsumer<GsakTema[]> getResource={restResources => restResources.oppgaveGsakTema}>
                {data => <OppgavePanel gsakTema={data} lukkPanel={props.lukkPanel} />}
            </RestResourceConsumer>
        </PanelStyle>
    );
}

export default OpprettOppgaveContainer;
