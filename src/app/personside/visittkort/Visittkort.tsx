import * as React from 'react';
import styled from 'styled-components';
import { connect, Dispatch } from 'react-redux';

import EkspanderbartpanelBasePure from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base-pure';

import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import ShortcutListener from './ShortcutListener';
import { AppState } from '../../../redux/reducers';
import { toggleVisittkort } from '../../../redux/uiReducers/VisittkortUIDuck';

interface VisittkortProps {
    person: Person;
}

interface StateProps {
    visittkortÅpent: boolean;
}

interface DispatchProps {
    toggleVisittkort: () => void;
}

const VisittKortDiv = styled.article`
  .ekspanderbartPanel__hode {
      // For å lage en "strek" mellom visittkorthode og visittkortkropp:
      border-bottom: ${props => props.theme.color.bakgrunn} 2px solid;
      &:hover { color: inherit; }
  }
`;

class Visittkort extends React.Component<VisittkortProps & StateProps & DispatchProps> {

    render() {
        const person = this.props.person;
        const visittkortheader = <VisittkortHeader person={person}/>;
        return (
            <ErrorBoundary>
                <ShortcutListener fødselsnummer={person.fødselsnummer}/>
                <VisittKortDiv>
                    <EkspanderbartpanelBasePure
                        apen={this.props.visittkortÅpent}
                        heading={visittkortheader}
                        ariaTittel="Visittkort"
                        onClick={() => this.props.toggleVisittkort()}
                    >
                        <VisittkortBody person={person}/>
                    </EkspanderbartpanelBasePure>
                </VisittKortDiv>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        visittkortÅpent: state.visittkortUi.visittkortÅpent
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        toggleVisittkort: () => dispatch(toggleVisittkort())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Visittkort);
