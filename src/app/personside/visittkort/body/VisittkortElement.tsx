import * as React from 'react';
import styled from 'styled-components';
import TittelOgIkon from './IkonOgTittel';
import { ReactNode } from 'react';
import { Element } from 'nav-frontend-typografi';

interface ElementProps {
    children: ReactNode;
    beskrivelse?: string;
    ikon?: JSX.Element;
}

const VisittkortElementStyle = styled.div`
    margin: 10px 0 20px 0;
    &:last-child {
        margin: 10px 0 0 0;
    }
`;

function VisittkortElement(props: ElementProps) {
    const tittel = props.beskrivelse ? <Element tag="h4">{props.beskrivelse}</Element> : null;
    return (
        <VisittkortElementStyle>
            <TittelOgIkon tittel={tittel} ikon={props.ikon} />
            {props.children}
        </VisittkortElementStyle>
    );
}

export default VisittkortElement;
