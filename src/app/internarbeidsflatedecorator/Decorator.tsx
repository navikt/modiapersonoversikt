import NAVSPA from '@navikt/navspa';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Personsok from 'src/components/personsok';
import styled from 'styled-components';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import { DropdownMeny } from './DropdownMeny';
import type { DecoratorPropsV3 } from './decoratorprops';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import './personsokKnapp.less';
import './decorator.less';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { OppstartNyModiaDialog } from 'src/components/NyModia/OppstartNyModiaDialog';
import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function DropdownMenyPortal() {
    const [container, setContainer] = useState<Element | null>(null);
    const containerRef = useRef<Element | null>(null);
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);

    useEffect(() => {
        const findAndSet = () => {
            const el = document.getElementById('dropdown-container');
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

    if (!container || !isOn) return null;
    return createPortal(<DropdownMeny />, container);
}

function Decorator() {
    const { configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <InternflateDecoratorV3 {...configV3} />
            <Personsok />
            <OppdateringsloggContainer />
            <DropdownMenyPortal />
            <OppstartNyModiaDialog />
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
