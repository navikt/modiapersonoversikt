import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import Varsel from '../varsel/Varsel';
import VarslerLoader, { type VarslerRendererProps } from '../varsel/varsel-loader';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function VarselOversikt(props: Props) {
    return <VarslerLoader component={VarselVisning} {...props} />;
}

function VarselVisning(props: VarslerRendererProps & Props) {
    const forsteVarsler = props.varsler.slice(0, 2);
    useOnMount(() => {
        props.setHeaderContent(
            <Normaltekst>
                {forsteVarsler.length} / {props.varsler.length}
            </Normaltekst>
        );
    });

    if (props.varsler.length === 0) {
        return <AlertStripeInfo>Ingen varsler på bruker</AlertStripeInfo>;
    }

    return (
        <ListStyle>
            {forsteVarsler.map((varsel, index) => (
                <Varsel key={index} varsel={varsel} />
            ))}
        </ListStyle>
    );
}

export default VarselOversikt;
