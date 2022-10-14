import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import { useDispatch } from 'react-redux';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import brukersdialog from '../../../rest/resources/brukersdialog';
import { hasData } from '@nutgaard/use-fetch';

function GaaTilNesteOppgaveKnapp(props: { lukk: () => void }) {
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const traader = brukersdialog.useFetch();
    const nesteOppgavePaBruker = tildelteOppgaver.paaBruker[0];

    const gaaTilNesteSporsmaal = () => {
        if (!nesteOppgavePaBruker || !hasData(traader)) {
            return;
        }
        const traadTilknyttetOppgave = traader.data.find((traad) => traad.traadId === nesteOppgavePaBruker.traadId);
        if (!traadTilknyttetOppgave) {
            return;
        }
        props.lukk();
        dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
    };

    if (!nesteOppgavePaBruker) {
        return null;
    }

    return (
        <KnappBase type="standard" onClick={gaaTilNesteSporsmaal}>
            Gå til neste spørsmål
        </KnappBase>
    );
}

export default GaaTilNesteOppgaveKnapp;
