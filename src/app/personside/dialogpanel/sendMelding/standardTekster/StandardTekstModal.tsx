import { Hovedknapp } from 'nav-frontend-knapper';
import NavFrontendModal from 'nav-frontend-modal';
import { useState } from 'react';
import styled from 'styled-components';
import useFieldState from '../../../../../utils/hooks/use-field-state';
import useHotkey from '../../../../../utils/hooks/use-hotkey';
import StandardTekster from './StandardTekster';
import SvgIkon from './StandardTekstIkon';

interface Props {
    appendTekst(tekst: string): void;
}

const Modal = styled(NavFrontendModal)`
    &.modal {
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
    const [isOpen, setOpen] = useState(false);
    const sokefelt = useFieldState('');

    useHotkey({ char: 'c', altKey: true }, () => setOpen(true), [setOpen], 'Standardtekster');

    return (
        <>
            <Button htmlType="button" onClick={() => setOpen(true)}>
                <Ikon />
                <span className="sr-only">Standardtekster</span>
            </Button>
            <Modal
                contentLabel="Velg standardtekst"
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                className={'standardtekst__modal'}
            >
                <StandardTekster
                    sokefelt={sokefelt}
                    appendTekst={(tekst) => {
                        props.appendTekst(tekst);
                        setOpen(false);
                    }}
                />
            </Modal>
        </>
    );
}

export default StandardTekstModal;
