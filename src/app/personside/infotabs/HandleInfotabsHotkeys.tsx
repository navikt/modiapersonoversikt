import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { usePaths } from '../../routes/routing';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = RouteComponentProps<{}>;

function HandleInfotabsHotkeys(props: Props) {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const paths = usePaths();

    useEffect(() => {
        const handleOversiktHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;
            if (key === 'u') {
                loggEvent('Utbetalinger', 'Hurtigtast', { type: 'Alt + U' });
                props.history.push(paths.utbetlainger);
            } else if (key === 'v') {
                loggEvent('Varsler', 'Hurtigtast', { type: 'Alt + V' });
                props.history.push(paths.varsler);
            } else if (key === 't') {
                loggEvent('Oppfølging', 'Hurtigtast', { type: 'Alt + T' });
                props.history.push(paths.oppfolging);
            } else if (key === 'o') {
                loggEvent('Oversikt', 'Hurtigtast', { type: 'Alt + O' });
                props.history.push(paths.oversikt);
            } else if (key === 'y') {
                loggEvent('Ytelser', 'Hurtigtast', { type: 'Alt + Y' });
                props.history.push(paths.ytelser);
            } else if (key === 'm') {
                loggEvent('Meldinger', 'Hurtigtast', { type: 'Alt + M' });
                props.history.push(paths.meldinger);
            } else if (key === 's') {
                loggEvent('Saker', 'Hurtigtast', { type: 'Alt + S' });
                props.history.push(paths.saker);
            }
        };

        window.addEventListener('keydown', handleOversiktHotkeys);
        return () => window.removeEventListener('keydown', handleOversiktHotkeys);
    }, [fnr, props.history, paths]);

    return null;
}

export default withRouter(HandleInfotabsHotkeys);
