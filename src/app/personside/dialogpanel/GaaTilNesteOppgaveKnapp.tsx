import KnappBase from 'nav-frontend-knapper';
import { useDispatch } from 'react-redux';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import dialogResource from '../../../rest/resources/dialogResource';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';

function GaaTilNesteOppgaveKnapp(props: { lukk: () => void }) {
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const traader = dialogResource.useFetch();
    const nesteOppgavePaBruker = tildelteOppgaver.paaBruker[0];

    const gaaTilNesteSporsmaal = () => {
        if (!nesteOppgavePaBruker || !traader.data) {
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
