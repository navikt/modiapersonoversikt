import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import NavKontorContainer from './navkontor/NavKontorContainer';
import { erDød, Navn, Person } from '../../../../models/person/person';
import PersonStatus from './status/PersonStatus';
import EtiketterContainer from './Etiketter/EtiketterContainer';
import Mann from '../../../../svg/Mann.js';
import Kvinne from '../../../../svg/Kvinne.js';
import VisMerChevron from '../../../../components/VisMerChevron';
import theme from '../../../../styles/personOversiktTheme';
import ToolTip from '../../../../components/tooltip/ToolTip';
import IfFeatureToggleOn from '../../../../redux/featureToggle/IfFeatureToggleOn';

interface Props {
    visittkortApent: boolean;
    person: Person;
    toggleVisittkort: (erApen?: boolean) => void;
}

interface State {
    showTooltip: boolean;
}

const VisittkortHeaderDiv = styled.section`
  ${theme.hvittPanel};
  padding: ${theme.margin.px20};
  padding-right: 3rem;
  margin-bottom: .2rem;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  cursor: pointer;
  > * {
    flex: 1 1 50%;
  }
`;

const VenstreFelt = styled.section`
  display: flex;
`;

const HøyreFelt = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  text-align: right;
  box-sizing: border-box;
`;

const IkonDiv = styled.div`
  flex: 0 0 ${theme.margin.px50};
  text-align: left;
  svg {
    height: ${theme.margin.px40};
    width: auto;
  }
`;

const GrunninfoDiv = styled.section`
  flex: 1 1;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  *:focus {
    ${theme.focus}
  }
  > *:first-child {
    margin-bottom: 0.2em !important;
  };
`;

const ChevronStyling = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function hentNavn(navn: Navn) {
    return navn.fornavn +
        (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ')
        + navn.etternavn;
}

class VisittkortHeader extends React.PureComponent<Props, State> {

    private navneLinjeRef = React.createRef<HTMLSpanElement>();

    constructor(props: Props) {
        super(props);
        this.state = {showTooltip: false};
        this.toggleVisittkort = this.toggleVisittkort.bind(this);
    }

    componentDidMount() {
        if (this.navneLinjeRef.current && !this.props.person.sikkerhetstiltak) {
            this.navneLinjeRef.current.focus();
        }
    }

    toggleVisittkort() {
        this.setState({showTooltip: true});
        this.props.toggleVisittkort(!this.props.visittkortApent);
    }

    render() {
        const {person, visittkortApent} = this.props;
        const ikon = {
            ikon: person.kjønn === 'M' ? <Mann alt="Mann"/> : <Kvinne alt="Kvinne"/>,
        };
        const alder = erDød(person.personstatus) ? 'Død' : person.alder;
        return (
            <VisittkortHeaderDiv
                role="region"
                aria-label="Visittkort-hode"
                onClick={this.toggleVisittkort}
            >
                <VenstreFelt>
                    <IkonDiv>
                        {ikon.ikon}
                    </IkonDiv>
                    <GrunninfoDiv>
                        <Undertittel tag="h1">
                            <span
                                ref={this.navneLinjeRef}
                                tabIndex={-1} /* for at focus skal funke*/
                            >
                                {hentNavn(person.navn)} ({alder})
                            </span>
                        </Undertittel>
                        <PersonStatus person={person}/>
                    </GrunninfoDiv>
                </VenstreFelt>

                <HøyreFelt>
                    <EtiketterContainer/>
                    <NavKontorContainer person={person}/>
                </HøyreFelt>

                <ChevronStyling>
                    <VisMerChevron
                        onClick={this.toggleVisittkort}
                        open={visittkortApent}
                        title={(visittkortApent ? 'Lukk' : 'Åpne') + ' visittkort (Alt + N)'}
                    >
                    <span className="visually-hidden">
                        {visittkortApent ? 'Lukk visittkort' : 'Ekspander visittkort'}
                        </span>
                    </VisMerChevron>
                </ChevronStyling>
                <IfFeatureToggleOn toggleID="tooltip">
                    {this.state.showTooltip && <ToolTip>Hurtigtast åpne/lukke visittkort: Alt + N</ToolTip>}
                </IfFeatureToggleOn>
            </VisittkortHeaderDiv>
        );
    }
}

export default VisittkortHeader;
