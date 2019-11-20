import { useRef } from 'react';
import moment from 'moment';

export function useTimer() {
    const startTime = useRef(moment());

    const getDuration = () => {
        const stopTime = moment();
        return moment.duration(stopTime.diff(startTime.current)).asMilliseconds();
    };

    return getDuration;
}
