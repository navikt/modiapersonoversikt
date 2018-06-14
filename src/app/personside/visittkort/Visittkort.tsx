import * as React from 'react';
import styled from 'styled-components';

import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import EkspanderbartpanelBasePure from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base-pure';

interface VisittkortProps {
    person: Person;
}

interface State {
    apen: boolean;
}

const VisittKortDiv = styled.article`
  // For å lage en "strek" mellom visittkorthode og visittkortkropp:
  .ekspanderbartPanel__hode + * {
      border-top: ${props => props.theme.color.bakgrunn} 2px solid;
  }
`;

class Visittkort extends React.Component<VisittkortProps, State> {

    private visittkortRef: HTMLDivElement;

    constructor(props: VisittkortProps) {
        super(props);
        this.state = {
            apen: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClick() {
        this.setState({
            apen: !this.state.apen
        });
    }

    handleClickOutside(event: Event): void {
        if (!this.visittkortRef.contains(event.target as Node)) {
            this.setState({
                apen: false
            });
        }
    }

    render() {
        const visittkortheader = <VisittkortHeader person={this.props.person}/>;

        return (
            <ErrorBoundary>
                <VisittKortDiv innerRef={ref => this.visittkortRef = ref}>
                    <EkspanderbartpanelBasePure
                        onClick={this.handleClick}
                        apen={this.state.apen}
                        heading={visittkortheader}
                        ariaTittel="Visittkort"
                    >
                        <VisittkortBody person={this.props.person}/>
                    </EkspanderbartpanelBasePure>
                </VisittKortDiv>
            </ErrorBoundary>
        );
    }
}

export default Visittkort;
