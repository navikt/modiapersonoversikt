import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import VisittkortContainer from '../visittkort/visittkort-container';

interface PersonPageRouteProps {
    fodselsnummer: string;
}

interface PersonPageStateProps {
    fodselsnummer: string;
}

interface DispatchProps {
}

type PersonPageProps = RouteComponentProps<PersonPageRouteProps> & PersonPageStateProps;

class PersonPage extends React.PureComponent<PersonPageProps> {

    constructor(props: PersonPageProps) {
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

function mapStateToProps(state: object, ownProps: RouteComponentProps<PersonPageRouteProps>): PersonPageStateProps {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PersonPage));
