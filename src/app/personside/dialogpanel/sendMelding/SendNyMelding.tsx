import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import Temavelger from '../component/Temavelger';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { getSaksbehandlerEnhet } from '../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { NyMeldingValidator } from './validatorer';
import TekstFelt from './TekstFelt';
import VelgDialogType from './VelgDialogType';
import { useRestResource } from '../../../../utils/customHooks';
import { Undertittel } from 'nav-frontend-typografi';
import Oppgaveliste from './Oppgaveliste';

export enum OppgavelisteValg {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

export enum SendNyMeldingDialogTyper {
    SamtaleReferatTelefon = Meldingstype.SAMTALEREFERAT_TELEFON,
    SamtaleReferatOppmøte = Meldingstype.SAMTALEREFERAT_OPPMOTE,
    SpørsmålSkriftlig = Meldingstype.SPORSMAL_SKRIFTLIG
}

export interface FormState {
    tekst: string;
    dialogType: SendNyMeldingDialogTyper;
    tema?: Kodeverk;
    sak?: JournalforingsSak;
    oppgaveListe: OppgavelisteValg;
    visFeilmeldinger: boolean;
}

const FormStyle = styled.form`
    display: flex;
    margin-top: 1rem;
    flex-direction: column;
    align-items: stretch;
    .ReactCollapse--collapse .skjemaelement {
        margin-bottom: 0;
    }
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        margin-top: 0.7rem;
        margin-right: 0.5rem;
        flex-grow: 1;
    }
`;

const tekstMaksLengde = 5000;

function SendNyMelding() {
    const initialState: FormState = {
        tekst: '',
        dialogType: SendNyMeldingDialogTyper.SamtaleReferatTelefon,
        tema: undefined,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe,
        visFeilmeldinger: false
    };
    const [state, setState] = useState<FormState>(initialState);
    const updateState = (change: Partial<FormState>) => setState({ ...state, visFeilmeldinger: false, ...change });
    const personinformasjon = useSelector((state: AppState) => state.restResources.personinformasjon);
    const enhet = getSaksbehandlerEnhet();
    const postReferatAction = useRestResource(resources => resources.sendReferat.actions.post);
    const postSpørsmålAction = useRestResource(resources => resources.sendSpørsmål.actions.post);
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (NyMeldingValidator.erGyldigReferat(state) && state.tema) {
            const erOppmøte = state.dialogType === SendNyMeldingDialogTyper.SamtaleReferatOppmøte;
            dispatch(
                postReferatAction({
                    fritekst: state.tekst,
                    kanal: erOppmøte ? 'OPPMOTE' : 'TELEFON',
                    temagruppe: state.tema.kodeRef
                })
            );
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            dispatch(
                postSpørsmålAction({
                    fritekst: state.tekst,
                    saksID: state.sak.saksId,
                    erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
                })
            );
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const handleAvbryt = () => {
        updateState(initialState);
    };

    const navn = isLoadedPerson(personinformasjon)
        ? capitalizeName(personinformasjon.data.navn.fornavn || '')
        : 'bruker';

    const erReferat = NyMeldingValidator.erReferat(state);
    const erSpørsmål = NyMeldingValidator.erSporsmal(state);

    return (
        <article>
            <Undertittel>Send ny melding</Undertittel>
            <FormStyle onSubmit={handleSubmit}>
                <VelgDialogType formState={state} updateDialogType={dialogType => updateState({ dialogType })} />
                <UnmountClosed isOpened={erReferat} hasNestedCollapse={true}>
                    {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                    <Temavelger
                        setTema={tema => updateState({ tema: tema })}
                        tema={state.tema}
                        visFeilmelding={!NyMeldingValidator.tema(state) && state.visFeilmeldinger}
                    />
                </UnmountClosed>
                <UnmountClosed isOpened={erSpørsmål} hasNestedCollapse={true}>
                    <DialogpanelVelgSak
                        setValgtSak={sak => updateState({ sak })}
                        visFeilmelding={!NyMeldingValidator.sak(state) && state.visFeilmeldinger}
                        valgtSak={state.sak}
                    />
                    <Oppgaveliste
                        state={state}
                        enhet={enhet}
                        setOppgaveliste={oppgaveliste => updateState({ oppgaveListe: oppgaveliste })}
                    />
                </UnmountClosed>
                <TekstFelt
                    formState={state}
                    navn={navn}
                    tekstMaksLengde={tekstMaksLengde}
                    updateTekst={tekst => updateState({ tekst })}
                />
                <UnmountClosed isOpened={erSpørsmål}>
                    <AlertStripeInfo>Bruker kan svare</AlertStripeInfo>
                </UnmountClosed>
                <KnappWrapper>
                    <KnappBase type="hoved" htmlType="submit">
                        Del med {navn}
                    </KnappBase>
                    <KnappMedBekreftPopup
                        type="flat"
                        onBekreft={handleAvbryt}
                        popUpTekst="Du vil miste meldingen du har påbegynnt"
                    >
                        Avbryt
                    </KnappMedBekreftPopup>
                </KnappWrapper>
            </FormStyle>
        </article>
    );
}

export default SendNyMelding;
