import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { type PropsWithChildren, useEffect } from 'react';

export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return children;
};
