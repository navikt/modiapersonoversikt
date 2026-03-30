import type { DependencyList } from 'react';
import useHotkey from 'src/utils/hooks/use-hotkey';
import { modulo } from 'src/utils/math';

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
            const nextIndex = modulo(index + offset, listeElementer.length);
            const nesteElement = listeElementer[nextIndex];
            velgElement(nesteElement);
        }
    };

    useHotkey('arrowup', velg(-1), dependencies, 'Neste listelement', listeRef?.current ?? undefined);
    useHotkey('arrowdown', velg(1), dependencies, 'Neste listeelement', listeRef?.current ?? undefined);
}

/**
 * handy function that lets us declare all the hotkeys in one go. the second
 * arrowdown declaration below is always suppressed by usePiltasterIListe i
 * think
 */
export function useFokusVedPiltaster(
    temaListeRef: React.RefObject<HTMLDivElement | null>,
    saksListeRef: React.RefObject<HTMLDivElement | null>,
    dependencies: DependencyList,
    foksuserPaaValgtTema: () => void,
    fokuserPaaForsteSak: () => void
) {
    useHotkey(
        'arrowright',
        fokuserPaaForsteSak,
        dependencies,
        'Gå til liste høyre',
        temaListeRef?.current ?? undefined
    );
    useHotkey(
        'arrowleft',
        foksuserPaaValgtTema,
        dependencies,
        'Gå til liste venstre',
        saksListeRef?.current ?? undefined
    );

    useHotkey(
        'arrowdown',
        foksuserPaaValgtTema,
        dependencies,
        'Fokuser på første sak i listen',
        temaListeRef.current ?? undefined
    );
    useHotkey(
        'arrowdown',
        fokuserPaaForsteSak,
        dependencies,
        'Fokuser på første sak i listen',
        saksListeRef.current ?? undefined
    );
}
