import React from 'react';
import useHotkey from '../../utils/hooks/use-hotkey';
import styled from 'styled-components';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { StyledTable } from '../../utils/table/StyledTable';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

const Modal = styled(NavFrontendModal)`
    &.modal {
        width: 100%;
        max-width: 57rem;
        min-height: 20rem;
        max-height: 40rem;
        height: 100%;
        padding: 0;

        > section {
            height: 100%;
        }
    }
`;

const Button = styled(Hovedknapp)`
    position: absolute;
    height: 2rem;
    width: 2rem;
    border-bottom-right-radius: 50%;
    padding: 0;
    background-color: #0067c5;
    border: none;
    z-index: 10;
    transform: none;
    &:after {
        background: none;
    }
    &:hover {
        transform: none;
    }
`;

const StyledArticle = styled.article`
    padding: 1rem;
`;

const StyledNormalTekst = styled(Normaltekst)`
    margin: 1rem 0 !important;
`;

function HurtigTasterHjelpModal() {
    const [isOpen, setOpen] = React.useState(false);
    const tableHeaders = ['Tast', 'Beskrivelse'];
    const taster = [
        { tast: 'Alt+B', beskrivelse: 'Personforvalter' },
        { tast: 'Alt+L', beskrivelse: 'Kontrollsporsmal' },
        { tast: 'Alt+M', beskrivelse: 'Gå til Meldinger' },
        { tast: 'Alt+N', beskrivelse: 'Visitkort' },
        { tast: 'Alt+O', beskrivelse: 'Oversikt' },
        { tast: 'Alt+S', beskrivelse: 'Gå til Saker' },
        { tast: 'Alt+T', beskrivelse: 'Gå til Oppfølging' },
        { tast: 'Alt+U', beskrivelse: 'Utbetalinger' },
        { tast: 'Alt+V', beskrivelse: 'Gå til Varsler' },
        { tast: 'Alt+Y', beskrivelse: 'Gå til Ytelser' }
    ];
    const tableRows = taster.map((syfopunkt, index) => [syfopunkt.tast, syfopunkt.beskrivelse]);
    useHotkey({ char: 'H', altKey: true }, () => setOpen(true), [setOpen], 'HurtigTasterHjelp');

    return (
        <>
            <Button htmlType="button" onClick={() => setOpen(true)}>
                <span className="sr-only">HurtigTasterHjelp</span>
            </Button>
            <Modal contentLabel="HurtigTaster Tekst" isOpen={isOpen} onRequestClose={() => setOpen(false)}>
                <StyledArticle>
                    <Innholdstittel>Hurtigtaster i Modia </Innholdstittel>
                    <StyledNormalTekst>Hurtigtaster som brukes i kombinasjon med ALT-tasten</StyledNormalTekst>
                    <StyledTable tittelRekke={tableHeaders} rows={tableRows} />
                </StyledArticle>
            </Modal>
        </>
    );
}

export default HurtigTasterHjelpModal;
