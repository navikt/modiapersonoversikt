import NAVSPA from '@navikt/navspa';
import Personsok from 'src/components/personsok';
import styled from 'styled-components';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import type { DecoratorPropsV3 } from './decoratorprops';
import './personsokKnapp.less';
import './decorator.less';
import IfFeatureToggleOff from 'src/components/featureToggle/IfFeatureToggleOff';
import IfFeatureToggleOn from 'src/components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import PersonsokContainer from '../personsok/Personsok';
import { useDecoratorConfig } from './useDecoratorConfig';

const InternflateDecoratorV3 = NAVSPA.importer<DecoratorPropsV3>('internarbeidsflate-decorator-v3');

function Decorator() {
    const { configV3 } = useDecoratorConfig();

    return (
        <StyledNav>
            <InternflateDecoratorV3 {...configV3} />
            <IfFeatureToggleOn loader={<div />} toggleID={FeatureToggles.NyAvansertSok}>
                <Personsok />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff loader={<div />} toggleID={FeatureToggles.NyAvansertSok}>
                <PersonsokContainer />
            </IfFeatureToggleOff>
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
