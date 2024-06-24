import * as React from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { UnifiedVarsel } from '../../../../models/varsel';
import Panel from 'nav-frontend-paneler';
import Varsel from './Varsel';

interface Props {
    varsler: Array<UnifiedVarsel>;
}

const HeaderStyle = styled(Panel)`
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 6rem 4rem 55% 1fr;
    grid-template-columns: 6rem 4rem minmax(35%, 55%) 1fr;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > *:nth-child(4) {
        -ms-grid-column: 4;
    }
    > * {
        padding: 0.7rem;
    }
    padding: 0;
    margin-bottom: 1rem;
`;

const ListStyle = styled.ol`
    > * {
        margin-top: 0.5rem;
    }
`;

function Varsler(props: Props) {
    return (
        <>
            <HeaderStyle>
                <Element>Dato</Element>
                <Element>Status</Element>
                <Element>Type</Element>
                <Element>Kanal</Element>
            </HeaderStyle>
            <ListStyle aria-label="Brukerens varsler">
                {props.varsler.map((varsel, index) => (
                    <Varsel key={index} varsel={varsel} />
                ))}
            </ListStyle>
        </>
    );
}

export default Varsler;
