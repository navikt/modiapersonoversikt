import FormValidator, { Valideringsregel } from '../../../../../../../../utils/forms/FormValidator';
import { OppgaveSkjemaForm } from '../oppgaveInterfaces';
import { erTomStreng } from '../../../../../../../../utils/string-utils';

const reglerSkjermetPerson: Valideringsregel<OppgaveSkjemaForm>[] = [
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
        felt: 'valgtPrioritet',
        feilmelding: 'Du må velge prioritet',
        validator: (form: OppgaveSkjemaForm) => !!form.valgtPrioritet
    }
];

export function validerOppgaveSkjemaSkjermetPerson(form: OppgaveSkjemaForm) {
    return new FormValidator(reglerSkjermetPerson).valider(form);
}
