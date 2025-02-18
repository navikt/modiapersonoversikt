import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { guid } from 'nav-frontend-js-utils';
import KnappBase from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { type FormEvent, useRef } from 'react';
import { UnmountClosed } from 'react-collapse';
import styled from 'styled-components';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import type { TraadType } from '../../../../models/meldinger/meldinger';
import { TemaSamtalereferat, type Temagruppe } from '../../../../models/temagrupper';
import persondataResource from '../../../../rest/resources/persondataResource';
import theme from '../../../../styles/personOversiktTheme';
import { capitalizeName } from '../../../../utils/string-utils';
import type { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DraftStatus from '../DraftStatus';
import ReflowBoundry from '../ReflowBoundry';
import Temavelger from '../component/Temavelger';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import type { DraftState } from '../use-draft';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import Oppgaveliste from './Oppgaveliste';
import { type SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import TekstFelt from './TekstFelt';
import VelgDialogType from './VelgDialogType';
import { MeldingValidator } from './validatorer';

export enum OppgavelisteValg {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

export interface SendNyMeldingState {
    tekst: string;
    traadType: TraadType;
    tema?: Temagruppe;
    sak?: JournalforingsSak;
    oppgaveListe: OppgavelisteValg;
    visFeilmeldinger: boolean;
    avsluttet: boolean;
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

const StyledCheckbox = styled(Checkbox)`
    margin-top: 1rem;
`;

const StyledUndertittel = styled(Undertittel)`
    margin-bottom: 1rem !important;
`;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: SendNyMeldingState;
    updateState: (change: Partial<SendNyMeldingState>) => void;
    formErEndret: boolean;
    sendNyMeldingPanelState: SendNyMeldingPanelState;
    draftState?: DraftState;
}

export const tekstMaksLengde = 15000;

function Feilmelding(props: { sendNyMeldingPanelState: SendNyMeldingStatus }) {
    if (props.sendNyMeldingPanelState === SendNyMeldingStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return null;
}

function SendNyMelding(props: Props) {
    const updateState = props.updateState;
    const state = props.state;
    const personResponse = persondataResource.useFetch();
    const tittelId = useRef(guid());
    const draftState = props.draftState;

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const erReferat = MeldingValidator.erReferat(state);
    const erSamtale = MeldingValidator.erSamtale(state);
    const visFeilmelding = !MeldingValidator.sak(state) && state.visFeilmeldinger;
    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <StyledUndertittel id={tittelId.current}>Send ny melding</StyledUndertittel>
                <FormStyle onSubmit={props.handleSubmit}>
                    <div>
                        <TekstFelt
                            tekst={state.tekst}
                            navn={navn}
                            tekstMaksLengde={tekstMaksLengde}
                            updateTekst={(tekst) => updateState({ tekst })}
                            feilmelding={
                                !MeldingValidator.tekst(state) && state.visFeilmeldinger
                                    ? `Du må skrive en tekst på mellom 1 og ${tekstMaksLengde} tegn`
                                    : undefined
                            }
                        />
                        {draftState && state.tekst.length > 0 && <DraftStatus state={draftState} />}
                    </div>

                    <VelgDialogType
                        formState={state}
                        updateTraadType={(traadType, avsluttet) => updateState({ traadType, avsluttet })}
                    />
                    <div>
                        <UnmountClosed isOpened={erReferat}>
                            {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                            <Temavelger
                                setTema={(tema) => updateState({ tema: tema })}
                                valgtTema={state.tema}
                                visFeilmelding={!MeldingValidator.tema(state) && state.visFeilmeldinger}
                                temavalg={TemaSamtalereferat}
                            />
                            <StyledAlertStripeInfo>Gir ikke varsel til bruker</StyledAlertStripeInfo>
                        </UnmountClosed>
                        <UnmountClosed isOpened={erSamtale}>
                            <Panel>
                                <DialogpanelVelgSak setValgtSak={(sak) => updateState({ sak })} valgtSak={state.sak} />
                                {visFeilmelding ? (
                                    <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding>
                                ) : undefined}
                                {!state.avsluttet && (
                                    <>
                                        <Oppgaveliste
                                            oppgaveliste={state.oppgaveListe}
                                            setOppgaveliste={(oppgaveliste) =>
                                                updateState({ oppgaveListe: oppgaveliste })
                                            }
                                        />
                                        <StyledAlertStripeInfo>Gir varsel, bruker må svare</StyledAlertStripeInfo>
                                    </>
                                )}
                                {state.avsluttet && (
                                    <StyledAlertStripeInfo>
                                        Bruker får varsel, men kan ikke skrive mer i denne samtalen
                                    </StyledAlertStripeInfo>
                                )}
                                {!state.avsluttet && (
                                    <StyledCheckbox
                                        label={'Avslutt samtale etter sending'}
                                        checked={state.avsluttet}
                                        onChange={() => updateState({ avsluttet: !state.avsluttet })}
                                    />
                                )}
                            </Panel>
                        </UnmountClosed>
                    </div>
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
