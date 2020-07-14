import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { setNyBrukerIPath } from '../routes/routing';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import useFormstate from '@nutgaard/use-formstate';
import { feilmelding } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';

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

const validator = useFormstate<PersonSokForm>(values => {
    let fødselsnummer = undefined;
    if (!/^\d+$/.test(values.fødselsnummer)) {
        fødselsnummer = 'Fødselsnummeret kan kun inneholde tall';
    }
    if (values.fødselsnummer.length !== 11) {
        fødselsnummer = 'Fødselsnummeret må inneholde 11 siffer';
    }
    return { fødselsnummer };
});

function PersonSokInput() {
    const history = useHistory();
    const initialValues: PersonSokForm = {
        fødselsnummer: ''
    };
    const state = validator(initialValues);

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
