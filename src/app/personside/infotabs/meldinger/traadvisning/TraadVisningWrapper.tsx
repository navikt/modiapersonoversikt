import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Verktoylinje from './verktoylinje/Verktoylinje';
import TraadVisning from './TraadVisning';
import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import usePrinter from '../../../../../utils/print/usePrinter';
import NyTraadVisning from './NyTraadVisning';
import IfFeatureToggleOn from '../../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import IfFeatureToggleOff from '../../../../../components/featureToggle/IfFeatureToggleOff';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
}

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
`;

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    const printer = usePrinter();
    if (!props.valgtTraad) {
        return <AlertStripeInfo>Ingen melding valgt</AlertStripeInfo>;
    }
    return (
        <StyledArticle key={props.valgtTraad.traadId} role="tabpanel">
            <Verktoylinje valgtTraad={props.valgtTraad} visPrinter={true} />
            <IfFeatureToggleOn toggleID={FeatureToggles.useNewDialogComponents}>
                <NyTraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} printer={printer} />
            </IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={FeatureToggles.useNewDialogComponents}>
                <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} printer={printer} />
            </IfFeatureToggleOff>
        </StyledArticle>
    );
}

export default TraadVisningWrapper;
