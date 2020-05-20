import { useEffect } from 'react';

export default function useTimeout(callback: () => void, delay: number) {
    useEffect(() => {
        let id = setTimeout(callback, delay);
        return () => clearTimeout(id);
    }, [callback, delay]);
}
