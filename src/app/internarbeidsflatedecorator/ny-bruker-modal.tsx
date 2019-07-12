import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

interface NyBrukerModalProps {
    isOpen: boolean;
    isPending: boolean;
    doLastNyBruker: () => void;
    doFortsettSammeBruker: () => void;
    fodselsnummer: string;
}

const doNothing = () => true;

class NyBrukerModal extends React.Component<NyBrukerModalProps> {
    public render() {
        return (
            <NavFrontendModal
                contentLabel="Brukercontext"
                portalClassName="context-modal-portal"
                isOpen={this.props.isOpen}
                closeButton={false}
                onRequestClose={doNothing}
            >
                <div className="brukercontext__modal">
                    <Innholdstittel tag="h1" className="blokk-s">
                        Du har endret bruker
                    </Innholdstittel>
                    <AlertStripeInfo className="blokk-s">
                        Du har endret bruker i et annet vindu. Du kan ikke jobbe med 2 brukere samtidig. Velger du å
                        endre bruker mister du arbeidet du ikke har lagret.
                    </AlertStripeInfo>
                    <Normaltekst className="blokk-s">
                        {`Ønsker du å endre bruker til ${this.props.fodselsnummer}?`}
                    </Normaltekst>
                    <div className="modal-footer">
                        <Hovedknapp disabled={this.props.isPending} onClick={this.props.doLastNyBruker}>
                            Endre
                        </Hovedknapp>
                        <Knapp
                            type="standard"
                            onClick={this.props.doFortsettSammeBruker}
                            spinner={this.props.isPending}
                            autoDisableVedSpinner={true}
                        >
                            Behold
                        </Knapp>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

export default NyBrukerModal;
