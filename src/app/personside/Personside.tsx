import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, Reducer } from '../../redux/reducer';
import { Person } from '../../models/person';
import MainLayout from './MainLayout';
import Innholdslaster from '../../components/Innholdslaster';

interface PersonsideStateProps {
    personReducer: Reducer<Person>;
}

class Personside extends React.PureComponent<PersonsideStateProps> {

    constructor(props: PersonsideStateProps) {
        super(props);
    }

    render() {
        return (
            <div className="personoversikt">
                <Innholdslaster avhengigheter={[this.props.personReducer]}>
                    <MainLayout />
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
