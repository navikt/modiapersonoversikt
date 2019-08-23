import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import styled from 'styled-components';
import StandardTekstSok from './StandardTekstSok';

interface Props {
    appendTekst(tekst: string, locale: string): void;
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
    const [isOpen, setOpen] = React.useState(false);

    return (
        <>
            <div className="StandardTekstModal">
                <button onClick={() => setOpen(true)}>Standardtekster</button>
            </div>
            <Modal
                contentLabel="Velg standardtekst"
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                className={'standardtekst__modal'}
            >
                <StandardTekstSok
                    appendTekst={(tekst, locale) => {
                        props.appendTekst(tekst, locale);
                        setOpen(false);
                    }}
                />
            </Modal>
        </>
    );
}

export default StandardTekstModal;
