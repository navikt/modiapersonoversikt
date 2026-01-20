import type { FieldError } from 'react-hook-form';
import { buildFieldError } from '../../../../../../../components/form/formUtils';
import type { OppgaveSkjemaBegrensetTilgangForm, OppgaveSkjemaForm } from './oppgaveInterfaces';

type ErrorObject = { [Property in keyof Partial<OppgaveSkjemaForm>]: FieldError | undefined };

const validatePartialField = <K extends keyof OppgaveSkjemaForm>(
    key: K,
    value: OppgaveSkjemaForm[K],
    errorMessage: string,
    errorObject: ErrorObject
) => {
    if (!value?.length) {
        errorObject[key] = buildFieldError(errorMessage);
    }
};

export function resolverOppgaveSkjema(values: OppgaveSkjemaForm) {
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
            key: 'valgtEnhet',
            errorMessage: 'Du må velge enhet'
        },
        {
            key: 'valgtPrioritet',
            errorMessage: 'Du må velge prioritet'
        },
        {
            key: 'beskrivelse',
            errorMessage: 'Du må skrive beskrivelse'
        }
    ];

    // biome-ignore lint/suspicious/useIterableCallbackReturn: ""
    fieldsToValidate.forEach((field) => validatePartialField(field.key, values[field.key], field.errorMessage, errors));

    return {
        errors,
        values
    };
}

export function resolverOppgaveSkjemaBegrensetTilgang(values: OppgaveSkjemaBegrensetTilgangForm) {
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
            key: 'valgtPrioritet',
            errorMessage: 'Du må velge prioritet'
        },
        {
            key: 'beskrivelse',
            errorMessage: 'Du må skrive beskrivelse'
        }
    ];

    // biome-ignore lint/suspicious/useIterableCallbackReturn: ""
    fieldsToValidate.forEach((field) => validatePartialField(field.key, values[field.key], field.errorMessage, errors));

    return {
        errors,
        values
    };
}
