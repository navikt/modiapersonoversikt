import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStyling } from '../OppgaveSkjema';

interface Props {
    resultat: Resultat;
    lukkPanel: VoidFunction;
}

function OppgaveSkjemaResultat({ resultat, lukkPanel }: Props) {
    const alert =
        resultat === Resultat.VELLYKKET ? (
            <AlertStripeSuksess>Oppgave opprettet</AlertStripeSuksess>
        ) : (
            <AlertStripeFeil>Klarte ikke å opprette oppgave</AlertStripeFeil>
        );
    return (
        <AlertStyling>
            {alert}
            <Hovedknapp autoFocus={true} onClick={lukkPanel}>
                Lukk
            </Hovedknapp>
        </AlertStyling>
    );
}

export default OppgaveSkjemaResultat;
