import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'history';

import { AppState, RestReducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrls } from '../../../../../redux/baseurls';
import { STATUS } from '../../../../../redux/utils';
import { Person } from '../../../../../models/person/person';
import { hentNavKontor } from '../../../../../redux/navkontor';

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
        navKontorReducer: state.brukersNavKontor,
        baseUrlReducer: state.baseUrlReducer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavKontorContainer);
