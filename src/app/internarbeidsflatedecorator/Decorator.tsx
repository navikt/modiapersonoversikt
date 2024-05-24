import * as React from 'react';
import NAVSPA from '@navikt/navspa';
import styled from 'styled-components/macro';
import { DecoratorProps, DecoratorPropsV3 } from './decoratorprops';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import './personsokKnapp.less';
import './decorator.less';
import { useDecoratorConfig } from './useDecoratorConfig';
import { getWindowFeature } from '../../utils/featureToggles';

const InternflateDecoratorV2 = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');
const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function Decorator() {
    const { configV2, configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <DecoratorToggle configV2={configV2} configV3={configV3} />
            <PersonsokContainer />
            <OppdateringsloggContainer />
            <DecoratorEasterEgg />
        </StyledNav>
    );
}

const DecoratorToggle = ({ configV2, configV3 }: { configV2: DecoratorProps; configV3: DecoratorPropsV3 }) => {
    if (getWindowFeature('useNewDecorator')) {
        return <InternflateDecoratorV3 {...configV3} />;
    }
    return <InternflateDecoratorV2 {...configV2} />;
};

const StyledNav = styled.nav`
    .dekorator .dekorator__container {
        max-width: initial;
    }
`;

export default Decorator;
