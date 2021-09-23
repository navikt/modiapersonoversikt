import * as React from 'react';
import LenkeBrukerprofilVisning from './LenkeBrukerprofil';
import styled from 'styled-components/macro';

const PlaceBottomRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
`;

function LenkeBrukerprofilContainer() {
    return (
        <PlaceBottomRight>
            <LenkeBrukerprofilVisning />
        </PlaceBottomRight>
    );
}

export default LenkeBrukerprofilContainer;
