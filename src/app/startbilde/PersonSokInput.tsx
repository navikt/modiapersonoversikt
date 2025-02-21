import { type FieldError, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormInput from '../../components/form/FormInput';
import { buildFieldError } from '../../components/form/formUtils';
import theme from '../../styles/personOversiktTheme';
import { useSettAktivBruker } from '../../utils/customHooks';
import { FnrValidationError, validerIdent } from '../../utils/fnr-utils';

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //biome-ignore lint/suspicious/noExplicitAny: biome migration
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
