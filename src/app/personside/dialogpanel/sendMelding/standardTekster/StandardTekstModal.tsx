import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import styled from 'styled-components';
import StandardTekstSok from './StandardTekstSok';

interface Props {
    appendTekst(tekst: string): void;
}
const Modal = styled(NavFrontendModal)`
    width: 100%;
    max-width: 57rem;
    min-height: 20rem;
    max-height: 40rem;
    height: 100%;
    padding: 0;
    overflow: hidden;

    > section {
        height: 100%;
    }
`;

function StandardTekstModal(props: Props) {
    const [isOpen, setOpen] = React.useState(true);

    return (
        <>
            <button onClick={() => setOpen(true)}>Open</button>
            <Modal
                contentLabel="Velg standardtekst"
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                className={'standardtekst__modal'}
            >
                <StandardTekstSok
                    appendTekst={tekst => {
                        props.appendTekst(tekst);
                        setOpen(false);
                    }}
                />
            </Modal>
        </>
    );
}

export default StandardTekstModal;
