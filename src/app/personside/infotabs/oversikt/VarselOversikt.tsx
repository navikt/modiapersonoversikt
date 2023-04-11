import * as React from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import Varsel from '../varsel/Varsel';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ReactNode } from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { Normaltekst } from 'nav-frontend-typografi';
import VarslerLoader, { VarslerRendererProps } from '../varsel/varsel-loader';
import VarselNy from '../varsel/VarselNy';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function VarselOversikt(props: Props) {
    return (
        <>
            <IfFeatureToggleOn toggleID={FeatureToggles.visRevarslingDetaljer}>
                <VarslerLoader component={VarselVisningNy} {...props} />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.visRevarslingDetaljer}>
                <VarslerLoader component={VarselVisning} {...props} />
            </IfFeatureToggleOff>
        </>
    );
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

function VarselVisningNy(props: VarslerRendererProps & Props) {
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
                <VarselNy key={index} varsel={varsel} />
            ))}
        </ListStyle>
    );
}

export default VarselOversikt;
