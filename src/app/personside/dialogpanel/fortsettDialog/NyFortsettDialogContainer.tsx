import * as React from 'react';
import { FormEvent, useRef, useState, useCallback, useMemo } from 'react';
import { FortsettDialogValidator } from './nyValidatorer';
import { SendMeldingRequest, Traad, TraadType } from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useFodselsnummer } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import { SvarSendtKvittering } from './NyFortsettDialogKvittering';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { FetchError, post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';
import {
    DialogPanelStatus,
    FortsettDialogPanelState,
    FortsettDialogState,
    KvitteringsData
} from './NyFortsettDialogTypes';
import { Undertittel } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ReflowBoundry from '../ReflowBoundry';
import { Temagruppe } from '../../../../models/temagrupper';
import useDraft, { Draft } from '../use-draft';
import { Oppgave } from '../../../../models/meldinger/oppgave';
import tildelteoppgaver from '../../../../rest/resources/tildelteoppgaverResource';
import dialogResource from '../../../../rest/resources/dialogResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import { useQueryClient, UseQueryResult } from '@tanstack/react-query';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import NyFortsettDialog from './NyFortsettDialog';

interface Props {
    traad: Traad;
    defaultOppgaveDestinasjon: OppgavelisteValg;
}

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

export function finnPlukketOppgaveForTraad(
    traad: Traad,
    resource: UseQueryResult<Oppgave[], FetchError>
): { oppgave: Oppgave | undefined; erSTOOppgave: boolean } {
    if (!resource.data) {
        return { oppgave: undefined, erSTOOppgave: false };
    } else {
        const oppgave: Oppgave | undefined = resource.data.find(
            (oppgave: Oppgave) => oppgave.traadId === traad.traadId
        );
        const erSTOOppgave = oppgave !== undefined && oppgave.erSTOOppgave;

        return { oppgave, erSTOOppgave };
    }
}

function NyFortsettDialogContainer(props: Props) {
    const queryClient = useQueryClient();
    const initialState = useMemo(
        () => ({
            tekst: '',
            traadType: props.traad.traadType ?? TraadType.SAMTALEREFERAT,
            temagruppe: undefined,
            visFeilmeldinger: false,
            sak: undefined,
            oppgaveListe: props.defaultOppgaveDestinasjon,
            avsluttet: false
        }),
        [props.defaultOppgaveDestinasjon, props.traad.traadType]
    );

    const fnr = useFodselsnummer();
    const tittelId = useRef(guid());
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const valgtEnhet = useValgtenhet().enhetId;
    const draftLoader = useCallback(
        (draft: Draft) => setState((current) => ({ ...current, tekst: draft.content })),
        [setState]
    );
    const draftContext = useMemo(() => ({ fnr }), [fnr]);
    const { update: updateDraft, remove: removeDraft } = useDraft(draftContext, draftLoader);
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const [dialogStatus, setDialogStatus] = useState<FortsettDialogPanelState>({
        type: DialogPanelStatus.UNDER_ARBEID
    });
    const dispatch = useDispatch();
    const updateState = useCallback(
        (change: Partial<FortsettDialogState>) =>
            setState((currentState) => {
                if (change.tekst !== undefined) {
                    updateDraft(change.tekst);
                }
                return { ...currentState, visFeilmeldinger: false, ...change };
            }),
        [setState, updateDraft]
    );

    const opprettHenvendelse = useOpprettHenvendelse(props.traad);

    if (dialogStatus.type === DialogPanelStatus.SVAR_SENDT) {
        return <SvarSendtKvittering kvitteringsData={dialogStatus.kvitteringsData} />;
    }

    if (opprettHenvendelse.success === false) {
        return opprettHenvendelse.placeholder;
    }

    const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(props.traad, tildelteOppgaverResource);
    const oppgaveId = oppgave ? oppgave.oppgaveId : opprettHenvendelse.henvendelse.oppgaveId;

    const handleAvbryt = () => {
        removeDraft();
        dispatch(setIngenValgtTraadDialogpanel());
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (dialogStatus.type === DialogPanelStatus.POSTING) {
            return;
        }
        const callback = () => {
            removeDraft();
            tildelteOppgaverResource.refetch();
            queryClient.invalidateQueries(dialogResource.queryKey(fnr, valgtEnhet));
        };

        const erOppgaveTilknyttetAnsatt = state.oppgaveListe === OppgavelisteValg.MinListe;
        const commonPayload = {
            enhet: valgtEnhet,
            fritekst: state.tekst,
            traadId: props.traad.traadId,
            traadType: state.traadType,
            temagruppe: props.traad.temagruppe,
            behandlingsId: opprettHenvendelse.henvendelse.behandlingsId,
            oppgaveId: oppgaveId,
            avsluttet: state.avsluttet
        };
        if (FortsettDialogValidator.erGyldigSamtalereferat(state)) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: true
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Send-Svar')
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigSamtale(state)) {
            const tradErJournalfort = erJournalfort(props.traad);
            const erOksos = props.traad.meldinger[0].temagruppe === Temagruppe.ØkonomiskSosial;
            if (!state.sak && !tradErJournalfort && !erOksos) {
                const error = Error(
                    'For å opprette spørsmål må meldingen være journalført, sak må være valgt, eller være på temagruppen OKSOS'
                );
                console.error(error);
                loggError(error);
                updateState({ errors: [error], visFeilmeldinger: true });
                return;
            }
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: SendMeldingRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: state.avsluttet ? false : erOppgaveTilknyttetAnsatt,
                sak: state.sak ? state.sak : undefined
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/sendmelding`, request, 'Svar-Med-Spørsmål')
                .then(() => {
                    callback();
                    queryClient.invalidateQueries(journalsakResource.queryKey(fnr));
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else {
            const error = Error('Det skjedde en feil ved sending av melding');
            updateState({ errors: [error], visFeilmeldinger: true });
        }
    };

    function traadTittel(traadType?: TraadType) {
        switch (traadType) {
            case TraadType.CHAT:
                return 'Fortsett chat';
            case TraadType.MELDINGSKJEDE:
                return 'Fortsett samtale';
            case TraadType.SAMTALEREFERAT:
                return 'Påfølgende referat';
            default:
                return '';
        }
    }

    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <Undertittel id={tittelId.current}>{traadTittel(props.traad.traadType)}</Undertittel>
                <NyFortsettDialog
                    handleAvbryt={handleAvbryt}
                    state={state}
                    updateState={updateState}
                    handleSubmit={handleSubmit}
                    traad={props.traad}
                    key={props.traad.traadId}
                    fortsettDialogPanelState={dialogStatus}
                    erTilknyttetOppgave={!!oppgaveId}
                    erSTOOppgave={erSTOOppgave}
                />
            </ReflowBoundry>
        </StyledArticle>
    );
}

export default NyFortsettDialogContainer;
