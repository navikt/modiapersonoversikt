import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { menuItems } from 'src/components/PersonSidebar';
import { usePersonAtomValue } from 'src/lib/state/context';
import { trackingEvents } from 'src/utils/analytics';

export const usePersonSideBarKotkeys = () => {
    const fnr = usePersonAtomValue();
    const menyElementer = menuItems;
    const navigate = useNavigate();

    const finnUrl = (tittel: string) => {
        return menyElementer.find((item) => item.href.includes(tittel))?.href;
    };

    const navigerMedTracking = (tittel: string) => {
        const url = finnUrl(tittel);
        if (!url) return;
        navigate({
            to: url,
            state: {
                umamiEvent: {
                    name: trackingEvents.hotkeyBrukt,
                    data: { tekst: tittel }
                }
            }
        });
    };

    useEffect(() => {
        const handleOversiktHotkeys = (event: KeyboardEvent) => {
            if (!event.altKey || event.repeat) {
                return;
            }
            const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

            switch (key) {
                case 'u':
                    navigerMedTracking('utbetaling');
                    break;
                case 'v':
                    navigerMedTracking('varsler');
                    break;
                case 't':
                    navigerMedTracking('oppfolging');
                    break;
                case 'o':
                    navigerMedTracking('oversikt');
                    break;
                case 'y':
                    navigerMedTracking('ytelser');
                    break;
                case 'm':
                    navigerMedTracking('meldinger');
                    break;
                case 's':
                    navigerMedTracking('saker');
                    break;
                case 'p':
                    navigerMedTracking('oppgaver');
                    break;
            }
        };

        window.addEventListener('keydown', handleOversiktHotkeys);
        return () => window.removeEventListener('keydown', handleOversiktHotkeys);
    }, [fnr]);

    return null;
};
