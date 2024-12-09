import { useState } from 'react';
import { useOnMount } from '../../../utils/customHooks';

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
