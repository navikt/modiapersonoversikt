import * as React from 'react';
import { FormEvent, useEffect, useState } from 'react';
import FortsettDialog from './FortsettDialog';
import { isFailedPosting, isFinishedPosting, isPosting } from '../../../../rest/utils/postResource';
import { FortsettDialogValidator } from './validatorer';
import { Meldingstype, Traad } from '../../../../models/meldinger/meldinger';
import { setIngenTraadBesvaresIDialogpanel } from '../../../../redux/oppgave/actions';
import { usePrevious, useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { OppgavelisteValg } from '../sendMelding/SendNyMelding';
import { Kodeverk } from '../../../../models/kodeverk';
import { Oppgave } from '../../../../models/oppgave';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import LeggTilbakepanel from './leggTilbakePanel/LeggTilbakepanel';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { DialogpanelFeilmelding } from '../fellesStyling';
import { LeggTilbakeOppgaveFeil, OppgaveLagtTilbakeKvittering, SvarSendtKvittering } from './FortsettDialogKvittering';

export type FortsettDialogType =
    | Meldingstype.SVAR_SKRIFTLIG
    | Meldingstype.DELVIS_SVAR_SKRIFTLIG
    | Meldingstype.SVAR_OPPMOTE
    | Meldingstype.SVAR_TELEFON
    | Meldingstype.SPORSMAL_MODIA_UTGAAENDE;

export interface FortsettDialogState {
    tekst: string;
    dialogType: FortsettDialogType;
    tema?: Kodeverk;
    oppgave?: Oppgave;
    oppgaveListe: OppgavelisteValg;
    sak?: JournalforingsSak;
    visFeilmeldinger: boolean;
}

interface Props {
    traad: Traad;
    tilknyttetOppgave?: Oppgave;
}

function FortsettDialogContainer(props: Props) {
    const initialState = {
        tekst: '',
        dialogType: Meldingstype.SVAR_SKRIFTLIG as FortsettDialogType,
        tema: undefined,
        oppgave: props.tilknyttetOppgave,
        visFeilmeldinger: false,
        sak: undefined,
        oppgaveListe: OppgavelisteValg.MinListe
    };

    const [state, setState] = useState<FortsettDialogState>(initialState);
    const sendSvarResource = useRestResource(resources => resources.sendSvar);
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);
    const reloadMeldinger = useRestResource(resources => resources.tråderOgMeldinger.actions.reload);
    const dispatch = useDispatch();
    const updateState = (change: Partial<FortsettDialogState>) =>
        setState({
            ...state,
            visFeilmeldinger: false,
            ...change
        });

    const previous = usePrevious(props.traad);

    useEffect(() => {
        if (previous !== props.traad) {
            setState(initialState);
        }
    }, [props.traad, setState, previous, initialState]);

    const handleAvbryt = () => dispatch(setIngenTraadBesvaresIDialogpanel());

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isPosting(sendSvarResource)) {
            return;
        }
        const callback = () => {
            updateState(initialState);
            dispatch(reloadMeldinger);
        };
        if (FortsettDialogValidator.erGyldigSvarSkriftlig(state)) {
            dispatch(
                sendSvarResource.actions.post(
                    {
                        fritekst: state.tekst,
                        traadId: props.traad.traadId,
                        meldingstype: state.dialogType,
                        erOppgaveTilknyttetAnsatt: true,
                        oppgaveId: props.tilknyttetOppgave && props.tilknyttetOppgave.oppgaveid
                    },
                    callback
                )
            );
        } else if (FortsettDialogValidator.erGyldigSpørsmålSkriftlig(state)) {
            alert('Ikke implementert');
            console.log('spørsmål skriftlig: ', state);
        } else if (FortsettDialogValidator.erGyldigDelsvar(state)) {
            alert('Ikke implementert');
            console.log('delvis svar: ', state);
        } else if (FortsettDialogValidator.erGyldigSvarOppmote(state)) {
            alert('Ikke implementert');
            console.log('svar oppmøte: ', state);
        } else if (FortsettDialogValidator.erGyldigSvarTelefon(state)) {
            alert('Ikke implementert');
            console.log('svar telefon: ', state);
        } else {
            alert('Ikke implementert');
            updateState({ visFeilmeldinger: true });
        }
    };

    if (isPosting(sendSvarResource) || isPosting(leggTilbakeResource)) {
        return <CenteredLazySpinner type="XL" delay={100} />;
    }

    if (isFinishedPosting(sendSvarResource)) {
        return <SvarSendtKvittering resource={sendSvarResource} />;
    }

    if (isFinishedPosting(leggTilbakeResource)) {
        return <OppgaveLagtTilbakeKvittering resource={leggTilbakeResource} />;
    }

    if (isFailedPosting(sendSvarResource)) {
        return <DialogpanelFeilmelding resource={sendSvarResource} />;
    }
    if (isFailedPosting(leggTilbakeResource)) {
        return <LeggTilbakeOppgaveFeil resource={leggTilbakeResource} />;
    }

    return (
        <>
            <FortsettDialog
                handleAvbryt={handleAvbryt}
                state={state}
                updateState={updateState}
                handleSubmit={handleSubmit}
                traad={props.traad}
                key={props.traad.traadId}
            />
            {props.tilknyttetOppgave && <LeggTilbakepanel oppgave={props.tilknyttetOppgave} />}
        </>
    );
}

export default FortsettDialogContainer;
