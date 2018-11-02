import { copyCSSStyles } from './cssUtils';
import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import NavLogo from '../svg/NavLogo';
import { datoVerbose } from '../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Person } from '../models/person/person';
import { detect } from 'detect-browser';
import ModalWrapper from 'nav-frontend-modal';
import PrinterSVG from '../svg/PrinterSVG';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface StateProps {
    person: Person;
}

interface OwnProps {
    getPrintTrigger: (func: () => void) => void;
}

type Props = StateProps & OwnProps;

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
    min-height: 20rem;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledIframe = styled.iframe`
  display: none;
  @media print {
    display: block;
  }
  frame-border: 0;
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
            setTimeout( // SetTimetout for å gjøre kallet asynkront og tillate rendering av react-collapse
                () => this.printElement(),
                0);
        }
    }

    initiatePrint() {
        if (erIE()) {
            alert('Denne funksjonen er ikke implementert i Internet Explorer. Ta i bruk Chrome om du ønsker å printe.');
            return;
        }

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
                    <Wrapper>
                        <Header>
                            <NavLogo/>
                            <Normaltekst>Utskriftsdato: {datoVerbose().sammensattMedKlokke}</Normaltekst>
                            <Normaltekst>Brukers Fødselsnummer: {this.props.person.fødselsnummer}</Normaltekst>
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
                    <StyledIframe id={this.iFrameId}/>
                    <PrintPlaceholder>
                        <PrinterSVG/>
                        <Undertittel>Skriver ut</Undertittel>
                        <NavFrontendSpinner type="S"/>
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

function mapStateToProps(state: AppState): StateProps {
    return ({
        person: state.restEndepunkter.personinformasjon.data && (state.restEndepunkter.personinformasjon.data as Person)
    });
}

export default connect(mapStateToProps)(Printer);
