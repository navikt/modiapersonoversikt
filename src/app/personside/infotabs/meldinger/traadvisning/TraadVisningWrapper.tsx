import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import type { Traad } from '../../../../../models/meldinger/meldinger';
import usePrinter from '../../../../../utils/print/usePrinter';
import TraadVisning from './TraadVisning';
import Verktoylinje from './verktoylinje/Verktoylinje';

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
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} printer={printer} />
        </StyledArticle>
    );
}

export default TraadVisningWrapper;
