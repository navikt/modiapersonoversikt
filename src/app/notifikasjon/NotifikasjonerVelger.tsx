import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import React from 'react';
import styled from 'styled-components';
import useNotifikasjoner from './useNotifikasjoner';

const StyledDiv = styled.div`
    text-align: center;
`;

export function NotfikiasjonerVelger() {
    const notifikasjoner = useNotifikasjoner();

    if (notifikasjoner.data.length > 1) {
        const antall = notifikasjoner.data.length;
        console.log(antall);

        return (
            <StyledDiv>
                <Nesteknapp>{notifikasjoner.data[2]}</Nesteknapp>
            </StyledDiv>
        );
    }

    if (notifikasjoner.data.length === 1) {
        return <StyledDiv></StyledDiv>;
    }

    return (
        <StyledDiv>
            <Tilbakeknapp />
        </StyledDiv>
    );
}
