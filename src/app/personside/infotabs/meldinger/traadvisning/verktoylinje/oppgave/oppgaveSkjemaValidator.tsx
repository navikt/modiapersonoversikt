import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import FormValidator, { Valideringsregel } from '../../../../../../../utils/forms/FormValidator';
import { erTomStreng } from '../../../../../../../utils/string-utils';
import React from 'react';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';

const tomtSkjema: OppgaveSkjemaForm = {
    valgtTema: undefined,
    valgtOppgavetype: undefined,
    beskrivelse: '',
    valgtUnderkategori: undefined,
    valgtAnsatt: undefined,
    valgtEnhet: undefined,
    valgtPrioritet: undefined
};

const regler: Valideringsregel<OppgaveSkjemaForm>[] = [
    {
        felt: 'valgtTema',
        feilmelding: <SkjemaelementFeilmelding>Du må velge tema</SkjemaelementFeilmelding>,
        validator: (form: OppgaveSkjemaForm) => !!form.valgtTema
    },
    {
        felt: 'valgtOppgavetype',
        feilmelding: <SkjemaelementFeilmelding>Du må velge oppgavetype</SkjemaelementFeilmelding>,
        validator: (form: OppgaveSkjemaForm) => !!form.valgtOppgavetype
    },
    {
        felt: 'beskrivelse',
        feilmelding: <SkjemaelementFeilmelding>Du må skrive beskrivelse</SkjemaelementFeilmelding>,
        validator: (form: OppgaveSkjemaForm) => !erTomStreng(form.beskrivelse)
    },
    {
        felt: 'valgtEnhet',
        feilmelding: <SkjemaelementFeilmelding>Du må velge enhet</SkjemaelementFeilmelding>,
        validator: (form: OppgaveSkjemaForm) => !!form.valgtEnhet
    },
    {
        felt: 'valgtPrioritet',
        feilmelding: <SkjemaelementFeilmelding>Du må velge prioritet</SkjemaelementFeilmelding>,
        validator: (form: OppgaveSkjemaForm) => !!form.valgtPrioritet
    }
];

export function validerOppgaveSkjema(form: OppgaveSkjemaForm) {
    return new FormValidator(regler).valider(form);
}
export function getValidOppgaveSkjemaState() {
    return new FormValidator<OppgaveSkjemaForm>([]).valider(tomtSkjema);
}
