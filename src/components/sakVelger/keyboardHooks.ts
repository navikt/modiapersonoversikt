import { type DependencyList, useEffect, useState } from 'react';
import { useHotkey } from 'src/utils/hooks/use-hotkey';
import { modulo } from 'src/utils/math';

export function usePiltasterIListe<T>(
    listeRef: React.RefObject<HTMLDivElement | null>,
    dependencies: DependencyList,
    listeElementer: T[],
    velgElement: (element: T) => void,
    valgtElement?: T
) {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    useEffect(() => {
        if (listeRef.current !== element) {
            setElement(listeRef.current);
        }
    });

    const velg = (offset: number) => () => {
        if (!listeElementer.length) return;

        if (!valgtElement) {
            velgElement(offset > 0 ? listeElementer[0] : listeElementer[listeElementer.length - 1]);
            return;
        }

        const index = listeElementer.indexOf(valgtElement);
        if (index !== -1) {
            const nextIndex = modulo(index + offset, listeElementer.length);
            velgElement(listeElementer[nextIndex]);
        }
    };

    useHotkey('arrowup', velg(-1), dependencies, 'Forrige listeelement', element);
    useHotkey('arrowdown', velg(1), dependencies, 'Neste listeelement', element);
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
    useHotkey('arrowright', fokuserPaaForsteSak, dependencies, 'Gå til liste høyre', temaListeRef?.current);
    useHotkey('arrowleft', foksuserPaaValgtTema, dependencies, 'Gå til liste venstre', saksListeRef?.current);

    useHotkey('arrowdown', foksuserPaaValgtTema, dependencies, 'Fokuser på første sak i listen', temaListeRef.current);
    useHotkey('arrowdown', fokuserPaaForsteSak, dependencies, 'Fokuser på første sak i listen', saksListeRef.current);
}
