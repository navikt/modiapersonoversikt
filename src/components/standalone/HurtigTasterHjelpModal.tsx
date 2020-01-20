import React from 'react';
import styled from 'styled-components/macro';
import NavFrontendModal from 'nav-frontend-modal';
import { StyledTable } from '../../utils/table/StyledTable';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

const Modal = styled(NavFrontendModal)`
    &.modal {
        max-height: 40rem;
    }
`;

const StyledNormalTekst = styled(Normaltekst)`
    margin: 1rem 0 !important;
`;

interface Props {
    apen: boolean;
    lukkModal: () => void;
}

function HurtigTasterHjelpModal(props: Props) {
    const tableHeaders = ['Tast', 'Beskrivelse'];
    const taster = [
        { tast: 'Alt + B', beskrivelse: 'Personforvalter' },
        { tast: 'Alt + L', beskrivelse: 'Kontrollsporsmal' },
        { tast: 'Alt + M', beskrivelse: 'Gå til Meldinger' },
        { tast: 'Alt + N', beskrivelse: 'Visitkort' },
        { tast: 'Alt + O', beskrivelse: 'Oversikt' },
        { tast: 'Alt + S', beskrivelse: 'Gå til Saker' },
        { tast: 'Alt + T', beskrivelse: 'Gå til Oppfølging' },
        { tast: 'Alt + U', beskrivelse: 'Utbetalinger' },
        { tast: 'Alt + V', beskrivelse: 'Gå til Varsler' },
        { tast: 'Alt + Y', beskrivelse: 'Gå til Ytelser' }
    ];
    const tableRows = taster.map((hurtigtast, index) => [hurtigtast.tast, hurtigtast.beskrivelse]);
    return (
        <Modal contentLabel="HurtigTaster Tekst" isOpen={props.apen} onRequestClose={props.lukkModal}>
            <Innholdstittel>Hurtigtaster i Modia </Innholdstittel>
            <StyledNormalTekst>Hurtigtaster som brukes i kombinasjon med ALT-tasten</StyledNormalTekst>
            <StyledTable tittelRekke={tableHeaders} rows={tableRows} />
        </Modal>
    );
}

export default HurtigTasterHjelpModal;
