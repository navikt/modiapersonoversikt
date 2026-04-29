import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NyModiaDropdownMeny } from 'src/app/internarbeidsflatedecorator/NyModiaDropdownMeny';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';

export function NyModiaPortal() {
    const [container, setContainer] = useState<Element | null>(null);
    const containerRef = useRef<Element | null>(null);
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);

    useEffect(() => {
        // Som web-component så har dekoratøren et isolert DOM subtree (shadow DOM).
        const host = document.querySelector('internarbeidsflate-decorator');

        const findAndSet = () => {
            const el = host?.shadowRoot?.getElementById('dropdown-container') ?? null;
            if (el && el !== containerRef.current) {
                containerRef.current = el;
                setContainer(el);
            }
        };

        // Lokaliserer #dropdown-container ved initial mount
        findAndSet();

        // Må i tillegg observeres og settes i tilfelle dekoratøren ikke har rendret sin shadow DOM før etter mount
        const observer = new MutationObserver(findAndSet);

        if (host?.shadowRoot) {
            observer.observe(host.shadowRoot, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }, []);

    if (!container || !isOn) return null;
    return createPortal(<NyModiaDropdownMeny />, container);
}
