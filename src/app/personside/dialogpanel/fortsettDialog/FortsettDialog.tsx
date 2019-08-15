import * as React from 'react';
import { FormEvent, useState } from 'react';
import { useAppState, useRestResource } from '../../../../utils/customHooks';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import TidligereMeldinger from './TidligereMeldinger';
import VelgDialogType from './VelgDialogType';
import { Kodeverk } from '../../../../models/kodeverk';
import { Oppgave } from '../../../../models/oppgave';
import TekstFelt from '../sendMelding/TekstFelt';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import { UnmountClosed } from 'react-collapse';
import { Hovedknapp } from 'nav-frontend-knapper';
import Temavelger from '../component/Temavelger';
import LeggTilbakepanel from './LeggTilbakepanel';
import { useDispatch } from 'react-redux';
import { setDialogpanelTraad } from '../../../../redux/oppgave/actions';
import { FormStyle } from '../fellesStyling';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import BrukerKanSvare from './BrukerKanSvare';
import styled from 'styled-components';

export type FortsettDialogType =
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.SVAR_TELEFON; //TODO riktige typer her

export interface FortsettDialogState {
    tekst: string;
    dialogType: FortsettDialogType;
    tema?: Kodeverk;
    oppgave?: Oppgave; //TODO denne skal neppe være optional, må sendes inn
    brukerKanSvare: boolean;
    oppgaveListe: OppgavelisteValg;
    sak?: JournalforingsSak;
    visFeilmeldinger: boolean;
}

const SubmitKnapp = styled(Hovedknapp)`
    margin-top: 1rem;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

function FortsettDialog() {
    const [state, setState] = useState<FortsettDialogState>({
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG,
        tema: undefined,
        oppgave: undefined,
        brukerKanSvare: false,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    });
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });
    const personinformasjon = useRestResource(resources => resources.personinformasjon);
    const dispatch = useDispatch();
    const navn = isLoadedPerson(personinformasjon)
        ? capitalizeName(personinformasjon.data.navn.fornavn || '')
        : 'bruker';
    const traad = useAppState(state => state.oppgaver.dialogpanelTraad);
    if (!traad) {
        return <AlertStripeInfo>Ingen tråd er valgt</AlertStripeInfo>;
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(state);
    };

    const erDelsvar = state.dialogType === Meldingstype.DELVIS_SVAR_SKRIFTLIG;
    const erTilknyttetOppgave = true;
    const brukerKanIkkeSvareInfo = !erDelsvar && state.dialogType !== Meldingstype.SVAR_SKRIFTLIG;
    const brukerKanSvareValg = state.dialogType === Meldingstype.SVAR_SKRIFTLIG;

    return (
        <article>
            <Undertittel>Fortsett dialog</Undertittel>
            <FormStyle onSubmit={handleSubmit}>
                <TidligereMeldinger traad={traad} />
                <TekstFelt
                    tekst={state.tekst}
                    navn={navn}
                    tekstMaksLengde={5000}
                    updateTekst={tekst => updateState({ tekst: tekst })}
                />
                <VelgDialogType
                    formState={state}
                    updateDialogType={dialogType => updateState({ dialogType: dialogType })}
                    erTilknyttetOppgave={erTilknyttetOppgave}
                />
                <UnmountClosed isOpened={brukerKanIkkeSvareInfo}>
                    <AlertStripeInfo>Bruker kan ikke svare</AlertStripeInfo>
                </UnmountClosed>
                <UnmountClosed isOpened={brukerKanSvareValg}>
                    <BrukerKanSvare formState={state} updateFormState={updateState} />
                </UnmountClosed>
                <UnmountClosed isOpened={erDelsvar}>
                    <Temavelger setTema={tema => updateState({ tema: tema })} tema={state.tema} />
                </UnmountClosed>
                <SubmitKnapp htmlType="submit">
                    {erDelsvar
                        ? `Svar delvis og legg tilbake på ${state.tema ? state.tema.beskrivelse.toLowerCase() : 'tema'}`
                        : `Del med ${navn}`}
                </SubmitKnapp>
                <UnmountClosed isOpened={erTilknyttetOppgave}>
                    <LeggTilbakepanel />
                </UnmountClosed>
                <UnmountClosed isOpened={!erTilknyttetOppgave}>
                    <StyledKnappMedBekreftPopup type="flat" onBekreft={() => dispatch(setDialogpanelTraad(undefined))}>
                        Avbryt
                    </StyledKnappMedBekreftPopup>
                </UnmountClosed>
            </FormStyle>
        </article>
    );
}

export default FortsettDialog;
