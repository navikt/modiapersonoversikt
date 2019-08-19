import * as React from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

const StyledSkjemagruppe = styled(SkjemaGruppe)`
    textarea {
        min-height: 9rem;
    }
    label {
        ${theme.visuallyHidden}
    }
`;

interface Props {
    tekst: string;
    navn: string;
    tekstMaksLengde: number;
    updateTekst: (tekst: string) => void;
    feilmelding?: string;
}

function TekstFelt(props: Props) {
    return (
        <StyledSkjemagruppe feil={props.feilmelding ? { feilmelding: props.feilmelding } : undefined}>
            <Textarea
                value={props.tekst}
                onChange={e => props.updateTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                label={'Melding'}
                maxLength={props.tekstMaksLengde}
                placeholder={`Alt du skriver i denne boksen blir synlig for ${props.navn} når du trykker "Del med ${props.navn}"`}
            />
        </StyledSkjemagruppe>
    );
}

export default TekstFelt;
