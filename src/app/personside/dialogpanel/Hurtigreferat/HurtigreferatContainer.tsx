import * as React from 'react';
import { ChangeEvent, useState } from 'react';
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
import { Meldingstype, SendMeldingRequest, Temagruppe } from '../../../../models/meldinger/meldinger';
import { AppState } from '../../../../redux/reducers';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { DeprecatedRestResource } from '../../../../redux/restReducers/deprecatedRestResource';
import { PersonRespons } from '../../../../models/person/person';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { Select } from 'nav-frontend-skjema';
import { getTemaFraCookie, setTemaCookie } from './temautils';
import { loggEvent } from '../../../../utils/frontendLogger';
import { capitalizeName } from '../../../../utils/stringFormatting';

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

interface Tema {
    kodeverk: string;
    beskrivelse: string;
}

const temaValg: Tema[] = [
    { beskrivelse: 'Arbeid', kodeverk: Temagruppe.Arbeid },
    { beskrivelse: 'Familie', kodeverk: Temagruppe.Familie },
    { beskrivelse: 'Hjelpemiddel', kodeverk: Temagruppe.Hjelpemiddel },
    { beskrivelse: 'Pensjon', kodeverk: Temagruppe.Pensjon },
    { beskrivelse: 'Øvrig', kodeverk: Temagruppe.Øvrig }
];

function HurtigreferatContainer(props: Props) {
    let selectRef: HTMLSelectElement | null;
    const initialTema = temaValg.find(tema => tema.kodeverk === getTemaFraCookie());
    const [open, setOpen] = useState(false);
    const [valgtTema, setTema] = useState<Tema | undefined>(initialTema);
    const [temaFeilmelding, setTemaFeilmelding] = useState(false);
    const sendResource = props.sendMeldingResource;

    if (isFinishedPosting(sendResource)) {
        return <AlertStripeSuksess>Meldingen ble sendt.</AlertStripeSuksess>;
    }

    if (isFailedPosting(sendResource)) {
        return (
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {sendResource.error.message}</AlertStripeFeil>
        );
    }

    const sendMelding = (hurtigreferat: Hurtigreferat) => {
        if (!valgtTema) {
            setTemaFeilmelding(true);
            selectRef && selectRef.focus();
            return;
        }
        if (isNotStartedPosting(props.sendMeldingResource)) {
            loggEvent('sendMelding', 'hurtigreferat', {}, { tema: valgtTema, tittel: hurtigreferat.tittel });
            props.sendMelding(hurtigreferat.fritekst, valgtTema.kodeverk);
        }
    };

    const velgTemaHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const tema = temaValg.find(tema => tema.kodeverk === event.target.value);
        setTema(tema);
        setTemaFeilmelding(false);
        tema && setTemaCookie(tema.kodeverk);
    };

    const navn = isLoadedPerson(props.person) ? capitalizeName(props.person.data.navn.sammensatt) : 'Bruker';

    const teksterMedBrukersNavn: Hurtigreferat[] = tekster.map((tekst: Hurtigreferat) => ({
        ...tekst,
        fritekst: tekst.fritekst.replace('[bruker.navnsammensatt]', navn)
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
                    <Select
                        // @ts-ignore
                        selectRef={r => (selectRef = r)}
                        label="Tema"
                        onChange={velgTemaHandler}
                        feil={temaFeilmelding ? { feilmelding: 'Du må velge tema' } : undefined}
                        defaultValue={valgtTema ? valgtTema.kodeverk : ''}
                    >
                        <option value="" disabled>
                            Velg tema
                        </option>
                        {temaValg.map(valg => (
                            <option key={valg.kodeverk} value={valg.kodeverk}>
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
            type: Meldingstype.SamtalereferatTelefon,
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
