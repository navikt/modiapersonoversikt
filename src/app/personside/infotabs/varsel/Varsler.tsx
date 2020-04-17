import * as React from 'react';
import styled from 'styled-components/macro';
import { Element } from 'nav-frontend-typografi';
import { UnifiedVarsel } from '../../../../models/varsel';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import Varsel from './Varsel';

interface Props {
    varsler: Array<UnifiedVarsel>;
}

const HeaderStyle = styled.div`
    ${theme.hvittPanel};
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 6rem 55% 1fr;
    grid-template-columns: 6rem minmax(35%, 55%) 1fr;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > * {
        padding: 0.7rem;
    }
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
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Varsler" />}
            <HeaderStyle>
                <Element>Dato</Element>
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
