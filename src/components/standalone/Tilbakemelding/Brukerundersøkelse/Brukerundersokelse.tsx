import * as React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {}

function Brukerundersøkelse(props: Props) {
    return (
        <div>
            <ModalWrapper
                isOpen={true}
                contentLabel={'Brukerundersøkelse'}
                closeButton={true}
                onRequestClose={() => null}
            >
                <h2>Brukerundersøkelse</h2>
                <Normaltekst>Her kommer det en beskrivelse av brukerundersøkelsen</Normaltekst>
            </ModalWrapper>
        </div>
    );
}

export default Brukerundersøkelse;
