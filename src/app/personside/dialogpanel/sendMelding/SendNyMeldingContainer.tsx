import * as React from 'react';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { MeldingValidator } from './validatorer';
import {
    Meldingstype,
    SendMeldingRequest,
    SendMeldingRequestV2,
    Traad,
    TraadType
} from '../../../../models/meldinger/meldinger';
import { useFodselsnummer } from '../../../../utils/customHooks';
import { MeldingSendtFeilet, ReferatSendtKvittering, SamtaleSendtKvittering } from './SendNyMeldingKvittering';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { KvitteringNyMelding, SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import useDraft, { Draft } from '../use-draft';
import dialogResource from '../../../../rest/resources/dialogResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import { useQueryClient } from '@tanstack/react-query';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import SendNyMelding, { OppgavelisteValg, SendNyMeldingState } from './SendNyMelding';
import useFeatureToggle from '../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import { Prompt } from 'react-router';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';

interface Props {
    defaultOppgaveDestinasjon: OppgavelisteValg;
}

function SendNyMeldingContainer(props: Props) {
    const queryClient = useQueryClient();
    const initialState: SendNyMeldingState = useMemo(
        () => ({
            tekst: '',
            traadType: TraadType.SAMTALEREFERAT,
            tema: undefined,
            sak: undefined,
            avsluttet: false,
            oppgaveListe: props.defaultOppgaveDestinasjon,
            visFeilmeldinger: false
        }),
        [props.defaultOppgaveDestinasjon]
    );
    const fnr = useFodselsnummer();

    const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

    const valgtEnhet = useValgtenhet().enhetId;
    const [state, setState] = useState<SendNyMeldingState>(initialState);
    const draftLoader = useCallback(
        (draft: Draft) => setState((current) => ({ ...current, tekst: draft.content })),
        [setState]
    );
    const draftContext = useMemo(() => ({ fnr }), [fnr]);
    const { update: updateDraft, remove: removeDraft } = useDraft(draftContext, draftLoader);
    const updateState = useCallback(
        (change: Partial<SendNyMeldingState>) =>
            setState((currentState) => {
                if (change.tekst !== undefined) {
                    updateDraft(change.tekst);
                }
                return { ...currentState, visFeilmeldinger: false, ...change };
            }),
        [setState, updateDraft]
    );

    const [sendNyMeldingStatus, setSendNyMeldingStatus] = useState<SendNyMeldingPanelState>({
        type: SendNyMeldingStatus.UNDER_ARBEID
    });

    useEffect(() => {
        const promptUser = (e: BeforeUnloadEvent) => {
            if (sendNyMeldingStatus.type !== SendNyMeldingStatus.POSTING) {
                return;
            }

            e.preventDefault();
            e.returnValue = true;
        };

        window.addEventListener('beforeunload', promptUser);
        return () => window.removeEventListener('beforeunload', promptUser);
    }, [sendNyMeldingStatus.type]);

    const lukkSendtKvittering = () => {
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
        setState(initialState);
    };

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.REFERAT_SENDT) {
        return (
            <ReferatSendtKvittering
                kvitteringNyMelding={sendNyMeldingStatus.kvitteringNyMelding}
                lukk={lukkSendtKvittering}
            />
        );
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.SAMTALE_SENDT) {
        return (
            <SamtaleSendtKvittering
                kvitteringNyMelding={sendNyMeldingStatus.kvitteringNyMelding}
                lukk={lukkSendtKvittering}
            />
        );
    }

    const cancelAndKeepDraft = (tekst: string) => {
        updateState({ tekst });
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
    };

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.ERROR) {
        return (
            <MeldingSendtFeilet
                fritekst={sendNyMeldingStatus.fritekst}
                lukk={() => cancelAndKeepDraft(sendNyMeldingStatus.fritekst)}
            />
        );
    }

    const handleAvbryt = () => {
        removeDraft();
        setState(initialState);
        setSendNyMeldingStatus({ type: SendNyMeldingStatus.UNDER_ARBEID });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (sendNyMeldingStatus.type === SendNyMeldingStatus.POSTING) {
            return;
        }
        const callback = () => {
            removeDraft();
            updateState(initialState);
            queryClient.invalidateQueries(dialogResource.queryKey(fnr, valgtEnhet));
        };

        const commonPayload = {
            traadType: state.traadType,
            enhet: valgtEnhet,
            fritekst: state.tekst
        };
        const url = isOn ? `${apiBaseUri}/v2/dialog/sendmelding` : `${apiBaseUri}/dialog/${fnr}/sendmelding`;

        if (MeldingValidator.erGyldigReferat(state) && state.tema) {
            const temagruppe = state.tema;
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                temagruppe
            };

            const requestV2: SendMeldingRequestV2 = {
                ...commonPayload,
                fnr,
                temagruppe
            };
            post<Traad>(url, isOn ? requestV2 : request, 'Send-Referat')
                .then((traad) => {
                    const kvitteringNyMelding: KvitteringNyMelding = {
                        fritekst: request.fritekst,
                        traad: traad
                    };
                    callback();
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.REFERAT_SENDT,
                        request: {
                            fritekst: request.fritekst,
                            enhet: valgtEnhet,
                            meldingstype: Meldingstype.SAMTALEREFERAT_TELEFON,
                            temagruppe
                        },
                        kvitteringNyMelding
                    });
                })
                .catch((error) => {
                    console.error('Send-Referat feilet', error);
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR, fritekst: request.fritekst });
                    updateState({ visFeilmeldinger: true });
                });
        } else if (MeldingValidator.erGyldigSamtale(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                sak: state.sak,
                avsluttet: state.avsluttet,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };

            const requestV2: SendMeldingRequestV2 = {
                ...commonPayload,
                fnr: fnr,
                sak: state.sak,
                avsluttet: state.avsluttet,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };

            post<Traad>(url, isOn ? requestV2 : request, 'Send-Sporsmal')
                .then((traad) => {
                    const kvitteringNyMelding: KvitteringNyMelding = {
                        fritekst: request.fritekst,
                        traad: traad
                    };
                    queryClient.invalidateQueries(journalsakResource.queryKey(fnr));
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.SAMTALE_SENDT, kvitteringNyMelding });
                })
                .catch((error) => {
                    console.error('Send-Sporsmal feilet', error);
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.ERROR,
                        fritekst: request.fritekst
                    });
                    updateState({ visFeilmeldinger: true });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    return (
        <>
            <IfFeatureToggleOn toggleID={FeatureToggles.VisPromptMeldingSending}>
                <Prompt
                    when={sendNyMeldingStatus.type === SendNyMeldingStatus.POSTING}
                    message={
                        'Meldingen sendes. Hvis du navigerer bort er det ikke sikkert den blir sendt. Er du sikker på at du vil fortsette?'
                    }
                />
            </IfFeatureToggleOn>
            <SendNyMelding
                updateState={updateState}
                state={state}
                handleSubmit={handleSubmit}
                handleAvbryt={handleAvbryt}
                formErEndret={state !== initialState}
                sendNyMeldingPanelState={sendNyMeldingStatus}
            />
        </>
    );
}

export default SendNyMeldingContainer;
