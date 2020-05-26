import * as React from 'react';
import { useState } from 'react';
import { Input, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { setNyBrukerIPath } from '../routes/routing';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';

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

function PersonSokInput() {
    const [input, setInput] = useState('');
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const history = useHistory();

    const handleSok = (event: React.FormEvent) => {
        event.preventDefault();
        if (!/^\d+$/.test(input)) {
            setFeilmelding('Fødselsnummeret kan kun inneholde tall');
            return;
        }
        if (input.length !== 11) {
            setFeilmelding('Fødselsnummeret må inneholde 11 siffer');
            return;
        }
        setNyBrukerIPath(history, input);
    };

    return (
        <div>
            <Form onSubmit={handleSok}>
                <Input
                    feil={feilmelding ? <SkjemaelementFeilmelding>{feilmelding}</SkjemaelementFeilmelding> : undefined}
                    placeholder="Personsøk"
                    label="Personsøk"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                />
            </Form>
        </div>
    );
}

export default PersonSokInput;
