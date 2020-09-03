import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import React from 'react';
import styled from 'styled-components';
import useNotifikasjoner from './useNotifikasjoner';

const StyledDiv = styled.div`
    text-align: center;
`;

const StyledNesteknapp = styled(Nesteknapp)`
    float: right;
`;

const StyledTilbakeknapp = styled(Tilbakeknapp)`
    float: left;
`;

export function NotfikiasjonerVelger() {
    const notifikasjoner = useNotifikasjoner();

    const neste = () => {
        console.log('click');
    };

    const antall = notifikasjoner.data.length;

    if (antall > 1) {
        return (
            <StyledDiv>
                <StyledNesteknapp onClick={neste} />
            </StyledDiv>
        );
    }

    if (antall === 1) {
        return <StyledDiv></StyledDiv>;
    }

    return (
        <StyledDiv>
            <StyledTilbakeknapp />
        </StyledDiv>
    );
}
