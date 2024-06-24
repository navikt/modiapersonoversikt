import * as React from 'react';
import { FormEvent, useRef } from 'react';
import { TraadType } from '../../../../models/meldinger/meldinger';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';
import Temavelger from '../component/Temavelger';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { capitalizeName } from '../../../../utils/string-utils';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { MeldingValidator } from './validatorer';
import TekstFelt from './TekstFelt';
import { Undertittel } from 'nav-frontend-typografi';
import Oppgaveliste from './Oppgaveliste';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import theme from '../../../../styles/personOversiktTheme';
import { SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import { Temagruppe, TemaSamtalereferat } from '../../../../models/temagrupper';
import { guid } from 'nav-frontend-js-utils';
import ReflowBoundry from '../ReflowBoundry';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import persondataResource from '../../../../rest/resources/persondataResource';
import VelgDialogType from './VelgDialogType';
import Panel from 'nav-frontend-paneler';
import { DraftState } from '../use-draft';
import { formatterDatoTid } from '../../../../utils/date-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import { CheckmarkCircleIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';

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

const DraftStatusWrapper = styled.div`
    display: flex;
    align-items: center;
    font-style: italic;
`;

const CheckmarkCircleIconGreen = styled(CheckmarkCircleIcon)`
    color: var(--a-icon-success);
`;

const ErrorText = styled.span`
    color: var(--a-text-danger);
`;

const ExclamationmarkTriangleIconRed = styled(ExclamationmarkTriangleIcon)`
    color var(--a-text-danger);
`;

const DraftStatus = ({ state }: { state: DraftState }) => {
    return (
        <DraftStatusWrapper className="typo-etikett-liten">
            {state.ok ? (
                <>
                    <CheckmarkCircleIconGreen />
                    Utkast lagret {state.saveTime ? formatterDatoTid(state.saveTime.toDate()) : ''}
                </>
            ) : state.loading ? (
                <>
                    <NavFrontendSpinner type="XXS" /> Lagrer utkast...
                </>
            ) : (
                <>
                    <ExclamationmarkTriangleIconRed /> <ErrorText>Utkast ikke lagret!</ErrorText>
                </>
            )}
        </DraftStatusWrapper>
    );
};

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
                        <IfFeatureToggleOn toggleID={FeatureToggles.VisDraftStatus}>
                            {draftState && state.tekst.length > 0 && <DraftStatus state={draftState} />}
                        </IfFeatureToggleOn>
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
                                <DialogpanelVelgSak
                                    setValgtSak={(sak) => updateState({ sak })}
                                    valgtSak={state.sak}
                                    eksisterendeSaker={[]}
                                />
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
