import * as React from 'react';
import { FormEvent } from 'react';
import { useRestResource } from '../../../../utils/customHooks';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import { Meldingstype, Traad } from '../../../../models/meldinger/meldinger';
import TidligereMeldinger from './tidligereMeldinger/TidligereMeldinger';
import VelgDialogType from './VelgDialogType';
import { Oppgave } from '../../../../models/oppgave';
import TekstFelt from '../sendMelding/TekstFelt';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import { UnmountClosed } from 'react-collapse';
import { Hovedknapp } from 'nav-frontend-knapper';
import Temavelger from '../component/Temavelger';
import { FormStyle } from '../fellesStyling';
import { tekstMaksLengde } from '../sendMelding/SendNyMelding';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import BrukerKanSvare from './BrukerKanSvare';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { FortsettDialogValidator } from './validatorer';
import { FortsettDialogState } from './FortsettDialogContainer';

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

const SubmitKnapp = styled(Hovedknapp)`
    margin-top: 1rem;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

const Margin = styled.div`
    /* Pga React Collapse må vi slenge på noen div'er som tar seg av marginer for å unngå hopp i animasjon */
`;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: FortsettDialogState;
    updateState: (change: Partial<FortsettDialogState>) => void;
    traad: Traad;
    oppgave?: Oppgave;
}

function FortsettDialog(props: Props) {
    const { state, updateState, handleAvbryt, handleSubmit } = props;
    const personinformasjon = useRestResource(resources => resources.personinformasjon);

    const navn = isLoadedPerson(personinformasjon)
        ? capitalizeName(personinformasjon.data.navn.fornavn || '')
        : 'bruker';

    const erDelsvar = state.dialogType === Meldingstype.DELVIS_SVAR_SKRIFTLIG;
    const erTilknyttetOppgave = state.oppgave !== undefined;
    const brukerKanIkkeSvareInfo = [
        Meldingstype.SVAR_OPPMOTE,
        Meldingstype.SVAR_TELEFON,
        Meldingstype.SVAR_SKRIFTLIG
    ].includes(state.dialogType);
    const brukerKanSvareValg = state.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

    return (
        <StyledArticle>
            <Undertittel>Fortsett dialog</Undertittel>
            <FormStyle onSubmit={handleSubmit}>
                <TidligereMeldinger traad={props.traad} />
                <TekstFelt
                    tekst={state.tekst}
                    navn={navn}
                    tekstMaksLengde={tekstMaksLengde}
                    updateTekst={tekst => updateState({ tekst: tekst })}
                    feilmelding={
                        !FortsettDialogValidator.tekst(state) && state.visFeilmeldinger
                            ? `Du må skrive en tekst på mellom 0 og ${tekstMaksLengde} tegn`
                            : undefined
                    }
                />
                <VelgDialogType
                    formState={state}
                    updateDialogType={dialogType => updateState({ dialogType: dialogType })}
                    erTilknyttetOppgave={erTilknyttetOppgave}
                />
                <Margin>
                    <UnmountClosed isOpened={brukerKanIkkeSvareInfo}>
                        <AlertStripeInfo>Bruker kan ikke svare</AlertStripeInfo>
                    </UnmountClosed>
                    <UnmountClosed isOpened={brukerKanSvareValg}>
                        <BrukerKanSvare formState={state} updateFormState={updateState} />
                    </UnmountClosed>
                    <UnmountClosed isOpened={erDelsvar} hasNestedCollapse={true}>
                        {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                        <Temavelger
                            setTema={tema => updateState({ tema: tema })}
                            tema={state.tema}
                            visFeilmelding={!FortsettDialogValidator.tema(state) && state.visFeilmeldinger}
                        />
                    </UnmountClosed>
                </Margin>
                <SubmitKnapp htmlType="submit">
                    {erDelsvar
                        ? `Skriv delsvar og legg tilbake på ${
                              state.tema ? state.tema.beskrivelse.toLowerCase() : 'tema'
                          }`
                        : `Del med ${navn}`}
                </SubmitKnapp>
                {!erTilknyttetOppgave && (
                    <StyledKnappMedBekreftPopup type="flat" onBekreft={handleAvbryt}>
                        Avbryt
                    </StyledKnappMedBekreftPopup>
                )}
            </FormStyle>
        </StyledArticle>
    );
}

export default FortsettDialog;
