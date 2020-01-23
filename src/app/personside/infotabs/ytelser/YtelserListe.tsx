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

const YtelserListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const TittelWrapper = styled.div`
    padding: ${pxToRem(15)};
`;

interface Props {
    ytelser: Ytelse[];
    pending: boolean;
}

function YtelseListe(props: Props) {
    const ytelser = props.ytelser.map(ytelse => <YtelserListeElement ytelse={ytelse} />);
    return (
        <Styling>
            <TittelWrapper>
                <Undertittel>Ytelser</Undertittel>
            </TittelWrapper>
            <YtelserListeStyle role="tablist">{ytelser}</YtelserListeStyle>
            {props.pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default YtelseListe;
