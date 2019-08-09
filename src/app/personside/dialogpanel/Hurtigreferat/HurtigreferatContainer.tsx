import * as React from 'react';
import { useState } from 'react';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Hurtigreferat, tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import {
    isFailedPosting,
    isFinishedPosting,
    isNotStartedPosting,
    isPosting
} from '../../../../rest/utils/postResource';
import { AlertStripeAdvarsel, AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { erKvinne, erMann, getNavn } from '../../../../models/person/person';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { getTemaFraCookie, setTemaCookie } from './temautils';
import { loggEvent } from '../../../../utils/frontendLogger';
import { capitalizeAfterPunctuation, capitalizeName } from '../../../../utils/stringFormatting';
import Temavelger, { temaValg } from '../component/Temavelger';
import { Kodeverk } from '../../../../models/kodeverk';
import { useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';

const Style = styled.article`
    ${theme.resetEkspanderbartPanelStyling};
    box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.2);
    border-radius: ${theme.borderRadius.layout};
    label {
        ${theme.visuallyHidden}
    }
`;

const Padding = styled.div`
    padding: 0 1rem;
`;

function HurtigreferatContainer() {
    const [open, setOpen] = useState(false);
    const initialTema = temaValg.find(tema => tema.kodeRef === getTemaFraCookie());
    const [tema, setTema] = useState<Kodeverk | undefined>(initialTema);
    const [visTemaFeilmelding, setVisTemaFeilmelding] = useState(false);

    const sendResource = useRestResource(resources => resources.sendReferat);
    const dispatch = useDispatch();
    const person = useRestResource(resources => resources.personinformasjon);

    if (!isLoadedPerson(person)) {
        return <AlertStripeAdvarsel>Ingen person i kontekst</AlertStripeAdvarsel>;
    }

    if (isFinishedPosting(sendResource)) {
        return <AlertStripeSuksess>Meldingen ble sendt.</AlertStripeSuksess>;
    }

    if (isFailedPosting(sendResource)) {
        return (
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {sendResource.error.message}</AlertStripeFeil>
        );
    }

    const handleSendMelding = (hurtigreferat: Hurtigreferat) => {
        if (!tema) {
            setVisTemaFeilmelding(true);
            return;
        }
        if (isNotStartedPosting(sendResource)) {
            loggEvent('sendReferat', 'hurtigreferat', {}, { tema: tema, tittel: hurtigreferat.tittel });
            dispatch(
                sendResource.actions.post({
                    fritekst: hurtigreferat.fritekst,
                    kanal: 'TELEFON',
                    temagruppe: tema.kodeRef
                })
            );
        }
    };

    const setTemaHandler = (tema?: Kodeverk) => {
        setTema(tema);
        setVisTemaFeilmelding(false);
        tema && setTemaCookie(tema.kodeRef);
    };

    const navn = capitalizeName(getNavn(person.data.navn));
    const pronomen = erMann(person.data) ? 'han' : erKvinne(person.data) ? 'hun' : 'bruker';

    const teksterMedBrukersNavn: Hurtigreferat[] = tekster.map((tekst: Hurtigreferat) => ({
        ...tekst,
        fritekst: capitalizeAfterPunctuation(
            tekst.fritekst.replace(/\[bruker\.navn\]/g, navn).replace(/\[bruker\.pronomen\]/g, pronomen)
        )
    }));

    const onClickHandler = () => {
        !open && loggEvent('ekspander', 'hurtigreferat');
        setOpen(!open);
    };

    return (
        <Style>
            <h3 className="sr-only">Send hurtigreferat</h3>
            <EkspanderbartpanelPure apen={open} onClick={onClickHandler} tittel={'Hurtigreferat'}>
                <Padding>
                    <Temavelger setTema={setTemaHandler} tema={tema} visFeilmelding={visTemaFeilmelding} />
                </Padding>
                <ul>
                    {teksterMedBrukersNavn.map(hurtigreferat => (
                        <HurtigreferatElement
                            key={hurtigreferat.tittel}
                            tekst={hurtigreferat}
                            sendMelding={() => handleSendMelding(hurtigreferat)}
                            spinner={
                                isPosting(sendResource)
                                    ? sendResource.payload.fritekst === hurtigreferat.fritekst
                                    : false
                            }
                        />
                    ))}
                </ul>
            </EkspanderbartpanelPure>
        </Style>
    );
}

export default HurtigreferatContainer;
