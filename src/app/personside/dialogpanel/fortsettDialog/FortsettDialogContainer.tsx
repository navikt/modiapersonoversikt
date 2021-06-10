import * as React from 'react';
import { FormEvent, useRef, useState, useCallback, useMemo } from 'react';
import FortsettDialog from './FortsettDialog';
import { FortsettDialogValidator } from './validatorer';
import { ForsettDialogRequest, Meldingstype, SendDelsvarRequest, Traad } from '../../../../models/meldinger/meldinger';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { useAppState, useFodselsnummer } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import {
    DelsvarRegistrertKvittering,
    OppgaveLagtTilbakeKvittering,
    SvarSendtKvittering
} from './FortsettDialogKvittering';
import useOpprettHenvendelse from './useOpprettHenvendelse';
import { erEldsteMeldingJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { post } from '../../../../api/api';
import { apiBaseUri } from '../../../../api/config';
import {
    DialogPanelStatus,
    FortsettDialogPanelState,
    FortsettDialogState,
    KvitteringsData
} from './FortsettDialogTypes';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { Undertittel } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ReflowBoundry from '../ReflowBoundry';
import { Temagruppe } from '../../../../models/temagrupper';
import useDraft, { Draft } from '../use-draft';
import * as JournalforingUtils from '../../journalforings-use-fetch-utils';
import { Oppgave } from '../../../../models/meldinger/oppgave';
import { hasData, RestResource } from '../../../../rest/utils/restResource';
import { selectValgtEnhet } from '../../../../redux/session/session';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE
    | Meldingstype.SAMTALEREFERAT_OPPMOTE
    | Meldingstype.SAMTALEREFERAT_TELEFON;

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    padding: 1rem ${theme.margin.layout};
`;

export function finnPlukketOppgaveForTraad(
    traad: Traad,
    resource: RestResource<Oppgave[]>
): { oppgave: Oppgave | undefined; erSTOOppgave: boolean } {
    if (!hasData(resource)) {
        return { oppgave: undefined, erSTOOppgave: false };
    } else {
        const oppgave: Oppgave | undefined = resource.data.find(
            (oppgave: Oppgave) => oppgave.traadId === traad.traadId
        );
        const erSTOOppgave = oppgave !== undefined && oppgave.erSTOOppgave;

        return { oppgave, erSTOOppgave };
    }
}

function FortsettDialogContainer(props: Props) {
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    };

    const fnr = useFodselsnummer();
    const tittelId = useRef(guid());
    const [state, setState] = useState<FortsettDialogState>(initialState);
    const valgtEnhet = useAppState(selectValgtEnhet);
    const draftLoader = useCallback((draft: Draft) => setState(current => ({ ...current, tekst: draft.content })), [
        setState
    ]);
    const draftContext = useMemo(() => ({ fnr }), [fnr]);
    const { update: updateDraft, remove: removeDraft } = useDraft(draftContext, draftLoader);
    const reloadMeldinger = useRestResource(resources => resources.traader).actions.reload;
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const tildelteOppgaver = tildelteOppgaverResource.resource;
    const reloadTildelteOppgaver = tildelteOppgaverResource.actions.reload;
    const [dialogStatus, setDialogStatus] = useState<FortsettDialogPanelState>({
        type: DialogPanelStatus.UNDER_ARBEID
    });
    const dispatch = useDispatch();
    const updateState = useCallback(
        (change: Partial<FortsettDialogState>) =>
            setState(currentState => {
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
    if (dialogStatus.type === DialogPanelStatus.DELSVAR_SENDT) {
        return <DelsvarRegistrertKvittering kvitteringsData={dialogStatus.kvitteringsData} />;
    }
    if (dialogStatus.type === DialogPanelStatus.OPPGAVE_LAGT_TILBAKE) {
        return <OppgaveLagtTilbakeKvittering payload={dialogStatus.payload} />;
    }

    if (opprettHenvendelse.success === false) {
        return opprettHenvendelse.placeholder;
    }

    const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(props.traad, tildelteOppgaver);
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
            dispatch(reloadTildelteOppgaver);
            dispatch(reloadMeldinger);
        };

        const erOppgaveTilknyttetAnsatt = state.oppgaveListe === OppgavelisteValg.MinListe;
        const commonPayload = {
            enhet: valgtEnhet,
            fritekst: state.tekst,
            meldingstype: state.dialogType,
            traadId: props.traad.traadId,
            behandlingsId: opprettHenvendelse.henvendelse.behandlingsId,
            oppgaveId: oppgaveId
        };
        if (
            FortsettDialogValidator.erGyldigSvarSkriftlig(state) ||
            FortsettDialogValidator.erGyldigSvarOppmote(state) ||
            FortsettDialogValidator.erGyldigSvarTelefon(state) ||
            FortsettDialogValidator.erGyldigSamtalereferat(state)
        ) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: true // TODO, denne bør ikke være nødvendig å sende med her
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request, 'Send-Svar')
                .then(() => {
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigSporsmaalSkriftlig(state, props.traad)) {
            const erJournalfort = erEldsteMeldingJournalfort(props.traad);
            const erOksos = props.traad.meldinger[0].temagruppe === Temagruppe.ØkonomiskSosial;
            if (!state.sak && !erJournalfort && !erOksos) {
                const error = Error(
                    'For å opprette spørsmål må meldingen være journalført, sak må være valgt, eller være på temagruppen OKSOS'
                );
                console.error(error);
                loggError(error);
                return;
            }
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: ForsettDialogRequest = {
                ...commonPayload,
                erOppgaveTilknyttetAnsatt: erOppgaveTilknyttetAnsatt,
                sak: state.sak ? state.sak : undefined
            };
            const kvitteringsData: KvitteringsData = {
                fritekst: request.fritekst,
                meldingstype: request.meldingstype,
                traad: props.traad
            };
            post(`${apiBaseUri}/dialog/${fnr}/fortsett/ferdigstill`, request, 'Svar-Med-Spørsmål')
                .then(() => {
                    JournalforingUtils.slettCacheForSaker(fnr);
                    callback();
                    setDialogStatus({ type: DialogPanelStatus.SVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else if (FortsettDialogValidator.erGyldigDelsvar(state) && oppgaveId && state.temagruppe) {
            setDialogStatus({ type: DialogPanelStatus.POSTING });
            const request: SendDelsvarRequest = {
                enhet: valgtEnhet,
                fritekst: state.tekst,
                traadId: props.traad.traadId,
                oppgaveId: oppgaveId,
                temagruppe: state.temagruppe,
                behandlingsId: opprettHenvendelse.henvendelse.behandlingsId
            };
            post(`${apiBaseUri}/dialog/${fnr}/delvis-svar`, request, 'Send-Delsvar')
                .then(() => {
                    callback();
                    const kvitteringsData: KvitteringsData = {
                        fritekst: request.fritekst,
                        meldingstype: Meldingstype.DELVIS_SVAR_SKRIFTLIG,
                        temagruppe: request.temagruppe,
                        traad: props.traad
                    };
                    setDialogStatus({ type: DialogPanelStatus.DELSVAR_SENDT, kvitteringsData: kvitteringsData });
                })
                .catch(() => {
                    setDialogStatus({ type: DialogPanelStatus.ERROR });
                });
        } else {
            updateState({ visFeilmeldinger: true });
        }
    };

    const meldingMedTemagruppe = props.traad.meldinger.find(melding => melding.temagruppe);
    const temagruppe = meldingMedTemagruppe ? meldingMedTemagruppe.temagruppe : undefined;

    return (
        <StyledArticle aria-labelledby={tittelId.current}>
            <ReflowBoundry>
                <Undertittel id={tittelId.current}>Fortsett dialog</Undertittel>
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
                />
                {oppgaveId && erSTOOppgave && (
                    <LeggTilbakepanel
                        oppgaveId={oppgaveId}
                        traadId={props.traad.traadId}
                        status={dialogStatus}
                        setDialogStatus={setDialogStatus}
                        temagruppe={temagruppe}
                    />
                )}
            </ReflowBoundry>
        </StyledArticle>
    );
}

export default FortsettDialogContainer;
