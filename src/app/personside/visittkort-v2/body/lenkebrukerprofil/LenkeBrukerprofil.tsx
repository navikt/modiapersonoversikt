import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import styled from 'styled-components/macro';
import useUrlNyPersonforvalter from '../../../../brukerprofil/useUrlNyPersonforvalter';

const PlaceBottomRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
`;

function LenkeBrukerprofil() {
    const personforvalterUrl = useUrlNyPersonforvalter();
    return (
        <PlaceBottomRight>
            <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
            </a>
        </PlaceBottomRight>
    );
}

export default LenkeBrukerprofil;
