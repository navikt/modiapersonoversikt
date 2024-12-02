import { Link } from 'react-router-dom';
import { paths } from '../routes/routing';
import RawModal from 'nav-frontend-modal';
import styled from 'styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import ErrorIkon from '../../svg/alvorlig-advarsel.svg';

const Modal = styled(RawModal)`
    text-align: center;
    min-width: 20rem;
`;

interface NyIdentTilgangProps {
    aktivIdent: string;
}

function NyIdentModal(props: NyIdentTilgangProps) {
    return (
        <Modal
            isOpen={true}
            contentLabel="NyIdent"
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {}}
        >
            <ErrorIkon width="2rem" className="blokk-xs" />
            <Systemtittel tag="h1" className="blokk-xs" role="alert" aria-live="assertive">
                Oppslag på inaktiv ident
            </Systemtittel>

            <div className="noncenter typo-normal blokk-m">
                Personidenten du slo opp er ikke lenger aktiv. Ny ident for bruker er {props.aktivIdent}.
            </div>
            <Link className="knapp blokk-xxxs knapp--hoved" to={`${paths.personUri}/${props.aktivIdent}`}>
                Gå til ny ident
            </Link>
        </Modal>
    );
}

export default NyIdentModal;
