import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import { useDispatch } from 'react-redux';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import { useRestResource } from '../../../rest/consumer/useRestResource';

function GaaTilNesteOppgaveKnapp(props: { lukk: () => void }) {
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const nesteOppgavePåBruker = tildelteOppgaver.paaBruker[0];

    const gaaTilNesteSporsmaal = () => {
        if (!nesteOppgavePåBruker || !traaderResource.data) {
            return;
        }
        const traadTilknyttetOppgave = traaderResource.data.find(
            traad => traad.traadId === nesteOppgavePåBruker.traadId
        );
        if (!traadTilknyttetOppgave) {
            return;
        }
        props.lukk();
        dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
    };

    if (!nesteOppgavePåBruker) {
        return null;
    }

    return (
        <KnappBase type="standard" onClick={gaaTilNesteSporsmaal}>
            Gå til neste spørsmål
        </KnappBase>
    );
}

export default GaaTilNesteOppgaveKnapp;
