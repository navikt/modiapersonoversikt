import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { Link } from 'react-router-dom';

interface Props {
    children: ReactNode;
    tittel: string;
}

const OverskriftStyle = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: ${theme.margin.px10};
`;

function Oversiktskomponent(props: Props) {
    return (
        <div>
            <OverskriftStyle>
                <Undertittel tag="h3">{props.tittel}</Undertittel>
                <Link className="lenke" to={''}>
                    <Normaltekst>Vis alle</Normaltekst>
                </Link>
            </OverskriftStyle>
            {props.children}
        </div>
    );
}

export default Oversiktskomponent;
