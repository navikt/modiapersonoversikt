import * as React from 'react';
import { FormEvent, useState } from 'react';
import { KommunikasjonsKanal, Meldingstype } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import Temavelger from '../component/Temavelger';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { useDispatch } from 'react-redux';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { NyMeldingValidator } from './validatorer';
import TekstFelt from './TekstFelt';
import VelgDialogType from './VelgDialogType';
import { useRestResource } from '../../../../utils/customHooks';
import { Undertittel } from 'nav-frontend-typografi';
import Oppgaveliste from './Oppgaveliste';
import { isPosting } from '../../../../rest/utils/postResource';
import { FormStyle } from '../fellesStyling';
import theme from '../../../../styles/personOversiktTheme';

export enum OppgavelisteValg {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

export type SendNyMeldingDialogType =
    | Meldingstype.SAMTALEREFERAT_TELEFON
    | Meldingstype.SAMTALEREFERAT_OPPMOTE
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

export interface FormState {
    tekst: string;
    dialogType: SendNyMeldingDialogType;
    tema?: Kodeverk;
    sak?: JournalforingsSak;
    oppgaveListe: OppgavelisteValg;
    visFeilmeldinger: boolean;
}

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        margin-bottom: 0.7rem;
        margin-right: 0.5rem;
        flex-grow: 1;
    }
`;

const Margin = styled.div`
    /* Pga React Collapse må vi slenge på noen div'er som tar seg av marginer for å unngå hopp i animasjon */
`;

const tekstMaksLengde = 5000;

const initialState: FormState = {
    tekst: '',
    dialogType: Meldingstype.SAMTALEREFERAT_TELEFON,
    tema: undefined,
    sak: undefined,
    oppgaveListe: OppgavelisteValg.MinListe,
    visFeilmeldinger: false
};

function SendNyMelding() {
    const [state, setState] = useState<FormState>(initialState);
    const updateState = (change: Partial<FormState>) => setState({ ...state, visFeilmeldinger: false, ...change });
    const personinformasjon = useRestResource(resources => resources.personinformasjon);
    const postReferatResource = useRestResource(resources => resources.sendReferat);
    const postSpørsmålResource = useRestResource(resources => resources.sendSpørsmål);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const senderMelding = isPosting(postReferatResource) || isPosting(postSpørsmålResource);
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (senderMelding) {
            return;
        }
        if (NyMeldingValidator.erGyldigReferat(state) && state.tema) {
            const erOppmøte = state.dialogType === Meldingstype.SAMTALEREFERAT_OPPMOTE;
            dispatch(
                postReferatResource.actions.post(
                    {
                        fritekst: state.tekst,
                        kanal: erOppmøte ? KommunikasjonsKanal.Oppmøte : KommunikasjonsKanal.Telefon,
                        temagruppe: state.tema.kodeRef
                    },
                    () => dispatch(reloadMeldinger)
                )
            );
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            dispatch(
                postSpørsmålResource.actions.post(
                    {
                        fritekst: state.tekst,
                        saksID: state.sak.saksId,
                        erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
                    },
                    () => dispatch(reloadMeldinger)
                )
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
        <StyledArticle>
            <Undertittel>Send ny melding</Undertittel>
            <FormStyle onSubmit={handleSubmit}>
                <VelgDialogType formState={state} updateDialogType={dialogType => updateState({ dialogType })} />
                <Margin>
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
                            oppgaveliste={state.oppgaveListe}
                            setOppgaveliste={oppgaveliste => updateState({ oppgaveListe: oppgaveliste })}
                        />
                    </UnmountClosed>
                </Margin>
                <TekstFelt
                    tekst={state.tekst}
                    navn={navn}
                    tekstMaksLengde={tekstMaksLengde}
                    updateTekst={tekst => updateState({ tekst })}
                    feilmelding={
                        !NyMeldingValidator.tekst(state) && state.visFeilmeldinger
                            ? `Du må skrive en tekst på mellom 0 og ${tekstMaksLengde} tegn`
                            : undefined
                    }
                />
                <Margin>
                    <UnmountClosed isOpened={erSpørsmål}>
                        <AlertStripeInfo>Bruker kan svare</AlertStripeInfo>
                    </UnmountClosed>
                </Margin>
                <KnappWrapper>
                    <KnappBase type="hoved" htmlType="submit" spinner={senderMelding}>
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
        </StyledArticle>
    );
}

export default SendNyMelding;
