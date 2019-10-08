import React, { FormEvent, useState } from 'react';
import {
    Enhet,
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
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';

const ValideringsfeilStyle = styled.div`
    padding-top: ${theme.margin.layout};
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

    if (!props.state.valgtEnhet) {
        tommeKomponenter.push('Enhet');
    }

    if (!props.state.valgtAnsatt) {
        tommeKomponenter.push('Ansatt');
    }

    if (tommeKomponenter.length > 0) {
        return 'Følgende felt er ikke satt: ' + tommeKomponenter.join(', ');
    }

    return undefined;
}

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtEnhet, settValgtEnhet] = useState<Enhet | undefined>(undefined);
    const [valgtAnsatt, settValgtAnsatt] = useState<Ansatt | undefined>(undefined);
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
            valgtEnhet,
            valgtAnsatt,
            valgtPrioritet,
            beskrivelse
        },
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtEnhet,
            settValgtAnsatt,
            settValgtPrioritet,
            settBeskrivelse
        }
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const harSkjemaValideringsfeil = skjemavalidering(formState);
        settValideringsfeil(harSkjemaValideringsfeil);
        if (!harSkjemaValideringsfeil) {
            const request = lagOppgaveRequest(props, formState, valgtBrukersFnr, props.valgtTraad);
            props.opprettOppgave(request);
            if (props.kontorsperreFunksjon) {
                props.kontorsperreFunksjon();
            }
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
