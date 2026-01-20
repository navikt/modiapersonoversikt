import { SkjemaGruppe } from 'nav-frontend-skjema';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { useRef } from 'react';
import styled from 'styled-components';
import AutocompleteTextarea from '../../../../components/autocomplete-textarea/autocomplete-textarea';
import theme from '../../../../styles/personOversiktTheme';
import StandardTekstModal from './standardTekster/StandardTekstModal';

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

function appendTekst(
    eksisterendeTekst: string,
    updateTekst: (tekst: string) => void,
    focusRef: HTMLTextAreaElement | null
) {
    return (tekst: string) => {
        if (eksisterendeTekst.length > 0) {
            updateTekst(`${eksisterendeTekst}\n${tekst}`);
        } else {
            updateTekst(tekst);
        }
        setTimeout(() => focusRef?.focus(), 0); // hack for å legge den bak på stacken, ellers havner fokus feil
    };
}

function TekstFelt(props: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <StyledSkjemagruppe
            feil={
                props.feilmelding ? <SkjemaelementFeilmelding>{props.feilmelding}</SkjemaelementFeilmelding> : undefined
            }
        >
            <StandardTekstModal appendTekst={appendTekst(props.tekst, props.updateTekst, textareaRef.current)} />
            <TextareaWrapper>
                <AutocompleteTextarea
                    value={props.tekst}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //biome-ignore lint/suspicious/noAssignInExpressions: biome migration
                    textareaRef={(ref) => (textareaRef.current = ref)}
                    onChange={(e) => props.updateTekst(e.currentTarget.value)}
                    label={'Melding'}
                    maxLength={props.tekstMaksLengde}
                    placeholder={`Alt du skriver i denne boksen blir synlig for ${props.navn} når du trykker "Del med ${props.navn}"`}
                />
            </TextareaWrapper>
        </StyledSkjemagruppe>
    );
}

export default TekstFelt;
