import * as React from 'react';
import { FormEvent, useRef } from 'react';
import { TraadType } from '../../../../models/meldinger/meldinger';
import { UnmountClosed } from 'react-collapse';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import Temavelger from '../component/Temavelger';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import DialogpanelVelgSak from './DialogpanelVelgSak';
import { capitalizeName } from '../../../../utils/string-utils';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { NyMeldingValidator } from './nyValidatorer';
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
import NyVelgDialogType from './NyVelgDialogType';
import Panel from 'nav-frontend-paneler';

export enum OppgavelisteValg {
    MinListe = 'MinListe',
    EnhetensListe = 'Enhetensliste'
}

export interface NySendNyMeldingState {
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

export const tekstMaksLengde = 10000;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: NySendNyMeldingState;
    updateState: (change: Partial<NySendNyMeldingState>) => void;
    formErEndret: boolean;
    sendNyMeldingPanelState: SendNyMeldingPanelState;
}

function Feilmelding(props: { sendNyMeldingPanelState: SendNyMeldingStatus }) {
    if (props.sendNyMeldingPanelState === SendNyMeldingStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return null;
}

function NySendNyMelding(props: Props) {
    const updateState = props.updateState;
    const state = props.state;
    const personResponse = persondataResource.useFetch();
    const tittelId = useRef(guid());

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const erReferat = NyMeldingValidator.erReferat(state);
    const erSamtale = NyMeldingValidator.erSamtale(state);
    const visFeilmelding = !NyMeldingValidator.sak(state) && state.visFeilmeldinger;
    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <StyledUndertittel id={tittelId.current}>Send ny melding</StyledUndertittel>
                <FormStyle onSubmit={props.handleSubmit}>
                    <TekstFelt
                        tekst={state.tekst}
                        navn={navn}
                        tekstMaksLengde={tekstMaksLengde}
                        updateTekst={(tekst) => updateState({ tekst })}
                        feilmelding={
                            !NyMeldingValidator.tekst(state) && state.visFeilmeldinger
                                ? `Du må skrive en tekst på mellom 1 og ${tekstMaksLengde} tegn`
                                : undefined
                        }
                    />
                    <NyVelgDialogType formState={state} updateTraadType={(traadType) => updateState({ traadType })} />
                    <div>
                        <UnmountClosed isOpened={erReferat}>
                            {/* hasNestedCollapse={true} for å unngå rar animasjon på feilmelding*/}
                            <Temavelger
                                setTema={(tema) => updateState({ tema: tema })}
                                valgtTema={state.tema}
                                visFeilmelding={!NyMeldingValidator.tema(state) && state.visFeilmeldinger}
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
                                        Bruker kan ikke skrive mer i denne samtalen
                                    </StyledAlertStripeInfo>
                                )}
                                <StyledCheckbox
                                    label={'Avslutt samtale etter sending'}
                                    checked={state.avsluttet}
                                    onChange={() => updateState({ avsluttet: !state.avsluttet })}
                                />
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

export default NySendNyMelding;
