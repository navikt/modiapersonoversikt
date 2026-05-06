import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';

const MIN_HEIGHT = 600;
const MAX_HEIGHT = 1000;
const MIN_ROWS = 8;
const MAX_ROWS = 25;

function calcMinRows(screenHeight: number): number {
    const clamped = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, screenHeight));
    const ratio = (clamped - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
    return Math.round(MIN_ROWS + ratio * (MAX_ROWS - MIN_ROWS));
}

export default function useDynamicHeightTextArea(): number {
    const [minRows, setMinRows] = useState(() => calcMinRows(window.innerHeight));
    const svarUnderArbeid = useAtomValue(svarUnderArbeidAtom);

    useEffect(() => {
        const handler = () => setMinRows(calcMinRows(window.innerHeight));
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return svarUnderArbeid ? minRows : minRows - 4;
}
