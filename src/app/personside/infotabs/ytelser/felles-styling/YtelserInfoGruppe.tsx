import { ReactNode, useRef } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { guid } from 'nav-frontend-js-utils';

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
