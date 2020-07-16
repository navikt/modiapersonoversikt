import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { setNyBrukerIPath } from '../routes/routing';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import useFormstate from '@nutgaard/use-formstate';
import { feilmelding } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { fnr } from '@navikt/fnrvalidator';

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

function lagFeilmelding(error: ErrorReason): string {
    switch (error) {
        case 'fnr or dnr must consist of 11 digits':
            return 'Fødselsnummeret må kun inneholde tall';
        case "checksums don't match":
        case 'invalid date':
            return 'Fødselsnummeret er ikke gyldig';
    }
}

const validering = useFormstate<PersonSokForm>(values => {
    const fnrValidation = fnr(values.fødselsnummer);
    if (fnrValidation.status === 'invalid') {
        return { fødselsnummer: lagFeilmelding(fnrValidation.reasons[0]) };
    } else {
        return { fødselsnummer: undefined };
    }
});

function PersonSokInput() {
    const history = useHistory();
    const initialValues: PersonSokForm = {
        fødselsnummer: ''
    };
    const state = validering(initialValues);

    function submit<S>(values: PersonSokForm): Promise<any> {
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
