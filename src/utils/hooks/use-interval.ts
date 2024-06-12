import { useEffect } from 'react';

export default function useInterval(callback: () => void, delay: number | null) {
    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(callback, delay);
            return () => clearInterval(id);
        } else {
            return () => {};
        }
    }, [callback, delay]);
}
