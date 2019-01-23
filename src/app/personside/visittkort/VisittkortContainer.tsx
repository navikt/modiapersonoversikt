import * as React from 'react';
import { connect } from 'react-redux';
import { Person, PersonRespons } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import HandleVisittkortHotkeys from './HandleVisittkortHotkeys';
import { AppState } from '../../../redux/reducers';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import { UnmountClosed } from 'react-collapse';
import AriaNotification from '../../../components/AriaNotification';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import { loggEvent } from '../../../utils/frontendLogger';
import { Loaded } from '../../../redux/restReducers/restReducer';
import { erNyePersonoversikten } from '../../../utils/erNyPersonoversikt';
import HandleVisittkortHotkeysGamlemodia from './HandleVisittkortHotkeysGamlemodia';
import { loggSkjermInfoDaglig } from '../../../utils/loggInfo/loggSkjermInfoDaglig';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface StateProps {
    visittkortErApent: boolean;
    person: Person;
}

interface DispatchProps {
    toggleVisittkort: (erApen?: boolean) => void;
}

type Props = StateProps & DispatchProps;

const VisittkortBodyWrapper = styled.div`
  &:focus{${theme.focus}}
  border-radius: ${theme.borderRadius.layout};
`;

class VisittkortContainer extends React.PureComponent<Props> {

    private detaljerRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        loggSkjermInfoDaglig();
    }

    componentDidUpdate(prevProps: Props) {
        const visittkortetBleÅpnet = !prevProps.visittkortErApent && this.props.visittkortErApent;
        if (visittkortetBleÅpnet && this.detaljerRef.current) {
            this.detaljerRef.current.focus();
            loggEvent('Åpne', 'Visittkort');
        }
    }

    render() {
        const {person, visittkortErApent: erApnet, toggleVisittkort: toggle} = this.props;
        const tabIndexForFokus = erApnet ? -1 : undefined;
        /* undefided så fokus ikke skal bli hengende ved lukking */
        const visittkortHotkeys = erNyePersonoversikten()
            ? <HandleVisittkortHotkeys fødselsnummer={person.fødselsnummer}/>
            : <HandleVisittkortHotkeysGamlemodia/>;
        return (
            <ErrorBoundary>
                <AriaNotification
                    beskjed={`Visittkortet ble ${erApnet ? 'åpnet' : 'lukket'}`}
                    dontShowOnFirstRender={true}
                />
                {visittkortHotkeys}
                <article role="region" aria-label="Visittkort" aria-expanded={erApnet}>
                    <VisittkortHeader person={person} toggleVisittkort={toggle} visittkortApent={erApnet}/>
                    <VisittkortBodyWrapper
                        tabIndex={tabIndexForFokus}
                        ref={this.detaljerRef}
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

function mapStateToProps(state: AppState): StateProps {
    return {
        visittkortErApent: state.ui.visittkort.apent,
        person: (state.restEndepunkter.personinformasjon as Loaded<PersonRespons>).data as Person
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleVisittkort: (erApen?: boolean) => dispatch(toggleVisittkort(erApen))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisittkortContainer);
