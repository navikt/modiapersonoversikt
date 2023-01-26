import * as React from 'react';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { OppgavelisteValg, SendNyMeldingState } from './SendNyMelding';
import { NyMeldingValidator } from './validatorer';
import { Meldingstype, SendReferatRequest, SendSamtaleRequest, Traad } from '../../../../models/meldinger/meldinger';
import { useFodselsnummer } from '../../../../utils/customHooks';
import {
    InfomeldingSendtKvittering,
    ReferatSendtKvittering,
    MeldingSendtFeilet,
    SporsmalSendtKvittering
} from './SendNyMeldingKvittering';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { KvitteringNyMelding, SendNyMeldingPanelState, SendNyMeldingStatus } from './SendNyMeldingTypes';
import useDraft, { Draft } from '../use-draft';
import { feilMeldinger } from './FeilMeldinger';
import dialogResource from '../../../../rest/resources/dialogResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import { useQueryClient } from '@tanstack/react-query';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import NySendNyMelding, { NySendNyMeldingState } from './NySendNyMelding';

interface Props {
    defaultOppgaveDestinasjon: OppgavelisteValg;
}

function NySendNyMeldingContainer(props: Props) {
    const queryClient = useQueryClient();
    const initialState: NySendNyMeldingState = useMemo(
        () => ({
            tekst: '',
            dialogType: Meldingstype.SAMTALEREFERAT_OPPMOTE,
            tema: undefined,
            sak: undefined,
            avslutteSamtale: false,
            oppgaveListe: props.defaultOppgaveDestinasjon,
            visFeilmeldinger: false
        }),
        [props.defaultOppgaveDestinasjon]
    );
    const fnr = useFodselsnummer();

    const valgtEnhet = useValgtenhet().enhetId;
    const [state, setState] = useState<NySendNyMeldingState>(initialState);
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
                request={sendNyMeldingStatus.request}
                lukk={lukkSendtKvittering}
            />
        );
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.SPORSMAL_SENDT) {
        return (
            <SporsmalSendtKvittering
                kvitteringNyMelding={sendNyMeldingStatus.kvitteringNyMelding}
                lukk={lukkSendtKvittering}
            />
        );
    }
    if (sendNyMeldingStatus.type === SendNyMeldingStatus.INFORMELDING_SENDT) {
        return (
            <InfomeldingSendtKvittering
                kvitteringNyMelding={sendNyMeldingStatus.kvitteringNyMelding}
                lukk={lukkSendtKvittering}
            />
        );
    }

    if (sendNyMeldingStatus.type === SendNyMeldingStatus.ERROR) {
        return <MeldingSendtFeilet fritekst={sendNyMeldingStatus.fritekst} lukk={lukkSendtKvittering} />;
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
        if (sendNyMeldingStatus.type === SendNyMeldingStatus.POSTING) {
            return;
        }
        const callback = () => {
            removeDraft();
            updateState(initialState);
            queryClient.invalidateQueries(dialogResource.queryKey(fnr, valgtEnhet));
        };

        if (
            NyMeldingValidator.erGyldigReferat(state) &&
            state.tema &&
            state.dialogType !== Meldingstype.SPORSMAL_MODIA_UTGAAENDE &&
            state.dialogType !== Meldingstype.INFOMELDING_MODIA_UTGAAENDE
        ) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendReferatRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                meldingstype: state.dialogType,
                temagruppe: state.tema
            };
            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendreferat`, request, 'Send-Referat')
                .then((traad) => {
                    const kvitteringNyMelding: KvitteringNyMelding = {
                        fritekst: request.fritekst,
                        traad: traad
                    };
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.REFERAT_SENDT, request, kvitteringNyMelding });
                })
                .catch((error) => {
                    console.error('Send-Referat feilet', error);
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.ERROR, fritekst: request.fritekst });
                });
        } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
            setSendNyMeldingStatus({ type: SendNyMeldingStatus.POSTING });
            const request: SendSamtaleRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                sak: state.sak,
                avslutteSamtale: state.avslutteSamtale,
                erOppgaveTilknyttetAnsatt: state.oppgaveListe === OppgavelisteValg.MinListe
            };
            post<Traad>(`${apiBaseUri}/dialog/${fnr}/sendsporsmal`, request, 'Send-Sporsmal')
                .then((traad) => {
                    const kvitteringNyMelding: KvitteringNyMelding = {
                        fritekst: request.fritekst,
                        traad: traad
                    };
                    queryClient.invalidateQueries(journalsakResource.queryKey(fnr));
                    callback();
                    setSendNyMeldingStatus({ type: SendNyMeldingStatus.SPORSMAL_SENDT, kvitteringNyMelding });
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

    return (
        <NySendNyMelding
            updateState={updateState}
            state={state}
            handleSubmit={handleSubmit}
            handleAvbryt={handleAvbryt}
            formErEndret={state !== initialState}
            sendNyMeldingPanelState={sendNyMeldingStatus}
        />
    );
}

export default NySendNyMeldingContainer;
