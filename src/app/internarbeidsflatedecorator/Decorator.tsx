import * as React from 'react';
import NAVSPA from '@navikt/navspa';
import styled from 'styled-components/macro';
import { DecoratorPropsV3 } from './decoratorprops';
import PersonsokContainer from '../personsok/Personsok';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import './personsokKnapp.less';
import './decorator.less';
import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function Decorator() {
    const { configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <InternflateDecoratorV3 {...configV3} />
            <PersonsokContainer />
            <OppdateringsloggContainer />
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
