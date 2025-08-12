import type { DependencyList } from 'react';
import useHotkey from 'src/utils/hooks/use-hotkey';
import { cyclicClamp } from 'src/utils/math';

export function usePiltasterIListe<T>(
    listeRef: React.RefObject<HTMLDivElement | null>,
    dependencies: DependencyList,
    listeElementer: T[],
    velgElement: (element: T) => void,
    valgtElement?: T
) {
    const velg = (offset: number) => () => {
        const index = listeElementer.findIndex((element) => element === valgtElement);
        if (index !== -1) {
            const nextIndex = cyclicClamp(index + offset, listeElementer.length);
            const nesteElement = listeElementer[nextIndex];
            velgElement(nesteElement);
        }
    };

    useHotkey('arrowup', velg(-1), dependencies, 'Neste listelement', listeRef?.current ?? undefined);
    useHotkey('arrowdown', velg(1), dependencies, 'Neste listeelement', listeRef?.current ?? undefined);
}

export function useFokusVedPiltaster(
    listeRefH: React.RefObject<HTMLDivElement | null>,
    listeRefV: React.RefObject<HTMLDivElement | null>,
    dependencies: DependencyList,
    onPilV: () => void,
    onPilH: () => void
) {
    useHotkey('arrowright', onPilH, dependencies, 'Gå til liste høyre', listeRefV?.current ?? undefined);
    useHotkey('arrowleft', onPilV, dependencies, 'Gå til liste venstre', listeRefH?.current ?? undefined);

    useHotkey('arrowdown', onPilV, dependencies, 'Fokuser på første sak i listen', listeRefV.current ?? undefined);
    useHotkey('arrowdown', onPilH, dependencies, 'Fokuser på første sak i listen', listeRefH.current ?? undefined);
}
