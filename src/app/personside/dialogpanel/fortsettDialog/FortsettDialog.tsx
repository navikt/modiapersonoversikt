import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import type { FormEvent } from 'react';
import { UnmountClosed } from 'react-collapse';
import styled from 'styled-components';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import { type Traad, TraadType } from '../../../../models/meldinger/meldinger';
import persondataResource from '../../../../rest/resources/persondataResource';
import { capitalizeName } from '../../../../utils/string-utils';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import DraftStatus from '../DraftStatus';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import DialogpanelVelgSak from '../sendMelding/DialogpanelVelgSak';
import Oppgaveliste from '../sendMelding/Oppgaveliste';
import TekstFelt from '../sendMelding/TekstFelt';
import type { DraftState } from '../use-draft';
import { DialogPanelStatus, type FortsettDialogPanelState, type FortsettDialogState } from './FortsettDialogTypes';
import TidligereMeldinger from './tidligereMeldinger/TidligereMeldinger';
import { FortsettDialogValidator } from './validatorer';

const SubmitKnapp = styled(Hovedknapp)`
    white-space: normal;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    margin-top: 1rem;
`;

const StyledCheckbox = styled(Checkbox)`
    margin-top: 1rem;
`;

interface Props {
    handleSubmit: (event: FormEvent) => void;
    handleAvbryt: () => void;
    state: FortsettDialogState;
    updateState: (change: Partial<FortsettDialogState>) => void;
    traad: Traad;
    erTilknyttetOppgave: boolean;
    erSTOOppgave: boolean;
    fortsettDialogPanelState: FortsettDialogPanelState;
    draftState?: DraftState;
}

function Feilmelding(props: { status: DialogPanelStatus; errors?: Error[] }) {
    if (props.status === DialogPanelStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }

    if (props.errors) {
        props.errors.map((error) => {
            //biome-ignore lint/correctness/useJsxKeyInIterable: biome migration
            return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
        });
    }

    return null;
}

const tekstMaksLengde = 5000;

function FortsettDialog(props: Props) {
    const { state, updateState, handleAvbryt, handleSubmit } = props;
    const personResponse = persondataResource.useFetch();

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const delMedBrukerTekst = props.erTilknyttetOppgave ? `Del med ${navn} og avslutt oppgave` : `Del med ${navn}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const erOksosTraad = props.traad.meldinger.some((it) => it.temagruppe === 'OKSOS');

    const erSamtalereferat = props.traad.traadType === TraadType.SAMTALEREFERAT;
    const visFeilmelding = !FortsettDialogValidator.sak(state) && state.visFeilmeldinger;
    const visVelgSak = !erJournalfort(props.traad) && !erOksosTraad;
    const draftState = props.draftState;

    return (
        <FormStyle onSubmit={handleSubmit}>
            <TidligereMeldinger traad={props.traad} />
            <TekstFelt
                tekst={state.tekst}
                navn={navn}
                tekstMaksLengde={tekstMaksLengde}
                updateTekst={(tekst) => updateState({ tekst: tekst })}
                feilmelding={
                    !FortsettDialogValidator.tekst(state) && state.visFeilmeldinger
                        ? `Du må skrive en tekst på mellom 1 og ${tekstMaksLengde} tegn`
                        : undefined
                }
            />
            {draftState && state.tekst.length > 0 && <DraftStatus state={draftState} />}

            <div>
                <UnmountClosed isOpened={!erSamtalereferat}>
                    <Panel>
                        {visVelgSak && (
                            <DialogpanelVelgSak
                                setValgtSak={(sak) => updateState({ sak: sak })}
                                valgtSak={state.sak}
                                visFeilmelding={visFeilmelding}
                            />
                        )}

                        {visVelgSak && visFeilmelding && (
                            <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding>
                        )}

                        {!state.avsluttet ? (
                            <Oppgaveliste
                                oppgaveliste={state.oppgaveListe}
                                setOppgaveliste={(oppgaveliste) => updateState({ oppgaveListe: oppgaveliste })}
                            />
                        ) : (
                            <StyledAlertStripeInfo>Bruker kan ikke skrive mer i denne samtalen</StyledAlertStripeInfo>
                        )}
                        <StyledCheckbox
                            label={'Avslutt samtale etter sending'}
                            checked={state.avsluttet}
                            onChange={() => updateState({ avsluttet: !state.avsluttet })}
                        />
                    </Panel>
                </UnmountClosed>
            </div>
            <Feilmelding status={props.fortsettDialogPanelState.type} errors={props.state.errors} />
            <SubmitKnapp htmlType="submit" spinner={props.fortsettDialogPanelState.type === DialogPanelStatus.POSTING}>
                {delMedBrukerTekst}
            </SubmitKnapp>
            <StyledKnappMedBekreftPopup
                htmlType="reset"
                type="flat"
                onBekreft={handleAvbryt}
                bekreftKnappTekst={'Ja, avbryt'}
                popUpTekst="Er du sikker på at du vil avbryte? Du mister da meldinger du har påbegynt."
            >
                Avbryt
            </StyledKnappMedBekreftPopup>
        </FormStyle>
    );
}

export default FortsettDialog;
