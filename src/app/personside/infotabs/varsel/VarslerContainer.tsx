import { VStack } from '@navikt/ds-react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Varsler from './Varsler';
import VarslerLoader, { type VarslerRendererProps } from './varsel-loader';

const Style = styled.div`
    padding: ${theme.margin.layout};
`;

function VarselLamellRenderer(props: VarslerRendererProps) {
    return (
        <Style>
            <VStack gap="1">
                <AlertStripeAdvarsel>
                    Vi har problemer med å vise dato for revarsling og vi jobber med å løse dette så fort som mulig.
                    Beklager ulempen dette medfører.
                </AlertStripeAdvarsel>
                {props.feilmelding}
            </VStack>
            <Varsler varsler={props.varsler} />
        </Style>
    );
}

function VarslerContainer() {
    return <VarslerLoader component={VarselLamellRenderer} />;
}

export default VarslerContainer;
