import * as React from 'react';
import { FormEvent } from 'react';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { STATUS } from '../../../redux/restReducers/utils';
import { AppState } from '../../../redux/reducers';
import { reset } from '../../../redux/restReducers/brukerprofil/endreNavn';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { SafRequest } from "../../../redux/restReducers/saf/safRequest";
import { saf } from "../../../redux/restReducers/saf/safReducer";

interface State {
}

interface DispatchProps {
    safPost: (request: SafRequest) => void;
    resetSafReducer: () => void;
}

interface StateProps {
    reducerStatus: STATUS;
}

interface OwnProps {
}

type Props = DispatchProps & StateProps & OwnProps;

class SafForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.resetSafReducer();
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();


        var request = '{"query": "query{ dokumentoversiktBruker(brukerId: {id: \"1000096233942\", type: AKTOERID}, foerste:5) {journalposter {journalpostId}}}"}'

        this.props.safPost(request)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                        <KnappBase
                            type="hoved"
                            spinner={this.props.reducerStatus === STATUS.LOADING}
                            autoDisableVedSpinner={true}
                        >
                           Kall Saf
                        </KnappBase>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        reducerStatus: state.restEndepunkter.safReducer.status
    });
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        safPost: (request: SafRequest) => dispatch(saf(request)),
        resetSafReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SafForm);