import * as React from 'react';
import { connect } from 'react-redux';

import VisittkortContainer from '../visittkort/visittkort-container';
import Innholdslaster from '../../innholdslaster';
import { AppState, Reducer } from '../../redux/reducer';
import { Person } from '../../models/person';
import ComponentPlaceholder from '../component-placeholder/component-placeholder';
import MainLayout from '../layout/main-layout';

interface PersonsideStateProps {
    personReducer: Reducer<Person>;
}

class Personside extends React.PureComponent<PersonsideStateProps> {

    constructor(props: PersonsideStateProps) {
        super(props);
    }

    render() {

        const oversikt = (
            <VisittkortContainer/>
        );

        const dialogpanel = (
            <ComponentPlaceholder name={'Dialog Panel'} />
        );

        return (
            <div className="personoversikt">
                <Innholdslaster avhengigheter={[this.props.personReducer]}>
                    <MainLayout oversikt={oversikt} dialogpanel={dialogpanel}/>
                </Innholdslaster>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {

    return {
        personReducer: state.personinformasjon
    };
}

export default connect(mapStateToProps, null) (Personside);
