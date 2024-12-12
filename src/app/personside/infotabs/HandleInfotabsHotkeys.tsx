import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/reducers';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { personPaths } from '../../routes/routing';

function HandleInfotabsHotkeys() {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const paths = personPaths;
    const navigate = useNavigate();

    useEffect(() => {
        const handleOversiktHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;
            if (key === 'u') {
                loggEvent('Utbetalinger', 'Hurtigtast', { type: 'Alt + U' });
                navigate({ to: paths.utbetlainger });
            } else if (key === 'v') {
                loggEvent('Varsler', 'Hurtigtast', { type: 'Alt + V' });
                navigate({ to: paths.varsler });
            } else if (key === 't') {
                loggEvent('Oppfølging', 'Hurtigtast', { type: 'Alt + T' });
                navigate({ to: paths.oppfolging });
            } else if (key === 'o') {
                loggEvent('Oversikt', 'Hurtigtast', { type: 'Alt + O' });
                navigate({ to: paths.oversikt });
            } else if (key === 'y') {
                loggEvent('Ytelser', 'Hurtigtast', { type: 'Alt + Y' });
                navigate({ to: paths.ytelser });
            } else if (key === 'm') {
                loggEvent('Meldinger', 'Hurtigtast', { type: 'Alt + M' });
                navigate({ to: paths.meldinger });
            } else if (key === 's') {
                loggEvent('Saker', 'Hurtigtast', { type: 'Alt + S' });
                navigate({ to: paths.saker });
            }
        };

        window.addEventListener('keydown', handleOversiktHotkeys);
        return () => window.removeEventListener('keydown', handleOversiktHotkeys);
    }, [fnr, navigate, paths]);

    return null;
}

export default HandleInfotabsHotkeys;
