import { Normaltekst } from 'nav-frontend-typografi';
import useUrlNyPersonforvalter from 'src/lib/hooks/useUrlNyPersonforvalter';
import styled from 'styled-components';

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
