import { useOnMount } from '../customHooks';
import { RefObject } from 'react';

export function useFocusOnFirstInputOnMount(ref: RefObject<HTMLElement>) {
    useOnMount(() => {
        const input = ref.current?.getElementsByTagName('input')[0];
        if (input) {
            input.focus();
        }
    });
}
