import * as React from 'react';
import { useState } from 'react';
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Hurtigreferat, tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import { connect } from 'react-redux';
import {
    isFailedPosting,
    isFinishedPosting,
    isNotStartedPosting,
    isPosting,
    PostResource
} from '../../../../rest/utils/postResource';
import { Meldingstype, SendMeldingRequest } from '../../../../models/meldinger/meldinger';
import { AppState } from '../../../../redux/reducers';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';
import { AlertStripeAdvarsel, AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { DeprecatedRestResource } from '../../../../redux/restReducers/deprecatedRestResource';
import { erKvinne, erMann, getNavn, PersonRespons } from '../../../../models/person/person';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { getTemaFraCookie, setTemaCookie } from './temautils';
import { loggEvent } from '../../../../utils/frontendLogger';
import { capitalizeAfterPunctuation, capitalizeName } from '../../../../utils/stringFormatting';
import Temavelger, { temaValg } from '../component/Temavelger';
import { Kodeverk } from '../../../../models/kodeverk';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
    person: DeprecatedRestResource<PersonRespons>;
}

interface DispatchProps {
    sendMelding: (tekst: string, tema: string) => void;
}

type Props = StateProps & DispatchProps;

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

function HurtigreferatContainer(props: Props) {
    const [open, setOpen] = useState(false);
    const initialTema = temaValg.find(tema => tema.kodeRef === getTemaFraCookie());
    const [tema, setTema] = useState<Kodeverk | undefined>(initialTema);
    const [visTemaFeilmelding, setVisTemaFeilmelding] = useState(false);

    const sendResource = props.sendMeldingResource;

    if (!isLoadedPerson(props.person)) {
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

    const sendMelding = (hurtigreferat: Hurtigreferat) => {
        if (!tema) {
            setVisTemaFeilmelding(true);
            return;
        }
        if (isNotStartedPosting(props.sendMeldingResource)) {
            loggEvent('sendMelding', 'hurtigreferat', {}, { tema: tema, tittel: hurtigreferat.tittel });
            props.sendMelding(hurtigreferat.fritekst, tema.kodeRef);
        }
    };

    const setTemaHandler = (tema?: Kodeverk) => {
        setTema(tema);
        setVisTemaFeilmelding(false);
        tema && setTemaCookie(tema.kodeRef);
    };

    const person = props.person.data;
    const navn = capitalizeName(getNavn(person.navn));
    const pronomen = erMann(person) ? 'han' : erKvinne(person) ? 'hun' : 'bruker';

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
                            sendMelding={() => sendMelding(hurtigreferat)}
                            spinner={
                                isPosting(props.sendMeldingResource)
                                    ? props.sendMeldingResource.payload.fritekst === hurtigreferat.fritekst
                                    : false
                            }
                        />
                    ))}
                </ul>
            </EkspanderbartpanelPure>
        </Style>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendMeldingResource: state.restResources.sendMelding,
        person: state.restResources.personinformasjon
    };
}

const actionCreators: DispatchProps = {
    sendMelding: (tekst: string, tema: string) =>
        sendMeldingActionCreator({
            fritekst: tekst,
            kanal: 'TELEFON',
            type: Meldingstype.SAMTALEREFERAT_TELEFON,
            temagruppe: tema,
            traadId: null,
            kontorsperretEnhet: null,
            erTilknyttetAnsatt: true
        })
};

export default connect(
    mapStateToProps,
    actionCreators
)(HurtigreferatContainer);
