import * as React from 'react';
import { connect } from 'react-redux';
import { Person, PersonRespons } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import HandleVisittkortHotkeys from './HandleVisittkortHotkeys';
import { AppState } from '../../../redux/reducers';
import { toggleVisittkort, UIState } from '../../../redux/uiReducers/UIReducer';
import { UnmountClosed } from 'react-collapse';
import AriaNotification from '../../../components/AriaNotification';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import { loggEvent } from '../../../utils/frontendLogger';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Loaded } from '../../../redux/restReducers/restReducer';
import { erNyePersonoversikten } from '../../../utils/erNyPersonoversikt';

interface StateProps {
    UI: UIState;
    person: Person;
}

interface DispatchProps {
    toggleVisittkort: (erApen?: boolean) => void;
}

const VisittkortBodyWrapper = styled.div`
  &:focus{${theme.focus}}
  border-radius: ${theme.borderRadius.layout};
`;

type Props = StateProps & DispatchProps;

class VisittkortContainer extends React.Component<Props> {

    private detaljerRef = React.createRef<HTMLDivElement>();

    componentDidUpdate(prevProps: Props) {
        const visittkortetBleÅpnet = !prevProps.UI.visittkort.apent && this.props.UI.visittkort.apent;
        if (visittkortetBleÅpnet && this.detaljerRef.current) {
            this.detaljerRef.current.focus();
            loggEvent('Åpne', 'Visittkort');
        }
    }

    render() {
        const person = this.props.person;
        const erApnet = this.props.UI.visittkort.apent;
        const tabIndexForFokus = erApnet ? -1 : undefined; /* undefided så fokus ikke skal bli hengende ved lukking */
        return (
            <ErrorBoundary>
                <AriaNotification
                    beskjed={`Visittkortet ble ${erApnet ? 'åpnet' : 'lukket'}`}
                    dontShowOnFirstRender={true}
                />
                {erNyePersonoversikten() && <HandleVisittkortHotkeys fødselsnummer={person.fødselsnummer}/>}
                <article role="region" aria-label="Visittkort" aria-expanded={erApnet}>
                    <VisittkortHeader
                        person={person}
                        toggleVisittkort={this.props.toggleVisittkort}
                        visittkortApent={erApnet}
                    />
                    <VisittkortBodyWrapper
                        tabIndex={tabIndexForFokus}
                        innerRef={this.detaljerRef}
                        className="hook-for-spesialstyling-i-gamlemodia-visittkortbodywrapper"
                    >
                        <UnmountClosed isOpened={erApnet}>
                            <VisittkortBody person={person}/>
                        </UnmountClosed>
                    </VisittkortBodyWrapper>
                </article>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        UI: state.ui,
        person: (state.restEndepunkter.personinformasjon as Loaded<PersonRespons>).data as Person
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, AnyAction>): DispatchProps {
    return {
        toggleVisittkort: (erApen?: boolean) => dispatch(toggleVisittkort(erApen))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisittkortContainer);
