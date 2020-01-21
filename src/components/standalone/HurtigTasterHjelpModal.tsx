import React from 'react';
import styled from 'styled-components/macro';
import NavFrontendModal from 'nav-frontend-modal';
import { StyledTable } from '../../utils/table/StyledTable';
import { Innholdstittel } from 'nav-frontend-typografi';

const Modal = styled(NavFrontendModal)`
    &.modal {
        max-height: 40rem;
        min-width: 25rem;
    }
`;

const StyledInnholdstittel = styled(Innholdstittel)`
    margin-bottom: 1rem !important;
`;

interface Props {
    apen: boolean;
    lukkModal: () => void;
}

function HurtigTasterHjelpModal(props: Props) {
    const tableHeaders = ['Tast', 'Beskrivelse'];
    const taster = [
        { tast: 'Alt + O', beskrivelse: 'Vis Oversikt' },
        { tast: 'Alt + T', beskrivelse: 'Vis Oppfølging' },
        { tast: 'Alt + M', beskrivelse: 'Vis Meldinger' },
        { tast: 'Alt + U', beskrivelse: 'Vis Utbetalinger' },
        { tast: 'Alt + S', beskrivelse: 'Vis Saker' },
        { tast: 'Alt + Y', beskrivelse: 'Vis Ytelser' },
        { tast: 'Alt + V', beskrivelse: 'Vis Varsler' },
        { tast: 'Alt + L', beskrivelse: 'Lukk Kontrollsporsmal' },
        { tast: 'Alt + N', beskrivelse: 'Åpne Visitkort' },
        { tast: 'Alt + B', beskrivelse: 'Gå til Personforvalter' }
    ];
    const tableRows = taster.map(hurtigtast => [hurtigtast.tast, hurtigtast.beskrivelse]);
    return (
        <Modal contentLabel="Hurtigtast hjelp" isOpen={props.apen} onRequestClose={props.lukkModal}>
            <StyledInnholdstittel>Hurtigtaster i Modia</StyledInnholdstittel>
            <StyledTable tittelRekke={tableHeaders} rows={tableRows} />
        </Modal>
    );
}

export default HurtigTasterHjelpModal;
