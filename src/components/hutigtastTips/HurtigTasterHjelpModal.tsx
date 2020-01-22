import React from 'react';
import styled from 'styled-components/macro';
import NavFrontendModal from 'nav-frontend-modal';
import { StyledTable } from '../../utils/table/StyledTable';
import { Innholdstittel } from 'nav-frontend-typografi';

const Modal = styled(NavFrontendModal)`
    &.modal {
        max-height: 70vh;
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
        { tast: 'Alt + O', beskrivelse: 'Vis oversikt' },
        { tast: 'Alt + T', beskrivelse: 'Vis oppfølging' },
        { tast: 'Alt + M', beskrivelse: 'Vis meldinger' },
        { tast: 'Alt + U', beskrivelse: 'Vis utbetalinger' },
        { tast: 'Alt + S', beskrivelse: 'Vis saker' },
        { tast: 'Alt + Y', beskrivelse: 'Vis ytelser' },
        { tast: 'Alt + V', beskrivelse: 'Vis varsler' },
        { tast: 'Alt + L', beskrivelse: 'Lukk kontrollsporsmal' },
        { tast: 'Alt + N', beskrivelse: 'Åpne/lukke visitkort' },
        { tast: 'Alt + C', beskrivelse: 'Åpne samtalemaler' },
        { tast: 'Alt + B', beskrivelse: 'Gå til personforvalter' },
        { tast: 'Alt + G', beskrivelse: 'Gå til gosys' }
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
