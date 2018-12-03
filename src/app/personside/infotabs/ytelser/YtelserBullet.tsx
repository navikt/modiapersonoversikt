import * as React from 'react';
import { ReactNode } from 'react';
import theme from '../../../../styles/personOversiktTheme';
import { BulletPoint } from '../../../../components/common-styled-components';
import { Ingress } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
    tittel: string;
}

const Wrapper = styled.div`
    padding: ${theme.margin.px30} 0;
`;

function YtelserBullet(props: Props) {
    return (
        <Wrapper>
            <BulletPoint showBulletPoint={true} color={theme.color.ytelser}>
                <Ingress>{props.tittel}</Ingress>
            </BulletPoint>
            {props.children}
        </Wrapper>
    );
}

export default YtelserBullet;
