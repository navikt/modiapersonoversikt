import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import { loggEvent } from '../../../utils/frontendLogger';
import { AppState } from '../../../redux/reducers';
import useUrlNyPersonforvalter from '../../brukerprofil/useUrlNyPersonforvalter';
import useFeatureToggle from '../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';

type Props = RouteComponentProps<{}>;

function HandleVisittkortHotkeys(props: Props) {
    const dispatch = useDispatch();
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const nyPersonforvalter = useFeatureToggle(FeatureToggles.NyPersonforvalter);
    const lenkeNyBrukerprofil = useUrlNyPersonforvalter();

    useEffect(() => {
        const handleVisittkortHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;
            if (key === 'b') {
                loggEvent('Hurtigtast', 'Visittkort', { type: 'Alt + B' });
                window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer');
            } else if (key === 'n') {
                loggEvent('Hurtigtast', 'Visittkort', { type: 'Alt + N' });
                dispatch(toggleVisittkort());
            }
        };

        window.addEventListener('keydown', handleVisittkortHotkeys);
        return () => window.removeEventListener('keydown', handleVisittkortHotkeys);
    }, [dispatch, fødselsnummer, props.history, lenkeNyBrukerprofil, nyPersonforvalter]);

    return null;
}

export default withRouter(HandleVisittkortHotkeys);
