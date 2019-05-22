import React, { FormEvent, useState } from 'react';
import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaElementer } from './OppgaveSkjemaElementer';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjema } from './oppgaveInterfaces';

function OpprettOppgaveSkjema(props: OppgaveProps & { form: OppgaveSkjema }) {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const request = lagOppgaveRequest(props);
        console.log('Skal lagre ', request);
        props.opprettOppgave(request);
    };

    return (
        <form onSubmit={submitHandler}>
            <OppgaveSkjemaElementer {...props} />
        </form>
    );
}

function OppgavePanel(props: OppgaveProps) {
    const [valgtTema, velgTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState(OppgavePrioritet.NORM);
    const [beskrivelse, settBeskrivelse] = useState('');

    function settValgtTema(tema: GsakTema | undefined) {
        velgTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }
    }

    const formState: OppgaveSkjema = {
        state: {
            valgtTema,
            valgtUnderkategori,
            valgtOppgavetype,
            valgtPrioritet,
            beskrivelse
        },
        actions: {
            settValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtPrioritet,
            settBeskrivelse
        }
    };

    return <OpprettOppgaveSkjema {...props} form={formState} />;
}

export default OppgavePanel;
