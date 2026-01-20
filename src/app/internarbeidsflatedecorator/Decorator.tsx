import NAVSPA from '@navikt/navspa';
import Personsok from 'src/components/personsok';
import styled from 'styled-components';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import type { DecoratorPropsV3 } from './decoratorprops';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import './personsokKnapp.less';
import './decorator.less';
import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function Decorator() {
    const { configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <InternflateDecoratorV3 {...configV3} />
            <Personsok />
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
