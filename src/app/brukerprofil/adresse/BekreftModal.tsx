import * as React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components';

interface Props {
    open: boolean;
    onClose: () => void;
    onBekreft: () => void;
    children: string;
    knappTekst: string;
}

const ModalStyling = styled.div`
  padding: .5rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  > *:not(:first-child) {
    margin-top: 1rem;
  }
  > *:last-child {
    align-self: flex-end;
  }
`;

function BekreftModal(props: Props) {

    return (
        <ModalWrapper
            isOpen={props.open}
            contentLabel="Bekreft valg"
            onRequestClose={props.onClose}

        >
            <ModalStyling>
                <Normaltekst>{props.children}</Normaltekst>
                <KnappBase
                    type="standard"
                    htmlType="button"
                    onClick={() => {
                        props.onBekreft();
                        props.onClose();
                    }}
                >
                    {props.knappTekst}
                </KnappBase>
            </ModalStyling>
        </ModalWrapper>
    );
}

export default BekreftModal;
