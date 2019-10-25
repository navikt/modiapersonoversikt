import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import FormValidator, { Valideringsregel } from '../../../../../../../utils/forms/FormValidator';
import { erTomStreng } from '../../../../../../../utils/string-utils';
import { OppgavePrioritet } from '../../../../../../../models/meldinger/oppgave';

const tomtSkjema: OppgaveSkjemaForm = {
    valgtTema: undefined,
    valgtOppgavetype: undefined,
    beskrivelse: '',
    valgtUnderkategori: undefined,
    valgtEnhet: undefined,
    valgtPrioritet: OppgavePrioritet.NORM
};

const regler: Valideringsregel<OppgaveSkjemaForm>[] = [
    {
        felt: 'valgtTema',
        feilmelding: 'Du må velge tema',
        validator: (form: OppgaveSkjemaForm) => !form.valgtTema
    },
    {
        felt: 'valgtOppgavetype',
        feilmelding: 'Du må velge oppgavetype',
        validator: (form: OppgaveSkjemaForm) => !form.valgtOppgavetype
    },
    {
        felt: 'beskrivelse',
        feilmelding: 'Du må velge tema',
        validator: (form: OppgaveSkjemaForm) => erTomStreng(form.beskrivelse)
    },
    {
        felt: 'valgtUnderkategori',
        feilmelding: 'Du må velge underkategori',
        validator: (form: OppgaveSkjemaForm) => !form.valgtUnderkategori
    },
    {
        felt: 'valgtEnhet',
        feilmelding: 'Du må velge enhet',
        validator: (form: OppgaveSkjemaForm) => !form.valgtEnhet
    }
];

export function validerOppgaveSkjema(form: OppgaveSkjemaForm) {
    return new FormValidator(regler).valider(form);
}
export function getValidOppgaveSkjemaState() {
    return new FormValidator<OppgaveSkjemaForm>([]).valider(tomtSkjema);
}
export function opprettOppgaveSkjemaHarNokInformasjonTilOpprettOppgave(skjema: OppgaveSkjemaForm) {
    return (
        !erTomStreng(skjema.beskrivelse) &&
        skjema.valgtEnhet &&
        skjema.valgtOppgavetype &&
        skjema.valgtUnderkategori &&
        skjema.valgtTema
    );
}
