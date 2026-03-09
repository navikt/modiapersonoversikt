import NAVSPA from '@navikt/navspa';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Personsok from 'src/components/personsok';
import styled from 'styled-components';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import { DropdownInnhold } from './DropdownInnhold';
import type { DecoratorPropsV3 } from './decoratorprops';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import './personsokKnapp.less';
import './decorator.less';
import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function DropdownPortal() {
    const [container, setContainer] = useState<Element | null>(null);
    const containerRef = useRef<Element | null>(null);

    useEffect(() => {
        const findAndSet = () => {
            const el = document.getElementById('decorator-dropdown-container');
            if (el && el !== containerRef.current) {
                containerRef.current = el;
                setContainer(el);
            }
        };

        findAndSet();

        const observer = new MutationObserver(findAndSet);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const closeOnOutsideClick = (e: MouseEvent) => {
            const menu = document.getElementById('meny-knapp-container') as HTMLDetailsElement | null;
            if (menu?.open && !menu.contains(e.target as Node)) {
                menu.open = false;
            }
        };
        document.addEventListener('click', closeOnOutsideClick);
        return () => document.removeEventListener('click', closeOnOutsideClick);
    }, []);

    if (!container) return null;
    return createPortal(<DropdownInnhold />, container);
}

function Decorator() {
    const { configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <InternflateDecoratorV3 {...configV3} />
            <Personsok />
            <OppdateringsloggContainer />
            <DropdownPortal />
            <DecoratorEasterEgg />
        </StyledNav>
    );
}

const StyledNav = styled.nav`
  .dekorator .dekorator__container {
    max-width: initial;
  }
`;

export default Decorator;
