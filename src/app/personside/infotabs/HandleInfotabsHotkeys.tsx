import { RouteComponentProps, withRouter } from 'react-router';
import { useContext, useEffect } from 'react';
import { loggEvent } from '../../../utils/frontendLogger';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { usePaths } from '../../routes/routing';
import { InfotabsFokusContext } from './InfoTabs';

type Props = RouteComponentProps<{}>;

function HandleInfotabsHotkeys(props: Props) {
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const paths = usePaths();
    const fokusContext = useContext(InfotabsFokusContext);

    useEffect(() => {
        const handleOversiktHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;
            if (key === 'u') {
                loggEvent('Hurtigtast', 'Oversikt Utbetalinger', { type: 'Alt + U' });
                props.history.push(paths.utbetlainger);
            } else if (key === 'v') {
                loggEvent('Hurtigtast', 'Oversikt Varsler', { type: 'Alt + V' });
                props.history.push(paths.varsler);
            } else if (key === 't') {
                loggEvent('Hurtigtast', 'Oversikt Oppfølging', { type: 'Alt + T' });
                props.history.push(paths.oppfolging);
            } else if (key === 'o') {
                loggEvent('Hurtigtast', 'Oversikt', { type: 'Alt + O' });
                props.history.push(paths.oversikt);
            } else if (key === 'y') {
                loggEvent('Hurtigtast', 'Oversikt Ytelser', { type: 'Alt + Y' });
                props.history.push(paths.ytelser);
            } else if (key === 'm') {
                loggEvent('Hurtigtast', 'Oversikt Meldinger', { type: 'Alt + M' });
                props.history.push(paths.meldinger);
            } else if (key === 's') {
                loggEvent('Hurtigtast', 'Oversikt Saker', { type: 'Alt + S' });
                props.history.push(paths.saker);
            }
            fokusContext();
        };

        window.addEventListener('keydown', handleOversiktHotkeys);
        return () => window.removeEventListener('keydown', handleOversiktHotkeys);
    }, [fødselsnummer, props.history, paths, fokusContext]);

    return null;
}

export default withRouter(HandleInfotabsHotkeys);
