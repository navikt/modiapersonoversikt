import * as React from 'react';
import { ReactNode, useRef } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components/macro';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    children: ReactNode;
    tittel: string;
}

const Style = styled.article`
    ${theme.gråttPanel}
    > h3 {
        margin-bottom: 1rem;
    }
`;

function YtelserInfoGruppe(props: Props) {
    const tittelId = useRef(guid());
    return (
        <Style aria-describedby={tittelId.current}>
            <Ingress id={tittelId.current} tag="h3">
                {props.tittel}
            </Ingress>
            {props.children}
        </Style>
    );
}

export default YtelserInfoGruppe;
