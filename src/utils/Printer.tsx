import { copyStyles } from './cssUtils';
import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import NavLogo from '../svg/NavLogo';
import { datoVerbose } from '../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Person } from '../models/person/person';

interface StateProps {
    person: Person;
}

interface OwnProps {
    getPrintFunc: (func: Function) => void;
}

type Props = StateProps & OwnProps;

interface State {
    printing: boolean;
}

const Wrapper = styled.div`
   @page {
        size: auto;
        margin: 0mm;
        
    }
    @media print {
      margin: 15mm;
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

        this.preparePrint = this.preparePrint.bind(this);
        this.props.getPrintFunc(this.preparePrint);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.printing && !prevState.printing) {
            this.printElement();
        }
    }

    preparePrint() {
        this.setState({
            printing: true
        });
    }

    printElement() {
        const content = document.getElementById(this.contentId);
        const iFrame = document.getElementById(this.iFrameId) as HTMLIFrameElement;
        let doc = iFrame.contentDocument as Document;
        let window = iFrame.contentWindow as Window;
        if (doc !== null && content !== null) {
            setTimeout(
                () => this.populateAndPrint(doc, content, window),
                0);
        }
    }

    populateAndPrint(doc: Document, content: Element, window: Window) {
        this.copyHTML(doc, content);
        copyStyles(document, doc);
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
        let res = window.document.execCommand('print', false, null); // IE fix
        if (!res) {
            window.print();
        }
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

function mapStateToProps(state: AppState): StateProps {
    return ({
        person: state.restEndepunkter.personinformasjon.data && (state.restEndepunkter.personinformasjon.data as Person)
    });
}

export default connect(mapStateToProps)(Printer);
