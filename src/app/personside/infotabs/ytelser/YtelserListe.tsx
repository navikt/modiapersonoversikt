import * as React from 'react';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { Ytelse } from '../../../../models/ytelse/ytelse-utils';
import YtelserListeElement from './YtelserListeElement';

const Styling = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.layout};
`;

const YtelserListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    ytelser: Ytelse[];
    pending: boolean;
}

function YtelseListe(props: Props) {
    const ytelser = props.ytelser.map(ytelse => <YtelserListeElement ytelse={ytelse} />);
    return (
        <Styling>
            <YtelserListeStyle role="tablist">{ytelser}</YtelserListeStyle>
            {props.pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default YtelseListe;
