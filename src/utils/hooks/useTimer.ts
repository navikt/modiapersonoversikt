import { useRef } from 'react';
import { Timer } from '../timer';
import { useOnMount } from '../customHooks';

export function useTimer() {
    const timer = useRef(new Timer());

    useOnMount(() => {
        timer.current.startTimer();
    });

    return () => timer.current.getTime();
}
