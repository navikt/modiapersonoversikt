import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
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
import { Meldingstype, SendMeldingRequest, Temagruppe } from '../../../../models/meldinger/meldinger';
import { AppState } from '../../../../redux/reducers';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { DeprecatedRestResource } from '../../../../redux/restReducers/deprecatedRestResource';
import { PersonRespons } from '../../../../models/person/person';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { Select } from 'nav-frontend-skjema';
import { getTemaFraCookie, setTemaCookie } from './temagruppeutils';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
    person: DeprecatedRestResource<PersonRespons>;
}

interface DispatchProps {
    sendMelding: (tekst: string, temaGruppe: string) => void;
}

type Props = StateProps & DispatchProps;

const Style = styled.div`
    ${theme.resetEkspanderbartPanelStyling};
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
    label {
        ${theme.visuallyHidden}
    }
`;

const Padding = styled.div`
    padding: 0 1rem;
`;

interface Tema {
    kodeverk: string;
    beskrivelse: string;
}

const temagruppeValg: Tema[] = [
    { beskrivelse: 'Arbeid', kodeverk: Temagruppe.Arbeid },
    { beskrivelse: 'Familie', kodeverk: Temagruppe.Familie },
    { beskrivelse: 'Hjelpemiddel', kodeverk: Temagruppe.Hjelpemiddel },
    { beskrivelse: 'Pensjon', kodeverk: Temagruppe.Pensjon },
    { beskrivelse: 'Øvrig', kodeverk: Temagruppe.Øvrig }
];

function HurtigreferatContainer(props: Props) {
    const initialTema = temagruppeValg.find(tema => tema.kodeverk === getTemaFraCookie());
    const [valgtTema, setTemagruppe] = useState<Tema | undefined>(initialTema);
    const [temaGruppeFeilmelding, setTemaGruppeFeilmelding] = useState(false);
    const sendResource = props.sendMeldingResource;

    if (isFinishedPosting(sendResource)) {
        return <AlertStripeInfo>Meldingen ble sendt.</AlertStripeInfo>;
    }

    if (isFailedPosting(sendResource)) {
        return (
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {sendResource.error.message}</AlertStripeFeil>
        );
    }

    const sendMelding = (tekst: string) => {
        if (!valgtTema) {
            setTemaGruppeFeilmelding(true);
            return;
        }
        if (isNotStartedPosting(props.sendMeldingResource)) {
            props.sendMelding(tekst, valgtTema.kodeverk);
        }
    };

    const velgTemagruppeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const tema = temagruppeValg.find(tema => tema.kodeverk === event.target.value);
        setTemagruppe(tema);
        setTemaGruppeFeilmelding(false);
        tema && setTemaCookie(tema.kodeverk);
    };

    const navn = isLoadedPerson(props.person) ? props.person.data.navn.sammensatt : 'Bruker';

    const teksterMedBrukersNavn: Hurtigreferat[] = tekster.map((tekst: Hurtigreferat) => ({
        ...tekst,
        fritekst: tekst.fritekst
            .replace('BRUKER', navn)
            .replace('TEMA', valgtTema ? valgtTema.beskrivelse.toLowerCase() : 'tema')
    }));

    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>Hurtigreferat</Undertittel>} ariaTittel={'Hurtigreferat'}>
                <Padding>
                    <Select
                        label="Temagruppe"
                        onChange={velgTemagruppeHandler}
                        feil={temaGruppeFeilmelding ? { feilmelding: 'Du må velge temagruppe' } : undefined}
                    >
                        <option value="" disabled>
                            Velg temagruppe
                        </option>
                        {temagruppeValg.map(valg => (
                            <option key={valg.kodeverk} value={valg.kodeverk} selected={valg === valgtTema}>
                                {valg.beskrivelse}
                            </option>
                        ))}
                    </Select>
                </Padding>
                <ul>
                    {teksterMedBrukersNavn.map(hurtigreferat => (
                        <HurtigreferatElement
                            key={hurtigreferat.tittel}
                            tekst={hurtigreferat}
                            sendMelding={() => sendMelding(hurtigreferat.fritekst)}
                            spinner={
                                isPosting(props.sendMeldingResource)
                                    ? props.sendMeldingResource.payload.fritekst === hurtigreferat.fritekst
                                    : false
                            }
                        />
                    ))}
                </ul>
            </EkspanderbartpanelBase>
        </Style>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendMeldingResource: state.restResources.sendMelding,
        person: state.restResources.personinformasjon
    };
}

const actionCreators = {
    sendMelding: (tekst: string, temaGruppe: string) =>
        sendMeldingActionCreator({
            fritekst: tekst,
            kanal: 'Telefon',
            type: Meldingstype.SamtalereferatTelefon,
            temagruppe: temaGruppe,
            traadId: null,
            kontorsperretEnhet: null
        })
};

export default connect(
    mapStateToProps,
    actionCreators
)(HurtigreferatContainer);
