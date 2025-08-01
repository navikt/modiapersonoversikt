import { MoonIcon, SunIcon } from '@navikt/aksel-icons';
import { Button, HStack, Label, ToggleGroup } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { themeAtom } from 'src/lib/state/theme';

export const ThemeToggle = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    const changeTheme = useCallback(
        (v: string) => {
            if (v === 'light' || v === 'dark') {
                setTheme(v);
            }
        },
        [setTheme]
    );

    return (
        <HStack justify="space-between">
            <HStack align="center" gap="2">
                <Label id="bytt-modus" htmlFor="theme-toggle" size="small">
                    Bytt modus
                </Label>
            </HStack>
            <ToggleGroup
                aria-labelledby="bytt-modus"
                id="theme-toggle"
                onChange={changeTheme}
                value={theme}
                size="small"
            >
                <ToggleGroup.Item title="Lyst tema" icon={<SunIcon aria-hidden />} value="light" />
                <ToggleGroup.Item title="Mørkt tema" icon={<MoonIcon aria-hidden />} value="dark" />
            </ToggleGroup>
        </HStack>
    );
};

export const ThemeIconToggle = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const endreTilTemaTekst = theme === 'light' ? 'mørkt' : 'lyst';

    const changeTheme = useCallback(() => {
        setTheme((v) => (v === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    return (
        <Button
            size="small"
            variant="tertiary-neutral"
            onClick={changeTheme}
            title={`Bytt til ${endreTilTemaTekst} tema`}
            icon={theme === 'light' ? <MoonIcon aria-hidden /> : <SunIcon aria-hidden />}
        />
    );
};
