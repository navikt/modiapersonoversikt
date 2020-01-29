import { useCallback, useRef } from 'react';
import { Timer } from '../timer';
import { useOnMount } from '../customHooks';

export function useTimer() {
    const timer = useRef(new Timer());

    useOnMount(() => {
        timer.current.startTimer();
    });

    return useCallback(() => timer.current.getTime(), [timer]);
}
