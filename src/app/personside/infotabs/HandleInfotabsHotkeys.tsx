import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';
import { loggEvent } from '../../../utils/frontendLogger';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { paths } from '../../routes/routing';
import { INFOTABS } from './InfoTabEnum';

type Props = RouteComponentProps<{}>;

function HandleInfotabsHotkeys(props: Props) {
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const path = `${paths.personUri}/${fødselsnummer}`;

    useEffect(() => {
        const handleOversiktHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;
            if (key === 'u') {
                loggEvent('Hurtigtast', 'Oversikt Utbetalinger', { type: 'Alt + U' });
                props.history.push(`${path}/${INFOTABS.UTBETALING.toLowerCase()}`);
            } else if (key === 'v') {
                loggEvent('Hurtigtast', 'Oversikt Varsler', { type: 'Alt + V' });
                props.history.push(`${path}/${INFOTABS.VARSEL.toLowerCase()}`);
            } else if (key === 'o') {
                loggEvent('Hurtigtast', 'Oversikt Oppfølging', { type: 'Alt + O' });
                props.history.push(`${path}/${INFOTABS.OPPFOLGING.toLowerCase()}`);
            } else if (key === 'y') {
                loggEvent('Hurtigtast', 'Oversikt Ytelser', { type: 'Alt + Y' });
                props.history.push(`${path}/${INFOTABS.YTELSER.toLowerCase()}`);
            } else if (key === 'm') {
                loggEvent('Hurtigtast', 'Oversikt Meldinger', { type: 'Alt + M' });
                props.history.push(`${path}/${INFOTABS.MELDINGER.toLowerCase()}`);
            } else if (key === 's') {
                loggEvent('Hurtigtast', 'Oversikt Saker', { type: 'Alt + S' });
                props.history.push(`${path}/${INFOTABS.SAKER.toLowerCase()}`);
            }
        };

        window.addEventListener('keydown', handleOversiktHotkeys);
        return () => window.removeEventListener('keydown', handleOversiktHotkeys);
    }, [fødselsnummer, props.history]);

    return null;
}

export default withRouter(HandleInfotabsHotkeys);
