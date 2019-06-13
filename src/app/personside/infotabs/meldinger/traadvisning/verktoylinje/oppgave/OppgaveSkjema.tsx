import React, { FormEvent, useState } from 'react';
import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaElementer } from './OppgaveSkjemaElementer';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components';
import theme from '../../../../../../../styles/personOversiktTheme';

const ValideringsfeilStyle = styled.div`
    margin-top: ${theme.margin.layout};
    color: #d0021b;
`;

function skjemavalidering(props: OppgaveSkjemaProps): string | undefined {
    const tommeKomponenter = [];

    if (!props.state.valgtTema) {
        tommeKomponenter.push('Tema');
    }

    if (!props.state.valgtOppgavetype) {
        tommeKomponenter.push('Oppgavetype');
    }

    if (!props.state.valgtPrioritet) {
        tommeKomponenter.push('Prioritet');
    }

    if (!props.state.beskrivelse) {
        tommeKomponenter.push('Beskrivelse');
    }

    if (tommeKomponenter.length > 0) {
        return 'Følgende felt er ikke satt: ' + tommeKomponenter.join(', ');
    }

    return undefined;
}

function OppgaveSkjema(props: OppgaveProps) {
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState(OppgavePrioritet.NORM);
    const [beskrivelse, settBeskrivelse] = useState('');
    const [valideringsfeil, settValideringsfeil] = useState<string | undefined>(undefined);

    function oppdaterStateVedValgtTema(tema: GsakTema | undefined) {
        settValgtTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }
    }

    const formState: OppgaveSkjemaProps = {
        state: {
            valgtTema,
            valgtUnderkategori,
            valgtOppgavetype,
            valgtPrioritet,
            beskrivelse
        },
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtPrioritet,
            settBeskrivelse
        }
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const harSkjemaValideringsfeil = skjemavalidering(formState);
        settValideringsfeil(harSkjemaValideringsfeil);
        if (!harSkjemaValideringsfeil) {
            const request = lagOppgaveRequest(props, formState);
            props.opprettOppgave(request);
            props.lukkPanel();
        }
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <OppgaveSkjemaElementer {...props} form={formState} />
            </form>
            <ValideringsfeilStyle aria-live={'polite'}>{valideringsfeil}</ValideringsfeilStyle>
        </>
    );
}

export default OppgaveSkjema;
