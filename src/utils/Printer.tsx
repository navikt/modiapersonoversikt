import { copyCSSStyles } from './cssUtils';
import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import NavLogo from '../svg/NavLogo';
import { datoVerbose } from '../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Person } from '../models/person/person';
import { detect } from 'detect-browser';

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

    populateAndPrint(iFrameDocument: Document, contentToPrint: Element, window: Window) {
        this.copyHTML(iFrameDocument, contentToPrint);
        copyCSSStyles(document, iFrameDocument);
        this.print(window);
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

    print(window: Window) {
        window.focus();
        window.print();
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
                <iframe id={this.iFrameId} style={{display: 'none'}} frameBorder={'0'}/>
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
