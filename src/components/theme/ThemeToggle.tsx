import { ThemeIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { themeAtom } from 'src/lib/state/theme';

export const ThemeIconToggle = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const endreTilTemaTekst = theme === 'light' ? 'mørkt' : 'lyst';
    const tooltipTekst = `Endre til ${endreTilTemaTekst} tema`;

    const changeTheme = useCallback(() => {
        setTheme((v) => (v === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    return (
        <Tooltip content={tooltipTekst} placement="right">
            <Button
                size="small"
                variant="tertiary-neutral"
                onClick={changeTheme}
                title={`Bytt til ${endreTilTemaTekst} tema`}
                icon={<ThemeIcon aria-hidden />}
            />
        </Tooltip>
    );
};
