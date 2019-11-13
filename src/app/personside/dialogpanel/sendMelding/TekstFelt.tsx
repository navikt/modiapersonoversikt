import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import StandardTekstModal from './standardTekster/StandardTekstModal';
import AutocompleteTextarea from '../../../../components/autocomplete-textarea/autocomplete-textarea';

const StyledSkjemagruppe = styled(SkjemaGruppe)`
    position: relative;
    textarea {
        min-height: 9rem;
    }
    label {
        ${theme.visuallyHidden}
    }
`;
const TextareaWrapper = styled.div`
    textarea,
    .textareamirror {
        padding-left: 2.25rem;
    }
`;

interface Props {
    tekst: string;
    navn: string;
    tekstMaksLengde: number;
    updateTekst: (tekst: string) => void;
    feilmelding?: string;
}

function appendTekst(eksisterendeTekst: string, updateTekst: (tekst: string) => void) {
    return (tekst: string) => {
        if (eksisterendeTekst.length > 0) {
            updateTekst(`${eksisterendeTekst}\n${tekst}`);
        } else {
            updateTekst(tekst);
        }
    };
}

function TekstFelt(props: Props) {
    return (
        <StyledSkjemagruppe feil={props.feilmelding ? { feilmelding: props.feilmelding } : undefined}>
            <StandardTekstModal appendTekst={appendTekst(props.tekst, props.updateTekst)} />
            <TextareaWrapper>
                <AutocompleteTextarea
                    value={props.tekst}
                    onChange={e =>
                        props.updateTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)
                    }
                    label={'Melding'}
                    maxLength={props.tekstMaksLengde}
                    placeholder={`Alt du skriver i denne boksen blir synlig for ${props.navn} når du trykker "Del med ${props.navn}"`}
                />
            </TextareaWrapper>
        </StyledSkjemagruppe>
    );
}

export default TekstFelt;
