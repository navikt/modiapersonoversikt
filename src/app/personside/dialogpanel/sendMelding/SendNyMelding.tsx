import * as React from 'react';
import { FormEvent, useRef } from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import Temavelger from '../component/Temavelger';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { isLoadedPerson } from '../../../../redux/restReducers/personinformasjon';
import { capitalizeName } from '../../../../utils/string-utils';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { NyMeldingValidator } from './validatorer';
import TekstFelt from './TekstFelt';
import VelgDialogType from './VelgDialogType';
import { Undertittel } from 'nav-frontend-typografi';
import Oppgaveliste from './Oppgaveliste';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import theme from '../../../../styles/personOversiktTheme';
import { SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import { Temagruppe, TemaSamtalereferat } from '../../../../models/temagrupper';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { guid } from 'nav-frontend-js-utils';
import ReflowBoundry from '../ReflowBoundry';

export enum OppgavelisteValg {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

export type SendNyMeldingDialogType =
    | Meldingstype.SAMTALEREFERAT_TELEFON
    | Meldingstype.SAMTALEREFERAT_OPPMOTE
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE
    | Meldingstype.INFOMELDING_MODIA_UTGAAENDE;

export interface SendNyMeldingState {
    tekst: string;
    dialogType: SendNyMeldingDialogType;
    tema?: Temagruppe;
    sak?: JournalforingsSak;
    oppgaveListe: OppgavelisteValg;
    visFeilmeldinger: boolean;
}

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin-bottom: 0.7rem;
    }
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    margin-top: 1rem;
`;

const Margin = styled.div`
    /* Pga React Collapse må vi slenge på noen div'er som tar seg av marginer for å unngå hopp i animasjon */
`;

const StyledUndertittel = styled(Undertittel)`
    margin-bottom: 1rem !important;
`;

export const tekstMaksLengde = 10000;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: SendNyMeldingState;
    updateState: (change: Partial<SendNyMeldingState>) => void;
    formErEndret: boolean;
    sendNyMeldingPanelState: SendNyMeldingPanelState;
}

function Feilmelding(props: { sendNyMeldingPanelState: SendNyMeldingStatus }) {
    if (props.sendNyMeldingPanelState === SendNyMeldingStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return null;
}
function SendNyMelding(props: Props) {
    const updateState = props.updateState;
    const state = props.state;
    const personinformasjon = useRestResource(resources => resources.personinformasjon);
    const tittelId = useRef(guid());

    const navn = isLoadedPerson(personinformasjon.resource)
        ? capitalizeName(personinformasjon.resource.data.navn.fornavn || '')
        : 'bruker';

    const erReferat = NyMeldingValidator.erReferat(state);
    const erSporsmaal = NyMeldingValidator.erSporsmal(state);
    const erInfomelding = NyMeldingValidator.erInfomelding(state);

    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <StyledUndertittel id={tittelId.current}>Send ny melding</StyledUndertittel>
                <FormStyle onSubmit={props.handleSubmit}>
                    <TekstFelt
                        tekst={state.tekst}
                        navn={navn}
                        tekstMaksLengde={tekstMaksLengde}
                        updateTekst={tekst =>
                            updateState({
                                tekst: tekst.replace(/[^a-zA-Z0-9,æøåÆØÅ!?.*<>":;/(){}|+#$¢=&%£\-\[\]\s]/g, '')
                            })
                        }
                        feilmelding={
                            !NyMeldingValidator.tekst(state) && state.visFeilmeldinger
                                ? `Du må skrive en tekst på mellom 1 og ${tekstMaksLengde} tegn`
                                : undefined
                        }
                    />
                    <VelgDialogType formState={state} updateDialogType={dialogType => updateState({ dialogType })} />
                    <Margin>
                        <UnmountClosed isOpened={erReferat} hasNestedCollapse={true}>
                            {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                            <Temavelger
                                setTema={tema => updateState({ tema: tema })}
                                valgtTema={state.tema}
                                visFeilmelding={!NyMeldingValidator.tema(state) && state.visFeilmeldinger}
                                temavalg={TemaSamtalereferat}
                            />
                            <StyledAlertStripeInfo>Gir ikke varsel til bruker</StyledAlertStripeInfo>
                        </UnmountClosed>
                        <UnmountClosed isOpened={erSporsmaal || erInfomelding} hasNestedCollapse={true}>
                            <DialogpanelVelgSak
                                setValgtSak={sak => updateState({ sak })}
                                visFeilmelding={!NyMeldingValidator.sak(state) && state.visFeilmeldinger}
                                valgtSak={state.sak}
                            />
                            {erSporsmaal ? (
                                <>
                                    <Oppgaveliste
                                        oppgaveliste={state.oppgaveListe}
                                        setOppgaveliste={oppgaveliste => updateState({ oppgaveListe: oppgaveliste })}
                                    />
                                    <StyledAlertStripeInfo>Gir varsel, bruker må svare</StyledAlertStripeInfo>
                                </>
                            ) : (
                                <StyledAlertStripeInfo>Gir varsel, bruker kan ikke svare</StyledAlertStripeInfo>
                            )}
                        </UnmountClosed>
                    </Margin>
                    <Feilmelding sendNyMeldingPanelState={props.sendNyMeldingPanelState.type} />
                    <KnappWrapper>
                        <KnappBase
                            type="hoved"
                            spinner={props.sendNyMeldingPanelState.type === SendNyMeldingStatus.POSTING}
                            htmlType="submit"
                        >
                            Del med {navn}
                        </KnappBase>
                        {props.formErEndret && (
                            <KnappMedBekreftPopup
                                htmlType="reset"
                                type="flat"
                                onBekreft={props.handleAvbryt}
                                bekreftKnappTekst={'Ja, avbryt'}
                                popUpTekst="Er du sikker på at du vil avbryte? Du mister da meldinger du har påbegynt."
                            >
                                Avbryt
                            </KnappMedBekreftPopup>
                        )}
                    </KnappWrapper>
                </FormStyle>
            </ReflowBoundry>
        </StyledArticle>
    );
}

export default SendNyMelding;
