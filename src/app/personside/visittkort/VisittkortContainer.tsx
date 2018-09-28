import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import HandleVisittkortHotkeys from './HandleVisittkortHotkeys';
import { AppState } from '../../../redux/reducers';
import { toggleVisittkort, UIState } from '../../../redux/uiReducers/UIReducer';
import { UnmountClosed } from 'react-collapse';

interface StateProps {
    UI: UIState;
    person: Person;
}

interface DispatchProps {
    toggleVisittkort: (erApen?: boolean) => void;
}

class VisittkortContainer extends React.Component<StateProps & DispatchProps> {

    render() {
        const person = this.props.person;
        const erApnet = this.props.UI.visittkort.apent;
        return (
            <ErrorBoundary>
                <HandleVisittkortHotkeys fødselsnummer={person.fødselsnummer}/>
                <article role="region" aria-label="Visittkort">
                    <VisittkortHeader
                        person={person}
                        toggleVisittkort={this.props.toggleVisittkort}
                        visittkortApent={erApnet}
                    />
                    <UnmountClosed isOpened={erApnet}>
                        <VisittkortBody person={person}/>
                    </UnmountClosed>
                </article>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        UI: state.ui,
        person: state.restEndepunkter.personinformasjon.data as Person
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        toggleVisittkort: (erApen?: boolean) => dispatch(toggleVisittkort(erApen))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisittkortContainer);
