import * as React from 'react';
import { NyMeldingValidator } from './validatorer';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { FormState } from './SendNyMelding';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import StandardTekstModal from './standardTekster/StandardTekstModal';

const StyledSkjemagruppe = styled(SkjemaGruppe)`
    margin-top: 1rem;
    textarea {
        min-height: 9rem;
    }
    label {
        ${theme.visuallyHidden}
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
        <StyledSkjemagruppe
            feil={
                !NyMeldingValidator.tekst(props.formState) && props.formState.visFeilmeldinger
                    ? { feilmelding: `Du må skrive en tekst på mellom 0 og ${props.tekstMaksLengde} tegn` }
                    : undefined
            }
        >
            <StandardTekstModal appendTekst={tekst => props.updateTekst(`${props.formState.tekst}\n${tekst}`)} />
            <Textarea
                value={props.formState.tekst}
                onChange={e => props.updateTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label={'Melding'}
                maxLength={props.tekstMaksLengde}
                placeholder={`Alt du skriver i denne boksen blir synlig for ${props.navn} når du trykker "Del med ${props.navn}"`}
            />
        </StyledSkjemagruppe>
    );
}

export default TekstFelt;
