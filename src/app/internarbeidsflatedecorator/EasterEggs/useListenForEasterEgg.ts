import { useOnMount } from '../../../utils/customHooks';
import { useState } from 'react';

export enum easterEggs {
    party = 'party',
    nisse = 'nisse',
    klukk = 'klukk'
}

export function useListenForEasterEgg(defaultEasterEgg: easterEggs | undefined) {
    const [easterEgg, setEasterEgg] = useState(defaultEasterEgg);

    useOnMount(() => {
        const input = document.getElementsByTagName('input')[0];
        if (!input) {
            return;
        }
        const listener = (e: Event) => {
            // @ts-expect-error
            const input = e.target.value as string;
            if (!input) {
                return;
            }
            if (Object.keys(easterEggs).includes(input.toLowerCase())) {
                setEasterEgg(input.toLowerCase() as easterEggs);
            }
        };
        input.addEventListener('input', listener);
        return () => input.removeEventListener('input', listener);
    });

    return easterEgg;
}
