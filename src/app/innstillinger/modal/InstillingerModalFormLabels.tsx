import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import styled from 'styled-components';

const Label = styled.span`
    display: flex;
    }
    .popover {
      max-width: 30rem;
    }
    .hjelpetekst__apneknapp {
        margin-left: 0.5rem;
    }
`;

export const OppgaveDestinasjonLabel = (
    <Label>
        <b>Destinasjon for oppgave ved svar</b>
        <Hjelpetekst id="OppgaveDestinasjonLabel" type={PopoverOrientering.UnderVenstre}>
            Setter standardvalget for hvor oppgaver skal sendes når bruker svarer. Det vil fortsatt være mulig å
            overstyre dette ved utsending.
        </Hjelpetekst>
    </Label>
);
