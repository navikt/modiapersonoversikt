import * as React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';
import styled from 'styled-components';

interface Props extends Partial<Pick<KnappBaseProps, 'type'>> {
    onBekreft: () => void;
    children: string;
    popUpTekst?: string;
    bekreftKnappTekst?: string;
    className?: string;
}

interface State {
    visModal: boolean;
}

const ModalStyling = styled.div`
    padding: 0.5rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    min-width: 20rem;
    max-width: 30rem;
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    > *:last-child {
        align-self: flex-end;
    }
`;

class KnappMedBekreftPopup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visModal: false
        };
        this.skjulModal = this.skjulModal.bind(this);
        this.visModal = this.visModal.bind(this);
        this.handleBekreft = this.handleBekreft.bind(this);
    }

    skjulModal() {
        this.setState({ visModal: false });
    }

    visModal() {
        this.setState({ visModal: true });
    }

    handleBekreft() {
        this.props.onBekreft();
        this.skjulModal();
    }

    render() {
        return (
            <>
                <KnappBase
                    type={this.props.type || 'standard'}
                    htmlType="button"
                    onClick={this.visModal}
                    className={this.props.className}
                >
                    {this.props.children}
                </KnappBase>
                <ModalWrapper isOpen={this.state.visModal} contentLabel="Bekreft valg" onRequestClose={this.skjulModal}>
                    <ModalStyling>
                        <Normaltekst>{this.props.popUpTekst || 'Er du sikker?'}</Normaltekst>
                        <KnappBase type="standard" htmlType="button" onClick={this.handleBekreft} autoFocus={true}>
                            {this.props.bekreftKnappTekst ? this.props.bekreftKnappTekst : 'Bekreft'}
                        </KnappBase>
                    </ModalStyling>
                </ModalWrapper>
            </>
        );
    }
}

export default KnappMedBekreftPopup;
