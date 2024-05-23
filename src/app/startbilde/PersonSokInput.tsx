import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { FnrValidationError, validerIdent } from '../../utils/fnr-utils';
import { FieldError, useForm } from 'react-hook-form';
import { buildFieldError } from '../../components/form/formUtils';
import FormInput from '../../components/form/FormInput';
import { useSettAktivBruker } from '../../utils/customHooks';

const Form = styled.form`
    margin-top: 2rem;
    transform: scale(1.3);
    .skjemaelement {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    label {
        ${theme.visuallyHidden};
    }
    input {
        width: 10rem;
    }
`;

type PersonSokForm = {
    fødselsnummer: string;
};

function resolver(values: PersonSokForm) {
    const errors: { fødselsnummer?: FieldError } = {};
    const identError = validerIdent(values.fødselsnummer);

    if (identError) {
        const errorMessage = lagFeilmelding(identError);
        errors.fødselsnummer = buildFieldError(errorMessage);
    }

    return { errors, values };
}

function lagFeilmelding(error?: FnrValidationError): string {
    switch (error) {
        case FnrValidationError.LENGTH:
        case FnrValidationError.NUMBERS_ONLY:
            return 'Fødselsnummeret må inneholde 11 siffer';
        case FnrValidationError.CONTROL_FAILED:
            return 'Fødselsnummeret er ikke gyldig';
        default:
            return '';
    }
}

function PersonSokInput() {
    const settAktivBruker = useSettAktivBruker();

    const form = useForm<PersonSokForm>({
        mode: 'onChange',
        resolver,
        shouldFocusError: false
    });

    function submit(values: PersonSokForm): Promise<any> {
        settAktivBruker(values.fødselsnummer);
        return Promise.resolve();
    }

    return (
        <div>
            <Form onSubmit={form.handleSubmit(submit)}>
                <FormInput form={form} name="fødselsnummer" label="Personsøk" placeholder="Personsøk" />
            </Form>
        </div>
    );
}

export default PersonSokInput;
