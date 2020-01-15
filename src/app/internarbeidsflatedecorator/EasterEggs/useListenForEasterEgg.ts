import { useOnMount } from '../../../utils/customHooks';
import { useState } from 'react';

export enum easterEggs {
    party = 'party',
    nisse = 'nisse'
}

export function useListenForEasterEgg(defaultEasterEgg: string) {
    const [easterEgg, setEasterEgg] = useState(defaultEasterEgg);

    useOnMount(() => {
        const input = document.getElementsByTagName('input')[0];
        if (!input) {
            return;
        }
        const listener = (e: Event) => {
            // @ts-ignore
            const input = e.target.value;
            if (!input) {
                return;
            }
            if (Object.keys(easterEggs).includes(input.toLowerCase())) {
                setEasterEgg(input.toLowerCase());
            }
        };
        input.addEventListener('input', listener);
        return () => input.removeEventListener('input', listener);
    });

    return easterEgg;
}
