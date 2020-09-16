import { useEffect, useState } from 'react';

function useWaitForElement(selector: string): HTMLElement | null {
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const id = setInterval(() => {
            const el = document.querySelector<HTMLElement>(selector);
            setElement(el);
            if (el) {
                clearInterval(id);
            }
        }, 50);

        return () => clearInterval(id);
    }, [selector, setElement]);
    return element;
}

export default useWaitForElement;
