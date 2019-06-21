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

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    > * {
        margin-bottom: 1rem;
    }
`;

const CollapseStyle = styled.div`
    .skjemaelement {
        margin: 0;
    }
`;

const tekstMaksLengde = 5000;

function SendNyMelding() {
    const initialDialogType = Meldingstype.SpørsmålSkriftlig;
    const [dialogType, setDialogType] = useState(initialDialogType);
    const [tekst, setTekst] = useState('');
    const [tekstFeil, setTekstFeil] = useState(false);
    const [tema, setTema] = useState<Kodeverk | undefined>(undefined);
    const [sak, setSak] = useState<JournalforingsSak | undefined>(undefined);
    const [temaFeil, setTemaFeil] = useState(false);
    const [visFeilMeldinger, setVisFeilmeldinger] = useState(false);
    const sammensattesaker = useSelector((state: AppState) => state.restResources.sammensatteSaker);
    const psaksaker = useSelector((state: AppState) => state.restResources.psakSaker);
    const [visSaker, setVisSaker] = useState(false);
    const dispatch = useDispatch();
    const personinformasjon = useSelector((state: AppState) => state.restResources.personinformasjon);

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

    const navn = isLoadedPerson(personinformasjon) ? personinformasjon.data.navn.fornavn : 'bruker';

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
                <CollapseStyle>
                    <UnmountClosed isOpened={erReferat}>
                        <Temavelger setTema={setTema} tema={tema} visFeilmelding={temaFeil && visFeilMeldinger} />
                    </UnmountClosed>
                    <UnmountClosed isOpened={!erReferat}>
                        <div>
                            <Normaltekst>Valgt sak: {sak && sak.saksId}</Normaltekst>
                            <EkspanderKnapp onClick={() => setVisSaker(!visSaker)} open={visSaker} />
                        </div>
                        <UnmountClosed isOpened={visSaker}>
                            <VelgSak saker={saker} valgtSak={sak} setValgtSak={handleVelgSak} />{' '}
                            <p style={{ display: 'none' }}>
                                /* TODO Denne byttes ut med komponent fra Journalføring når den er ferdig*/
                            </p>
                        </UnmountClosed>
                    </UnmountClosed>
                </CollapseStyle>
                <Textarea
                    value={tekst}
                    onChange={e => setTekst((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
                    label={'Melding'}
                    maxLength={tekstMaksLengde}
                    feil={tekstFeilmelding}
                />
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
