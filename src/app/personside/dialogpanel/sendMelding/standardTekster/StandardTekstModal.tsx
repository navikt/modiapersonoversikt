import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import styled from 'styled-components';
import StandardTekstSok from './StandardTekstSok';
import { ReactComponent as SvgIkon } from './StandardTekstIkon.svg';
import { Hovedknapp } from 'nav-frontend-knapper';

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

const Ikon = styled(SvgIkon)`
    position: relative;
    top: 2px;
    width: 18px;
`;

function StandardTekstModal(props: Props) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Ikon />
                <span className="sr-only">Standardtekster</span>
            </Button>
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
