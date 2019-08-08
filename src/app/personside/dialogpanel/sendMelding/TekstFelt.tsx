import * as React from 'react';
import { NyMeldingValidator } from './validatorer';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { FormState } from './SendNyMelding';
import styled from 'styled-components';

const Style = styled(SkjemaGruppe)`
    textarea {
        min-height: 9rem;
    }
`;

interface Props {
    formState: FormState;
    navn: string;
    tekstMaksLengde: number;
    updateTekst: (tekst: string) => void;
}

function TekstFelt(props: Props) {
    return (
        <Style
            feil={
                !NyMeldingValidator.tekst(props.formState) && props.formState.visFeilmeldinger
                    ? { feilmelding: `Du må skrive en tekst på mellom 0 og ${props.tekstMaksLengde} tegn` }
                    : undefined
            }
        >
            <Textarea
                value={props.formState.tekst}
                onChange={e => props.updateTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label={'Melding'}
                maxLength={props.tekstMaksLengde}
                placeholder={`Alt du skriver i denne boksen blir synlig for brukeren når du trykker "Del med ${
                    props.navn
                }"`}
            />
        </Style>
    );
}

export default TekstFelt;
