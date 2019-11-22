import React, { useEffect } from 'react';
import { isTest } from '../environment';

let scrollStore: ScrollValue = {};

type ScrollPosition = { x: number; y: number };

interface ScrollValue {
    [name: string]: ScrollPosition;
}

const getStoredScroll = (name: string): ScrollPosition => {
    const entries = Object.entries(scrollStore);
    const entry = entries.find(it => it[0] === name);
    return entry ? entry[1] : { x: 0, y: 0 };
};

const storeScroll = (name: string, position: ScrollPosition) => {
    scrollStore = {
        ...scrollStore,
        [name]: position
    };
};

function useKeepScroll(ref: React.RefObject<HTMLElement>, keepScrollId: string) {
    useEffect(() => {
        const scroll = getStoredScroll(keepScrollId);
        !isTest() && ref.current && ref.current.scrollTo(scroll.x, scroll.y);
    }, [keepScrollId, ref]);

    return () => {
        const scrollLeft = (ref.current && ref.current.scrollLeft) || 0;
        const scrollTop = (ref.current && ref.current.scrollTop) || 0;
        storeScroll(keepScrollId, { x: scrollLeft, y: scrollTop });
    };
}

export default useKeepScroll;
