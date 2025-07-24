import { type UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { Block } from '@tanstack/react-router';
import { guid } from 'nav-frontend-js-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { type FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePersonAtomValue } from 'src/lib/state/context';
import styled from 'styled-components';
import { type FetchError, post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import { type SendMeldingRequestV2, type Traad, TraadType } from '../../../../models/meldinger/meldinger';
import type { Oppgave } from '../../../../models/meldinger/oppgave';
import { Temagruppe } from '../../../../models/temagrupper';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import dialogResource from '../../../../rest/resources/dialogResource';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import tildelteoppgaver from '../../../../rest/resources/tildelteoppgaverResource';
import theme from '../../../../styles/personOversiktTheme';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import ReflowBoundry from '../ReflowBoundry';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import useDraft, { type Draft } from '../use-draft';
import { useAlertOnNavigation } from '../useAlertOnNavigation';
import FortsettDialog from './FortsettDialog';
import { SvarSendtKvittering } from './FortsettDialogKvittering';
import {
    DialogPanelStatus,
    type FortsettDialogPanelState,
    type FortsettDialogState,
    type KvitteringsData
} from './FortsettDialogTypes';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { FortsettDialogValidator } from './validatorer';

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
    }
    const oppgave: Oppgave | undefined = resource.data.find((oppgave: Oppgave) => oppgave.traadId === traad.traadId);
    const erSTOOppgave = !!oppgave?.erSTOOppgave;

    return { oppgave, erSTOOppgave };
}

function FortsettDialogContainer(props: Props) {
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

    const fnr = usePersonAtomValue();
    const tittelId = useRef(guid());
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const valgtEnhet = useValgtenhet().enhetId;
    const draftLoader = useCallback(
        (draft: Draft) => setState((current) => ({ ...current, tekst: draft.content })),
        []
    );
    const draftContext = useMemo(() => ({ fnr }), [fnr]);
    const { update: updateDraft, remove: removeDraft, status: draftStatus } = useDraft(draftContext, draftLoader);
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
        [updateDraft]
    );

    const opprettHenvendelse = useOpprettHenvendelse(props.traad);

    useAlertOnNavigation(!!state.errors?.length);

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
            queryClient.invalidateQueries({
                queryKey: dialogResource.queryKey(fnr, valgtEnhet)
            });
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
        const url = `${apiBaseUri}/dialog/sendmelding`;

        if (FortsettDialogValidator.erGyldigSamtalereferat(state)) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const requestV2: SendMeldingRequestV2 = {
                ...commonPayload,
                fnr,
                erOppgaveTilknyttetAnsatt: true
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: requestV2.fritekst,
                traad: props.traad
            };
            post(url, requestV2, 'Send-Svar')
                .then(() => {
                    callback();
                    setDialogStatus({
                        type: DialogPanelStatus.SVAR_SENDT,
                        kvitteringsData: kvitteringsData
                    });
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
                loggError(error);
                updateState({ errors: [error], visFeilmeldinger: true });
                return;
            }
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const requestV2: SendMeldingRequestV2 = {
                ...commonPayload,
                fnr,
                erOppgaveTilknyttetAnsatt: state.avsluttet ? false : erOppgaveTilknyttetAnsatt,
                sak: state.sak ? state.sak : undefined
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: requestV2.fritekst,
                traad: props.traad
            };
            post(url, requestV2, 'Svar-Med-Spørsmål')
                .then(() => {
                    callback();
                    queryClient.invalidateQueries({
                        queryKey: journalsakResource.queryKey(fnr)
                    });
                    setDialogStatus({
                        type: DialogPanelStatus.SVAR_SENDT,
                        kvitteringsData: kvitteringsData
                    });
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
                <IfFeatureToggleOn toggleID={FeatureToggles.VisPromptMeldingSending}>
                    <Block
                        condition={!!state.errors?.length}
                        blockerFn={() =>
                            window.confirm(
                                'Det skjedde en feil ved sending av meldingen. Hvis du trykker avbryt kan du prøve å sende den igjen.'
                            )
                        }
                    />
                </IfFeatureToggleOn>
                <FortsettDialog
                    handleAvbryt={handleAvbryt}
                    state={state}
                    updateState={updateState}
                    handleSubmit={handleSubmit}
                    traad={props.traad}
                    key={props.traad.traadId}
                    fortsettDialogPanelState={dialogStatus}
                    erTilknyttetOppgave={!!oppgaveId}
                    erSTOOppgave={erSTOOppgave}
                    draftState={draftStatus}
                />
            </ReflowBoundry>
        </StyledArticle>
    );
}

export default FortsettDialogContainer;
