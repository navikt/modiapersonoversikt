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

function OpprettOppgaveSkjema(props: OppgaveProps & { form: OppgaveSkjemaProps }) {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const request = lagOppgaveRequest(props);
        props.opprettOppgave(request);
    };

    return (
        <form onSubmit={submitHandler}>
            <OppgaveSkjemaElementer {...props} />
        </form>
    );
}

function OppgaveSkjema(props: OppgaveProps) {
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState(OppgavePrioritet.NORM);
    const [beskrivelse, settBeskrivelse] = useState('');

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

    return <OpprettOppgaveSkjema {...props} form={formState} />;
}

export default OppgaveSkjema;
