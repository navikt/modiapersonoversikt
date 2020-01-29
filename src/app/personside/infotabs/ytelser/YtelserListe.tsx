import * as React from 'react';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Ytelse } from '../../../../models/ytelse/ytelse-utils';
import YtelserListeElement from './YtelserListeElement';
import { Undertittel } from 'nav-frontend-typografi';

const Styling = styled.section`
    ${theme.hvittPanel};
`;

const StyledOl = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const TittelWrapper = styled.div`
    padding: ${pxToRem(15)};
    border-bottom: ${theme.border.skille};
`;

interface Props {
    ytelser: Ytelse[];
    pending: boolean;
    valgtYtelse: Ytelse;
}

function YtelseListe(props: Props) {
    const ytelser = props.ytelser.map(ytelse => (
        <YtelserListeElement ytelse={ytelse} erValgt={ytelse === props.valgtYtelse} />
    ));
    return (
        <Styling>
            <TittelWrapper>
                <Undertittel>Ytelser</Undertittel>
            </TittelWrapper>
            <nav aria-label="Velg ytelser">
                <StyledOl role="tablist">{ytelser}</StyledOl>
                {props.pending && <CenteredLazySpinner />}
            </nav>
        </Styling>
    );
}

export default YtelseListe;
