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
import { useDispatch } from 'react-redux';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';

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
    const initialDialogType = Meldingstype.SamtalereferatTelefon;
    const [dialogType, setDialogType] = useState(initialDialogType);
    const [tekst, setTekst] = useState('');
    const [tekstFeil, setTekstFeil] = useState(false);
    const [tema, setTema] = useState<Kodeverk | undefined>(undefined);
    const [temaFeil, setTemaFeil] = useState(false);
    const [visFeilMeldinger, setVisFeilmeldinger] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTekstFeil(tekst.length === 0 || tekst.length > tekstMaksLengde);
        setTemaFeil(!tema);
        setVisFeilmeldinger(false);
    }, [tekst, tema]);

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

    const tekstFeilmelding: SkjemaelementFeil | undefined =
        visFeilMeldinger && tekstFeil
            ? {
                  feilmelding: tekst.length === 0 ? 'Du må skrive en tekst' : `Maks ${tekstMaksLengde} tegn`
              }
            : undefined;

    return (
        <article>
            <h3 className="sr-only">Send ny melding</h3>
            <FormStyle onSubmit={handleSubmit}>
                <RadioPanelGruppe
                    name="Dialogtype"
                    legend="Velg dialogtype"
                    radios={[
                        { label: 'Samtalereferat telefon', value: Meldingstype.SamtalereferatTelefon },
                        { label: 'Samtalereferat oppmøte', value: Meldingstype.SamtalereferatOppmøte },
                        { label: 'Spørsmål til bruker', value: Meldingstype.SpørsmålSkriftlig }
                    ]}
                    checked={dialogType}
                    onChange={(_, value) => setDialogType(value as Meldingstype)}
                />
                <CollapseStyle>
                    <UnmountClosed isOpened={erReferat}>
                        <Temavelger setTema={setTema} tema={tema} visFeilmelding={temaFeil && visFeilMeldinger} />
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
                    Del med Navn her
                </KnappBase>
                <KnappMedBekreftPopup onBekreft={handleAvbryt} popUpTekst="Du vil miste meldingen du har påbegynnt">
                    Avbryt
                </KnappMedBekreftPopup>
            </FormStyle>
        </article>
    );
}

export default SendNyMelding;
