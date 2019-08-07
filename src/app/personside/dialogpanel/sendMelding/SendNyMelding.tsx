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
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/stringFormatting';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import Select from 'nav-frontend-skjema/lib/select';
import { getSaksbehandlerEnhet } from '../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { useSendMelding } from '../../../../redux/restReducers/sendMelding';

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    textarea {
        min-height: 9rem;
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
    const initialDialogType = Meldingstype.SAMTALEREFERAT_TELEFON;
    const [tekst, setTekst] = useState('');
    const [dialogType, setDialogType] = useState(initialDialogType);
    const [tema, setTema] = useState<Kodeverk | undefined>(undefined);
    const [sak, setSak] = useState<JournalforingsSak | undefined>(undefined);
    const [oppgaveListe, setOppgaveliste] = useState(Oppgaveliste.MinListe);
    const [tekstFeil, setTekstFeil] = useState(false);
    const [temaFeil, setTemaFeil] = useState(false);
    const [visFeilMeldinger, setVisFeilmeldinger] = useState(false);
    const sendMelding = useSendMelding();

    const personinformasjon = useSelector((state: AppState) => state.restResources.personinformasjon);

    const enhet = getSaksbehandlerEnhet();

    useEffect(() => {
        setTekstFeil(tekst.length === 0 || tekst.length > tekstMaksLengde);
        setTemaFeil(!tema);
        setVisFeilmeldinger(false);
    }, [tekst, tema]);

    const erReferat = dialogType !== Meldingstype.SPORSMAL_SKRIFTLIG;
    const erOppmøte = dialogType !== Meldingstype.SAMTALEREFERAT_OPPMOTE;
    const erGyldigReferat = erReferat && !temaFeil && !tekstFeil;
    const erGyldigSpørsmål = !erReferat;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (erGyldigReferat && tema) {
            sendMelding({
                fritekst: tekst,
                kanal: erOppmøte ? 'OPPMOTE' : 'TELEFON',
                type: dialogType,
                temagruppe: tema.kodeRef,
                traadId: null,
                kontorsperretEnhet: null,
                erTilknyttetAnsatt: true
            });
        } else if (erGyldigSpørsmål && sak) {
            sendMelding({
                fritekst: tekst,
                kanal: '',
                type: dialogType,
                temagruppe: sak.temaKode,
                traadId: null,
                kontorsperretEnhet: null,
                erTilknyttetAnsatt: true
            });
        } else {
            setVisFeilmeldinger(true);
        }
    };

    const handleAvbryt = () => {
        setDialogType(initialDialogType);
        setTekst('');
        setTema(undefined);
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
            <DialogpanelVelgSak valgtSak={sak} setValgtSak={setSak} />
            <section>
                <Select
                    label="Oppgaveliste"
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
                        { label: 'Samtalereferat telefon', value: Meldingstype.SAMTALEREFERAT_TELEFON },
                        { label: 'Spørsmål til bruker', value: Meldingstype.SPORSMAL_SKRIFTLIG },
                        { label: 'Samtalereferat oppmøte', value: Meldingstype.SAMTALEREFERAT_OPPMOTE }
                    ]}
                    checked={dialogType}
                    onChange={(_, value) => setDialogType(Meldingstype[value])}
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
