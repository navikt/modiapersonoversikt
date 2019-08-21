import * as React from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { useAppState, usePrevious, useRestResource } from '../../../../utils/customHooks';
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
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogpanelTraad } from '../../../../redux/oppgave/actions';
import { FormStyle } from '../fellesStyling';
import { OppgavelisteValg, tekstMaksLengde } from '../sendMelding/SendNyMelding';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import BrukerKanSvare from './BrukerKanSvare';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { FortsettDialogValidator } from './validatorer';
import { AppState } from '../../../../redux/reducers';
import { isFinishedPosting, isPosting } from '../../../../rest/utils/postResource';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

export interface FortsettDialogState {
    tekst: string;
    dialogType: FortsettDialogType;
    tema?: Kodeverk;
    oppgave?: Oppgave;
    oppgaveListe: OppgavelisteValg;
    sak?: JournalforingsSak;
    visFeilmeldinger: boolean;
}

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

function FortsettDialog() {
    const traad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const oppgaveResource = useSelector((state: AppState) => state.restResources.oppgaver);
    const tilknyttetOppgave =
        isFinishedPosting(oppgaveResource) && traad
            ? oppgaveResource.response.find(oppgave => oppgave.henvendelseid === traad.traadId)
            : undefined;
    const sendSvarResource = useRestResource(resources => resources.sendSvar);
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        oppgave: tilknyttetOppgave,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    };
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });
    const personinformasjon = useRestResource(resources => resources.personinformasjon);
    const dispatch = useDispatch();

    const previous = usePrevious(traad);
    useEffect(() => {
        if (previous !== traad) {
            setState(initialState);
        }
    }, [traad, setState, initialState, previous]);

    const navn = isLoadedPerson(personinformasjon)
        ? capitalizeName(personinformasjon.data.navn.fornavn || '')
        : 'bruker';

    if (!traad) {
        return <AlertStripeInfo>Ingen tråd er valgt</AlertStripeInfo>;
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isPosting(sendSvarResource)) {
            return;
        }
        const postAction = sendSvarResource.actions.post;
        if (FortsettDialogValidator.erGyldigSvarSkriftlig(state)) {
            dispatch(
                postAction({
                    fritekst: state.tekst,
                    traadId: traad.traadId,
                    meldingstype: state.dialogType,
                    erOppgaveTilknyttetAnsatt: true,
                    oppgaveId: tilknyttetOppgave && tilknyttetOppgave.oppgaveid
                })
            );
        } else if (FortsettDialogValidator.erGyldigSpørsmålSkriftlig(state)) {
            const meldingsType = Meldingstype.SPORSMAL_MODIA_UTGAAENDE;
            console.log('spørsmål skriftlig: ', state, meldingsType);
        } else if (FortsettDialogValidator.erGyldigDelsvar(state)) {
            console.log('delvis svar: ', state);
        } else if (FortsettDialogValidator.erGyldigSvarOppmote(state)) {
            console.log('svar oppmøte: ', state);
        } else if (FortsettDialogValidator.erGyldigSvarTelefon(state)) {
            console.log('svar telefon: ', state);
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const handleAvbryt = () => dispatch(setDialogpanelTraad(undefined));

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
                <TidligereMeldinger traad={traad} />
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
                <SubmitKnapp htmlType="submit" spinner={isPosting(sendSvarResource)}>
                    {erDelsvar
                        ? `Skriv delsvar og legg tilbake på ${
                              state.tema ? state.tema.beskrivelse.toLowerCase() : 'tema'
                          }`
                        : `Del med ${navn}`}
                </SubmitKnapp>
                {erTilknyttetOppgave ? (
                    <LeggTilbakepanel />
                ) : (
                    <StyledKnappMedBekreftPopup type="flat" onBekreft={handleAvbryt}>
                        Avbryt
                    </StyledKnappMedBekreftPopup>
                )}
            </FormStyle>
        </StyledArticle>
    );
}

export default FortsettDialog;
