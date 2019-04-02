import { copyCSSStyles } from './cssUtils';
import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import NavLogo from '../svg/NavLogo';
import { detect } from 'detect-browser';
import ModalWrapper from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { loggEvent } from './frontendLogger';
import { Bold } from '../components/common-styled-components';
import Fødselsnummer from '../components/Fødselsnummer';
import { datoVerbose } from './dateUtils';

interface Props {
    getPrintTrigger: (func: () => void) => void;
}

interface State {
    printing: boolean;
}

const Wrapper = styled.div`
    @page {
        size: auto;
    }
    @media print {
        margin: 5mm;
        display: block;
    }
    .visually-hidden {
        display: none;
    }
`;

const Header = styled.div`
    > * {
        margin-bottom: 1rem;
    }
    display: none;
    @media print {
        display: flex;
    }
    flex-direction: column;
    align-items: center;
    padding: 0 2rem 3rem;
`;

const PrintPlaceholder = styled.div`
    > *:first-child {
        margin-bottom: 1rem;
    }
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledIframe = styled.iframe`
    display: none;
    @media print {
        display: block;
    }
`;

class Printer extends React.Component<Props, State> {
    private contentId = guid();
    private iFrameId = guid();

    constructor(props: Props) {
        super(props);

        this.state = {
            printing: false
        };

        this.initiatePrint = this.initiatePrint.bind(this);
        this.props.getPrintTrigger(this.initiatePrint);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const printBleStartet = this.state.printing && !prevState.printing;
        if (printBleStartet) {
            setTimeout(
                // SetTimetout for å gjøre kallet asynkront og tillate rendering av react-collapse
                () => this.printElement(),
                0
            );
        }
    }

    initiatePrint() {
        if (erIE()) {
            alert('Denne funksjonen er ikke implementert i Internet Explorer. Ta i bruk Chrome om du ønsker å printe.');
            loggEvent('Forsøkte å skrive ut i IE', 'Printer');
            return;
        }
        loggEvent('Utskrift', 'Printer');

        this.setState({
            printing: true
        });
    }

    printElement() {
        const contentToPrint = document.getElementById(this.contentId);
        const iFrame = document.getElementById(this.iFrameId) as HTMLIFrameElement;
        const iFrameDocument = iFrame.contentDocument as Document;
        const iFramWindow = iFrame.contentWindow as Window;
        if (iFrameDocument !== null && contentToPrint !== null) {
            this.populateAndPrint(iFrameDocument, contentToPrint, iFramWindow);
        }
    }

    populateAndPrint(iFrameDocument: Document, contentToPrint: Element, iframeWindow: Window) {
        this.copyHTML(iFrameDocument, contentToPrint);
        copyCSSStyles(document, iFrameDocument);
        this.print(iframeWindow);
        this.setState({
            printing: false
        });
    }

    copyHTML(doc: Document, content: Element) {
        doc.write('<html><body>');
        doc.write(content.innerHTML);
        doc.write('</html></body>');
        doc.close();
    }

    print(iframeWindow: Window) {
        iframeWindow.focus();
        iframeWindow.print();
    }

    render() {
        if (!this.state.printing) {
            return this.props.children;
        }

        return (
            <>
                <div id={this.contentId}>
                    <Wrapper className="ikke-skjul-ved-print-i-gamlemodia">
                        <Header>
                            <NavLogo />
                            <Normaltekst>Utskriftsdato: {datoVerbose().sammensattMedKlokke}</Normaltekst>
                            <Normaltekst>
                                Brukers Fødselsnummer: <Fødselsnummer />
                            </Normaltekst>
                        </Header>
                        {this.props.children}
                    </Wrapper>
                </div>
                <ModalWrapper
                    isOpen={true}
                    contentLabel="Printer Container"
                    onRequestClose={() => null}
                    closeButton={false}
                >
                    <StyledIframe id={this.iFrameId} frameBorder={'0'} />
                    <PrintPlaceholder>
                        <Normaltekst>
                            <Bold>Forbereder utskrift</Bold>
                        </Normaltekst>
                        <NavFrontendSpinner type="S" />
                    </PrintPlaceholder>
                </ModalWrapper>
            </>
        );
    }
}

function erIE() {
    const browser = detect();
    return browser && browser.name === 'ie';
}

export default Printer;
