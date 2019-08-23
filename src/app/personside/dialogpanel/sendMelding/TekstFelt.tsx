import * as React from 'react';
import { NyMeldingValidator } from './validatorer';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { FormState } from './SendNyMelding';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import StandardTekstModal from './standardTekster/StandardTekstModal';
import { autofullfor, byggAutofullforMap } from './standardTekster/sokUtils';
import { captitalize } from '../../../../utils/stringFormatting';
import { InnloggetSaksbehandler } from '../../../../models/innloggetSaksbehandler';
import { PersonRespons } from '../../../../models/person/person';
import { NavKontorResponse } from '../../../../models/navkontor';
import MultiRestResourceConsumer from '../../../../rest/consumer/MultiRestResourceConsumer';

const StyledSkjemagruppe = styled(SkjemaGruppe)`
    position: relative;
    margin-top: 1rem;
    textarea {
        min-height: 9rem;
    }
    label {
        ${theme.visuallyHidden}
    }
`;
const TextareaWrapper = styled.div`
    textarea {
        padding-left: 2rem;:
    }
`;

interface Props {
    formState: FormState;
    navn: string;
    tekstMaksLengde: number;
    updateTekst: (tekst: string) => void;
}

type AutofullforData = { person: PersonRespons; saksbehandler: InnloggetSaksbehandler; kontor: NavKontorResponse };

function appendTekst(eksisterendeTekst: string, updateTekst: (tekst: string) => void, data: AutofullforData) {
    return (tekst: string, locale: string) => {
        const nokler = byggAutofullforMap(data.person, data.kontor, data.saksbehandler, locale);
        const ferdig = captitalize(autofullfor(tekst, nokler));

        if (eksisterendeTekst.length > 0) {
            updateTekst(`${eksisterendeTekst}\n${ferdig}`);
        } else {
            updateTekst(ferdig);
        }
    };
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
            <MultiRestResourceConsumer<AutofullforData>
                getResource={restResources => ({
                    person: restResources.personinformasjon,
                    saksbehandler: restResources.innloggetSaksbehandler,
                    kontor: restResources.brukersNavKontor
                })}
            >
                {(data: AutofullforData) => {
                    return (
                        <StandardTekstModal appendTekst={appendTekst(props.formState.tekst, props.updateTekst, data)} />
                    );
                }}
            </MultiRestResourceConsumer>
            <TextareaWrapper>
                <Textarea
                    value={props.formState.tekst}
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
