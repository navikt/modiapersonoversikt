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
                <Label htmlFor="theme-toggle" size="small">
                    Bytt modus
                </Label>
            </HStack>
            <ToggleGroup id="theme-toggle" onChange={changeTheme} value={theme} size="small">
                <ToggleGroup.Item icon={<SunIcon />} value="light" />
                <ToggleGroup.Item icon={<MoonIcon />} value="dark" />
            </ToggleGroup>
        </HStack>
    );
};

export const ThemeIconToggle = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    const changeTheme = useCallback(() => {
        setTheme((v) => (v === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    return (
        <Button
            size="small"
            variant="tertiary-neutral"
            onClick={changeTheme}
            name="Bytt tema"
            icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
        />
    );
};
