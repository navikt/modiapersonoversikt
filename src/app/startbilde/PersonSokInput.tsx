import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { setNyBrukerIPath } from '../routes/routing';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import formstateFactory from '@nutgaard/use-formstate';
import { feilmelding } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
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

function lagFeilmelding(error: FnrValidationError | undefined): string | undefined {
    switch (error) {
        case FnrValidationError.LENGTH:
        case FnrValidationError.NUMBERS_ONLY:
            return 'Fødselsnummeret må inneholde 11 siffer';
        case FnrValidationError.CONTROL_FAILED:
            return 'Fødselsnummeret er ikke gyldig';
        default:
            return undefined;
    }
}

const validering = formstateFactory<PersonSokForm>((values) => {
    return { fødselsnummer: lagFeilmelding(validerIdent(values.fødselsnummer)) };
});

function PersonSokInput() {
    const history = useHistory();
    const initialValues: PersonSokForm = {
        fødselsnummer: ''
    };
    const state = validering(initialValues);

    function submit(values: PersonSokForm): Promise<any> {
        setNyBrukerIPath(history, values.fødselsnummer);
        return Promise.resolve();
    }
    return (
        <div>
            <Form onSubmit={state.onSubmit(submit)}>
                <Input
                    feil={feilmelding(state.fields.fødselsnummer)}
                    placeholder="Personsøk"
                    label="Personsøk"
                    {...state.fields.fødselsnummer.input}
                />
            </Form>
        </div>
    );
}

export default PersonSokInput;
