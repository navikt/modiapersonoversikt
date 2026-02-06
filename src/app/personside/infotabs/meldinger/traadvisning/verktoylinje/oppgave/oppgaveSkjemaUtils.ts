import type { FieldError } from 'react-hook-form';
import { buildFieldError } from 'src/components/form/formUtils';
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

const velgUnderkategori: { key: keyof OppgaveSkjemaBegrensetTilgangForm; errorMessage: string } = {
    key: 'valgtUnderkategori',
    errorMessage: 'Du må velge underkategori'
};

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

export function resolverOppgaveSkjema(values: OppgaveSkjemaForm) {
    const errors: ErrorObject = {};
    const gjelderErOblig = values.valgtTema === 'AAP';

    const fieldsToValidateWithEnhet: { key: keyof OppgaveSkjemaForm; errorMessage: string }[] = [
        ...fieldsToValidate,
        {
            key: 'valgtEnhet',
            errorMessage: 'Du må velge enhet'
        }
    ];

    const allFieldsToValidate: { key: keyof OppgaveSkjemaForm; errorMessage: string }[] = gjelderErOblig
        ? [...fieldsToValidateWithEnhet, velgUnderkategori]
        : fieldsToValidateWithEnhet;

    // biome-ignore lint/suspicious/useIterableCallbackReturn: ""
    allFieldsToValidate.forEach((field) =>
        validatePartialField(field.key, values[field.key], field.errorMessage, errors)
    );

    return {
        errors,
        values
    };
}

export function resolverOppgaveSkjemaBegrensetTilgang(values: OppgaveSkjemaBegrensetTilgangForm) {
    const errors: ErrorObject = {};
    const gjelderErOblig = values.valgtTema === 'AAP';

    const allFieldsToValidate: { key: keyof OppgaveSkjemaBegrensetTilgangForm; errorMessage: string }[] = gjelderErOblig
        ? [...fieldsToValidate, velgUnderkategori]
        : fieldsToValidate;
    // biome-ignore lint/suspicious/useIterableCallbackReturn: ""
    allFieldsToValidate.forEach((field) =>
        validatePartialField(field.key, values[field.key], field.errorMessage, errors)
    );

    return {
        errors,
        values
    };
}
