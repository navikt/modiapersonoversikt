import * as React from 'react';
import styled from 'styled-components';
import Modal from 'nav-frontend-modal';

import Brukerprofil from './BrukerprofilContainer';

const RedigerBrukerprofilLenke = styled.a`
  margin-right: 4em;
`;

const Filler = styled.div`
  flex-grow: 1;
`;
const RedigerBrukerprofilWrapper = styled.div`
  display: flex;
`;

interface BrukerprofilState {
    modalIsOpen: boolean;
}

const customStyles = {
    content : {
        top                   : '200px',
        left                  : '200px',
        right: '200px'
    }
};

class BrukerprofilModal extends React.Component<{}, BrukerprofilState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <RedigerBrukerprofilWrapper>
                <Filler/>
                <RedigerBrukerprofilLenke
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'lenke'}
                    onClick={this.openModal}
                >
                    Rediger Brukerprofil
                </RedigerBrukerprofilLenke>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    closeButton={true}
                    contentLabel="Brukerprofil"
                >
                <Brukerprofil/>
                </Modal>
            </RedigerBrukerprofilWrapper>
        );
    }
}

export default BrukerprofilModal;