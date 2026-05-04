import { useEffect, useState } from 'react';

function useWaitForElement(selector: string): HTMLElement | null {
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const id = setInterval(() => {
            setElement((prev) => {
                if (prev?.isConnected) return prev;
                const host = document.querySelector('internarbeidsflate-decorator');
                return (
                    document.querySelector<HTMLElement>(selector) ?? host?.shadowRoot?.querySelector(selector) ?? null
                );
            });
        }, 200);

        return () => clearInterval(id);
    }, [selector]);
    return element;
}

export default useWaitForElement;
