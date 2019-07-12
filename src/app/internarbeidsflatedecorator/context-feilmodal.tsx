import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';

interface ContextFeilmodalProps {
    isOpen: boolean;
    onClose: () => void;
}

class ContextFeilmodal extends React.Component<ContextFeilmodalProps> {
    public render() {
        return (
            <NavFrontendModal
                contentLabel="ContextFeilmodal"
                shouldCloseOnOverlayClick={false}
                isOpen={this.props.isOpen}
                closeButton={true}
                onRequestClose={this.props.onClose}
            >
                <div className="brukercontext__modal">
                    <Innholdstittel tag="h1" className="blokk-s">
                        Bruker i context feilet
                    </Innholdstittel>
                    <div className="modal-content modal-test">
                        <AlertStripeAdvarsel className="blokk-s">
                            Kommunikasjonen med bruker i context feilet. Dette betyr at det er fare for at du kan ha
                            forskjellige brukere i de ulike flatene.
                        </AlertStripeAdvarsel>
                    </div>
                    <div className="modal-footer">
                        <Hovedknapp onClick={this.props.onClose}>Ok</Hovedknapp>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

export default ContextFeilmodal;
