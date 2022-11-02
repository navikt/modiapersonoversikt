import { OppgaveSkjemaBegrensetTilgangForm, OppgaveSkjemaForm } from './oppgaveInterfaces';

type ErrorObject = { [Property in keyof Partial<OppgaveSkjemaForm>]: string | undefined };

const validatePartialField = <K extends keyof OppgaveSkjemaForm>(
    key: K,
    value: OppgaveSkjemaForm[K],
    errorMessage: string,
    errorObject: ErrorObject
) => {
    if (!value?.length) {
        errorObject[key] = errorMessage;
    }
};

export const resolverOppgaveSkjema = (values: OppgaveSkjemaForm) => {
    const errors: ErrorObject = {};

    const fieldsToValidate: { key: keyof OppgaveSkjemaForm; errorMessage: string }[] = [
        {
            key: 'valgtTema',
            errorMessage: 'Du må velge tema'
        },
        {
            key: 'valgtOppgavetype',
            errorMessage: 'Du må velge oppgavetype'
        },
        {
            key: 'beskrivelse',
            errorMessage: 'Du må skrive beskrivelse'
        },
        {
            key: 'valgtPrioritet',
            errorMessage: 'Du må velge prioritet'
        },
        {
            key: 'valgtEnhet',
            errorMessage: 'Du må velge enhet'
        }
    ];

    fieldsToValidate.forEach((field) => validatePartialField(field.key, values[field.key], field.errorMessage, errors));

    return {
        errors,
        values
    };
};

export const resolverOppgaveSkjemaBegrensetTilgang = (values: OppgaveSkjemaBegrensetTilgangForm) => {
    const errors: ErrorObject = {};

    const fieldsToValidate: { key: keyof OppgaveSkjemaBegrensetTilgangForm; errorMessage: string }[] = [
        {
            key: 'valgtTema',
            errorMessage: 'Du må velge tema'
        },
        {
            key: 'valgtOppgavetype',
            errorMessage: 'Du må velge oppgavetype'
        },
        {
            key: 'beskrivelse',
            errorMessage: 'Du må skrive beskrivelse'
        },
        {
            key: 'valgtPrioritet',
            errorMessage: 'Du må velge prioritet'
        }
    ];

    fieldsToValidate.forEach((field) => validatePartialField(field.key, values[field.key], field.errorMessage, errors));

    return {
        errors,
        values
    };
};
