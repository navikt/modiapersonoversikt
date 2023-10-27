import * as React from 'react';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { MeldingValidator } from './validatorer';
import {
    Meldingstype,
    SendMeldingRequest,
    SendReferatRequest,
    Traad,
    TraadType
} from '../../../../models/meldinger/meldinger';
import { useFodselsnummer } from '../../../../utils/customHooks';
import { MeldingSendtFeilet, ReferatSendtKvittering, SamtaleSendtKvittering } from './SendNyMeldingKvittering';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { KvitteringNyMelding, SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import useDraft, { Draft } from '../use-draft';
import { feilMeldinger } from './FeilMeldinger';
import dialogResource from '../../../../rest/resources/dialogResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import { useQueryClient } from '@tanstack/react-query';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import SendNyMelding, { OppgavelisteValg, SendNyMeldingState } from './SendNyMelding';
import useFeatureToggle from '../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

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

    const { isOn } = useFeatureToggle(FeatureToggles.DebugMeldingsFunksjonalitet);

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

    const handleFeilMelding = (error: Error) => {
        const feilType = JSON.parse(error.toString()).type;
        return feilMeldinger[feilType];
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isOn) {
            handleSubmitDebug();
            return;
        }
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

        if (MeldingValidator.erGyldigReferat(state) && state.tema) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                temagruppe: state.tema
            };

            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Send-Referat')
                .then((traad) => {
                    const kvitteringNyMelding: KvitteringNyMelding = {
                        fritekst: request.fritekst,
                        traad: traad
                    };
                    callback();
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.REFERAT_SENDT,
                        request: {} as SendReferatRequest,
                        kvitteringNyMelding
                    });
                })
                .catch((error) => {
                    console.error('Send-Referat feilet', error);
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR, fritekst: request.fritekst });
                });
        } else if (MeldingValidator.erGyldigSamtale(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                sak: state.sak,
                avsluttet: state.avsluttet,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };

            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Send-Sporsmal')
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
                    callback();
                    console.error('Send-Sporsmal feilet', error);
                    setSendNyMeldingStatus({
                        type: SendNyMeldingStatus.ERROR,
                        fritekst: handleFeilMelding(error)
                    });
                    updateState({ visFeilmeldinger: true });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const handleSubmitDebug = () => {
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
        if (MeldingValidator.erGyldigReferat(state) && state.tema) {
            const temagruppe = state.tema;
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                temagruppe
            };

            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Send-Referat')
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

            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Send-Sporsmal')
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
        <SendNyMelding
            updateState={updateState}
            state={state}
            handleSubmit={handleSubmit}
            handleAvbryt={handleAvbryt}
            formErEndret={state !== initialState}
            sendNyMeldingPanelState={sendNyMeldingStatus}
        />
    );
}

export default SendNyMeldingContainer;
