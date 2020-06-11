import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import PersonsokSkjema from '../../app/personsok/PersonsokSkjema';
import PersonsokResultat from '../../app/personsok/PersonsokResultat';

class PersonsokStandAloneKomponent extends React.PureComponent {
    render() {
        return (
            <ErrorBoundary boundaryName="Personsøk">
                <PersonsokSkjema setPosting={() => null} setResponse={() => null} />
                <PersonsokResultat posting={false} response={undefined} onClose={() => {}} />
            </ErrorBoundary>
        );
    }
}

export default PersonsokStandAloneKomponent;
