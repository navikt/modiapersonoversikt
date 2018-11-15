import * as React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrls } from '../../../../../redux/restReducers/baseurls';
import { STATUS } from '../../../../../redux/restReducers/utils';
import { Person } from '../../../../../models/person/person';
import { hentNavKontor } from '../../../../../redux/restReducers/navkontor';
import { RestReducer } from '../../../../../redux/restReducers/restReducer';

interface DispatchProps {
    hentBaseUrls: () => void;
    hentNavKontor: (person: Person) => void;
}

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    navKontorReducer: RestReducer<BrukersNavKontorResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = DispatchProps & StateProps & OwnProps;

class NavKontorContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.baseUrlReducer.status ===  STATUS.NOT_STARTED) {
            this.props.hentBaseUrls();
        }
        if (this.props.navKontorReducer.status === STATUS.NOT_STARTED) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.person.fødselsnummer !== prevProps.person.fødselsnummer) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    render() {
        const baseUrlResponse = this.props.baseUrlReducer;
        return (
            <Innholdslaster avhengigheter={[this.props.navKontorReducer, this.props.baseUrlReducer]} spinnerSize={'L'}>
                <NavKontorVisning
                    navKontor={this.props.navKontorReducer.data.navKontor}
                    baseUrlsResponse={baseUrlResponse.data}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.restEndepunkter.brukersNavKontor,
        baseUrlReducer: state.restEndepunkter.baseUrlReducer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavKontorContainer);
