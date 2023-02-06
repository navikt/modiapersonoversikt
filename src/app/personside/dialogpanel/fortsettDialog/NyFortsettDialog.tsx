import * as React from 'react';
import { FormEvent } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Traad, TraadType } from '../../../../models/meldinger/meldinger';
import TidligereMeldinger from './tidligereMeldinger/TidligereMeldinger';
import TekstFelt from '../sendMelding/TekstFelt';
import { UnmountClosed } from 'react-collapse';
import { Hovedknapp } from 'nav-frontend-knapper';
import { DialogpanelFeilmelding, FormStyle } from '../fellesStyling';
import KnappMedBekreftPopup from '../../../../components/KnappMedBekreftPopup';
import BrukerKanSvare from './NyBrukerKanSvare';
import styled from 'styled-components/macro';
import { FortsettDialogValidator } from './nyValidatorer';
import { DialogPanelStatus, FortsettDialogPanelState, FortsettDialogState } from './NyFortsettDialogTypes';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { capitalizeName } from '../../../../utils/string-utils';
import persondataResource from '../../../../rest/resources/persondataResource';
import { Checkbox } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';

const SubmitKnapp = styled(Hovedknapp)`
    white-space: normal;
`;

const StyledKnappMedBekreftPopup = styled(KnappMedBekreftPopup)`
    width: 100%;
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
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
}

function Feilmelding(props: { status: DialogPanelStatus }) {
    if (props.status === DialogPanelStatus.ERROR) {
        return <DialogpanelFeilmelding />;
    }
    return null;
}

export const tekstMaksLengde = 5000;

function NyFortsettDialog(props: Props) {
    const { state, updateState, handleAvbryt, handleSubmit } = props;
    const personResponse = persondataResource.useFetch();

    const navn = personResponse.data
        ? capitalizeName(personResponse.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';

    const delMedBrukerTekst = props.erTilknyttetOppgave ? `Del med ${navn} og avslutt oppgave` : `Del med ${navn}`;
    const erOksosTraad = props.traad.meldinger.some((it) => it.temagruppe === 'OKSOS');
    const eksisterendeSaker = props.traad.journalposter.map((jp) => ({
        temaKode: jp.journalfortTema,
        saksId: jp.journalfortSaksid
    }));

    const erSamtalereferat = props.traad.traadType === TraadType.SAMTALEREFERAT;
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

            <div>
                <UnmountClosed isOpened={!erSamtalereferat}>
                    <Panel>
                        <Checkbox
                            label={'Lukk samtale etter sending'}
                            checked={state.avsluttet}
                            onChange={() => updateState({ avsluttet: !state.avsluttet })}
                        />
                        {state.avsluttet && (
                            <StyledAlertStripeInfo>Bruker kan ikke skrive mer i denne samtalen</StyledAlertStripeInfo>
                        )}
                        {!state.avsluttet && (
                            <BrukerKanSvare
                                formState={state}
                                updateFormState={updateState}
                                visVelgSak={!erJournalfort(props.traad) && !erOksosTraad}
                                eksisterendeSaker={eksisterendeSaker}
                            />
                        )}
                    </Panel>
                </UnmountClosed>
            </div>
            <Feilmelding status={props.fortsettDialogPanelState.type} />
            <SubmitKnapp htmlType="submit" spinner={props.fortsettDialogPanelState.type === DialogPanelStatus.POSTING}>
                {delMedBrukerTekst}
            </SubmitKnapp>
            {!props.erTilknyttetOppgave && (
                <StyledKnappMedBekreftPopup
                    htmlType="reset"
                    type="flat"
                    onBekreft={handleAvbryt}
                    bekreftKnappTekst={'Ja, avbryt'}
                    popUpTekst="Er du sikker på at du vil avbryte? Du mister da meldinger du har påbegynt."
                >
                    Avbryt
                </StyledKnappMedBekreftPopup>
            )}
        </FormStyle>
    );
}

export default NyFortsettDialog;
