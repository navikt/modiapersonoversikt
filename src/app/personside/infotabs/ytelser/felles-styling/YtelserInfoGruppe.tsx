import { guid } from 'nav-frontend-js-utils';
import { Ingress } from 'nav-frontend-typografi';
import { type ReactNode, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    children: ReactNode;
    tittel: string;
}

const Style = styled.article`
    ${theme.graattPanel}
    > h3 {
        margin-bottom: 1rem;
    }
`;

function YtelserInfoGruppe(props: Props) {
    const tittelId = useRef(guid());
    return (
        <Style aria-labelledby={tittelId.current}>
            <Ingress id={tittelId.current} tag="h3">
                {props.tittel}
            </Ingress>
            {props.children}
        </Style>
    );
}

export default YtelserInfoGruppe;
