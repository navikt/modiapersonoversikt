import { Button } from '@navikt/ds-react';
import { useSetAtom } from 'jotai';
import RawModal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { aktivBrukerAtom } from 'src/lib/state/context';
import styled from 'styled-components';
import ErrorIkon from '../../svg/alvorlig-advarsel.svg';

const Modal = styled(RawModal)`
    text-align: center;
    min-width: 20rem;
`;

interface NyIdentTilgangProps {
    aktivIdent: string;
}

function NyIdentModal(props: NyIdentTilgangProps) {
    const setAktivBruker = useSetAtom(aktivBrukerAtom);
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
            <Button onClick={() => setAktivBruker(props.aktivIdent)}>Gå til ny ident</Button>
        </Modal>
    );
}

export default NyIdentModal;
