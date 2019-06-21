import * as React from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { Kodeverk } from '../../../../models/kodeverk';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import Temavelger from '../component/Temavelger';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { useDispatch, useSelector } from 'react-redux';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';
import { AppState } from '../../../../redux/reducers';
import { isLoaded, isNotStarted } from '../../../../rest/utils/restResource';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from './VelgSak';
import { Normaltekst } from 'nav-frontend-typografi';
import EkspanderKnapp from '../../../../components/EkspanderKnapp';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import Select from 'nav-frontend-skjema/lib/select';
import { getSaksbehandlerEnhet } from '../../../../utils/loggInfo/saksbehandlersEnhetInfo';

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    textarea {
        min-height: 9rem;
    }
    button {
        margin-top: 0.5rem;
    }
    .ReactCollapse--collapse .skjemaelement {
        margin: 0;
    }
`;

const tekstMaksLengde = 5000;

enum Oppgaveliste {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

function SendNyMelding() {
    const initialDialogType = Meldingstype.SpørsmålSkriftlig;
    const [tema, setTema] = useState<Kodeverk | undefined>(undefined);
    const [sak, setSak] = useState<JournalforingsSak | undefined>(undefined);
    const [tekst, setTekst] = useState('');
    const [dialogType, setDialogType] = useState(initialDialogType);
    const [tekstFeil, setTekstFeil] = useState(false);
    const [temaFeil, setTemaFeil] = useState(false);
    const [oppgaveListe, setOppgaveliste] = useState(Oppgaveliste.MinListe);
    const [visSaker, setVisSaker] = useState(false);
    const [visFeilMeldinger, setVisFeilmeldinger] = useState(false);

    const sammensattesaker = useSelector((state: AppState) => state.restResources.sammensatteSaker);
    const psaksaker = useSelector((state: AppState) => state.restResources.psakSaker);
    const personinformasjon = useSelector((state: AppState) => state.restResources.personinformasjon);
    const dispatch = useDispatch();

    const enhet = getSaksbehandlerEnhet();

    const saker: JournalforingsSak[] =
        isLoaded(sammensattesaker) && isLoaded(psaksaker) ? [...sammensattesaker.data, ...psaksaker.data] : [];

    useEffect(() => {
        setTekstFeil(tekst.length === 0 || tekst.length > tekstMaksLengde);
        setTemaFeil(!tema);
        setVisFeilmeldinger(false);
    }, [tekst, tema]);

    if (isNotStarted(sammensattesaker)) {
        dispatch(sammensattesaker.actions.fetch);
    }

    if (isNotStarted(psaksaker)) {
        dispatch(psaksaker.actions.fetch);
    }

    const erReferat = dialogType !== Meldingstype.SpørsmålSkriftlig;
    const erOppmøte = dialogType !== Meldingstype.SamtalereferatOppmøte;
    const erGyldigReferat = !temaFeil && !tekstFeil;
    const erGyldigSpørsmål = true;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (tema && erReferat && erGyldigReferat) {
            dispatch(
                sendMeldingActionCreator({
                    fritekst: tekst,
                    kanal: erOppmøte ? 'OPPMOTE' : 'TELEFON',
                    type: dialogType,
                    temagruppe: tema.kodeRef,
                    traadId: null,
                    kontorsperretEnhet: null,
                    erTilknyttetAnsatt: true
                })
            );
        } else if (!erReferat && sak && erGyldigSpørsmål) {
            dispatch(
                sendMeldingActionCreator({
                    fritekst: tekst,
                    kanal: '',
                    type: dialogType,
                    temagruppe: sak.temaKode,
                    traadId: null,
                    kontorsperretEnhet: null,
                    erTilknyttetAnsatt: true
                })
            );
        } else {
            setVisFeilmeldinger(true);
        }
    };

    const handleAvbryt = () => {
        setDialogType(initialDialogType);
        setTekst('');
        setTema(undefined);
    };

    const handleVelgSak = (sak: JournalforingsSak) => {
        setSak(sak);
    };

    const tekstFeilmelding: SkjemaelementFeil | undefined =
        visFeilMeldinger && tekstFeil
            ? {
                  feilmelding: tekst.length === 0 ? 'Du må skrive en tekst' : `Maks ${tekstMaksLengde} tegn`
              }
            : undefined;

    const navn = isLoadedPerson(personinformasjon)
        ? capitalizeName(personinformasjon.data.navn.fornavn || '')
        : 'bruker';

    const spørsmålFields = (
        <>
            <div>
                <Normaltekst>Valgt sak: {sak && sak.saksId}</Normaltekst>
                <EkspanderKnapp onClick={() => setVisSaker(!visSaker)} open={visSaker} />
            </div>
            <UnmountClosed isOpened={visSaker}>
                <section>
                    <VelgSak saker={saker} valgtSak={sak} setValgtSak={handleVelgSak} />{' '}
                    <p style={{ display: 'none' }}>
                        /* TODO Denne byttes ut med komponent fra Journalføring når den er ferdig*/
                    </p>
                </section>
            </UnmountClosed>
            <section>
                <Select
                    label="oppgaveliste"
                    value={oppgaveListe}
                    onChange={event => setOppgaveliste(event.target.value as Oppgaveliste)}
                >
                    <option value={Oppgaveliste.MinListe}>Min oppgaveliste</option>
                    <option value={Oppgaveliste.EnhetensListe}>Skal til {enhet} sin oppgaveliste</option>
                </Select>
            </section>
        </>
    );

    return (
        <article>
            <h3 className="sr-only">Send ny melding</h3>
            <FormStyle onSubmit={handleSubmit}>
                <RadioPanelGruppe
                    name="Dialogtype"
                    legend="Velg dialogtype"
                    radios={[
                        { label: 'Samtalereferat telefon', value: Meldingstype.SamtalereferatTelefon },
                        { label: 'Spørsmål til bruker', value: Meldingstype.SpørsmålSkriftlig },
                        { label: 'Samtalereferat oppmøte', value: Meldingstype.SamtalereferatOppmøte }
                    ]}
                    checked={dialogType}
                    onChange={(_, value) => setDialogType(value as Meldingstype)}
                />
                <UnmountClosed isOpened={erReferat}>
                    <Temavelger setTema={setTema} tema={tema} visFeilmelding={temaFeil && visFeilMeldinger} />
                </UnmountClosed>
                <UnmountClosed isOpened={!erReferat}>{spørsmålFields}</UnmountClosed>
                <Textarea
                    value={tekst}
                    onChange={e => setTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                    label={'Melding'}
                    maxLength={tekstMaksLengde}
                    feil={tekstFeilmelding}
                    placeholder={`Alt du skriver i denne boksen blir synlig for brukeren når du trykker "Del med ${navn}"`}
                />
                <UnmountClosed isOpened={!erReferat}>
                    <AlertStripeInfo>Bruker kan svare</AlertStripeInfo>
                </UnmountClosed>
                <KnappBase type="hoved" htmlType="submit">
                    Del med {navn}
                </KnappBase>
                <KnappMedBekreftPopup onBekreft={handleAvbryt} popUpTekst="Du vil miste meldingen du har påbegynnt">
                    Avbryt
                </KnappMedBekreftPopup>
            </FormStyle>
        </article>
    );
}

export default SendNyMelding;
