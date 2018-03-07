import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import VisittkortContainer from '../visittkort/visittkort-container';

interface PersonsideRouteProps {
    fodselsnummer: string;
}

interface PersonsideStateProps {
    fodselsnummer: string;
}

interface DispatchProps {
}

type PersonsideProps = RouteComponentProps<PersonsideRouteProps> & PersonsideStateProps;

class Personside extends React.PureComponent<PersonsideProps> {

    constructor(props: PersonsideProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <VisittkortContainer/>
            </div>
        );
    }
}

function mapStateToProps(state: object, ownProps: RouteComponentProps<PersonsideRouteProps>): PersonsideStateProps {
    const routeParams = ownProps.match.params;
    const fodselsnummer = routeParams.fodselsnummer;

    return {
        fodselsnummer
    };
}

function mapDispatchToProps(dispatch: Dispatch<object>): DispatchProps {
    return {
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Personside));
