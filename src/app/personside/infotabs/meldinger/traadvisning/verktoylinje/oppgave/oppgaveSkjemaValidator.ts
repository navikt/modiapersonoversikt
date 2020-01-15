import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import FormValidator, { Valideringsregel } from '../../../../../../../utils/forms/FormValidator';
import { erTomStreng } from '../../../../../../../utils/string-utils';

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
        feilmelding: 'Du må velge tema',
        validator: (form: OppgaveSkjemaForm) => !!form.valgtTema
    },
    {
        felt: 'valgtOppgavetype',
        feilmelding: 'Du må velge oppgavetype',
        validator: (form: OppgaveSkjemaForm) => !!form.valgtOppgavetype
    },
    {
        felt: 'beskrivelse',
        feilmelding: 'Du må skrive beskrivelse',
        validator: (form: OppgaveSkjemaForm) => !erTomStreng(form.beskrivelse)
    },
    {
        felt: 'valgtEnhet',
        feilmelding: 'Du må velge enhet',
        validator: (form: OppgaveSkjemaForm) => !!form.valgtEnhet
    },
    {
        felt: 'valgtPrioritet',
        feilmelding: 'Du må velge prioritet',
        validator: (form: OppgaveSkjemaForm) => !!form.valgtPrioritet
    }
];

export function validerOppgaveSkjema(form: OppgaveSkjemaForm) {
    return new FormValidator(regler).valider(form);
}
export function getValidOppgaveSkjemaState() {
    return new FormValidator<OppgaveSkjemaForm>([]).valider(tomtSkjema);
}
