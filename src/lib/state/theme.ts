import { atom, useAtom, useAtomValue } from 'jotai';
import { type PropsWithChildren, useEffect } from 'react';

const localTheme = localStorage.getItem('theme');

export const themeAtom = atom<'light' | 'dark'>(localTheme === 'light' || localTheme === 'dark' ? localTheme : 'light');

export const useTheme = () => useAtomValue(themeAtom);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme] = useAtom(themeAtom);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return children;
};
