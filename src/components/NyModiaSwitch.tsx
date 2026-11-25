import { Box, Switch, Tooltip } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { nyModiaAtom } from 'src/components/NyModia';
import { trackToggleNyModia } from 'src/utils/analytics';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useDeaktiverGammelModia from './featureToggle/useDeaktiverGammelModia';
import useFeatureToggle from './featureToggle/useFeatureToggle';

export const NyModiaSwitch = forwardRef<HTMLDivElement>((_props, ref) => {
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const deaktivering = useDeaktiverGammelModia();
    const gammelModiaDeaktivert =
        deaktivering.status === 'error' || (deaktivering.status === 'success' && deaktivering.isOn);
    const versjonsvalgTilgjengelig = deaktivering.status === 'success' && !deaktivering.isOn && isOn;

    const [nyModia, setNyModia] = useAtom(nyModiaAtom);
    const [isChecked, setIsChecked] = useState(nyModia);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setIsChecked(nyModia);
        if (!versjonsvalgTilgjengelig) return;
        return () => {
            if (timerRef.current !== null) clearTimeout(timerRef.current);
            timerRef.current = null;
        };
    }, [versjonsvalgTilgjengelig, nyModia]);

    const handleClick = useCallback(() => {
        if (!versjonsvalgTilgjengelig) return;
        const switchingTo = !nyModia;
        setIsChecked(switchingTo);
        if (timerRef.current !== null) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            setNyModia(switchingTo);
            trackToggleNyModia(switchingTo);
        }, 200);
    }, [setNyModia, nyModia, versjonsvalgTilgjengelig]);

    if (deaktivering.status === 'pending' || (!gammelModiaDeaktivert && !isOn)) return null;

    const beskrivelse =
        deaktivering.status === 'error'
            ? 'Versjonsvalg er utilgjengelig. Ny Modia brukes.'
            : 'Gamle Modia er fjernet. Du kan ikke bytte tilbake.';
    const versjonsvalg = (
        <Box
            ref={ref}
            role="menuitem"
            tabIndex={0}
            aria-label="Ny Modia"
            aria-disabled={gammelModiaDeaktivert || undefined}
            onKeyDown={(event) => {
                if (
                    event.target !== event.currentTarget ||
                    gammelModiaDeaktivert ||
                    (event.key !== 'Enter' && event.key !== ' ')
                ) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                handleClick();
            }}
        >
            <Switch
                size="medium"
                tabIndex={-1}
                title={`Bytt til ${nyModia ? 'gammel' : 'ny'} Modia`}
                checked={gammelModiaDeaktivert || isChecked}
                disabled={gammelModiaDeaktivert}
                aria-hidden={gammelModiaDeaktivert ? 'true' : undefined}
                onChange={handleClick}
            >
                Ny Modia
            </Switch>
        </Box>
    );

    return (
        <Box.New paddingInline="space-8">
            {gammelModiaDeaktivert ? (
                <Tooltip content={beskrivelse} describesChild>
                    {versjonsvalg}
                </Tooltip>
            ) : (
                versjonsvalg
            )}
        </Box.New>
    );
});
