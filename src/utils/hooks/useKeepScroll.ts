import type * as React from 'react';
import { useEffect, useRef } from 'react';
import { isTest } from '../environment';

let scrollStore: ScrollValue = {};

export function resetKeepScroll() {
    scrollStore = {};
}

type ScrollPosition = { x: number; y: number };

interface ScrollValue {
    [name: string]: ScrollPosition;
}

const getStoredScroll = (name: string): ScrollPosition => {
    const entries = Object.entries(scrollStore);
    const entry = entries.find((it) => it[0] === name);
    return entry ? entry[1] : { x: 0, y: 0 };
};

const storeScroll = (name: string, position: ScrollPosition) => {
    scrollStore = {
        ...scrollStore,
        [name]: position
    };
};

function useKeepScroll(ref: React.RefObject<HTMLElement | null>, keepScrollId: string) {
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    useEffect(
        function restoreScroll() {
            const timeout = setTimeout(() => {
                const scroll = getStoredScroll(keepScrollId);
                if (!isTest() && ref.current) ref.current.scrollTo(scroll.x, scroll.y);
            }, 0); // Uten timeout prøver den å restore scroll før komponenten er ferdig rendret. Da får den ofte ikke til å restore scrollen kanskje fordi komponenten ikke har fått sin fulle høyde enda
            return () => clearTimeout(timeout);
        },
        [keepScrollId, ref]
    );

    return () => {
        clearTimeout(timer.current);
        const timeout = setTimeout(() => {
            const scrollLeft = ref.current?.scrollLeft || 0;
            const scrollTop = ref.current?.scrollTop || 0;
            storeScroll(keepScrollId, { x: scrollLeft, y: scrollTop });
        }, 150);
        timer.current = timeout;
    };
}

export default useKeepScroll;
