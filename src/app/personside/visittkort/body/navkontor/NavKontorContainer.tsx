import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrls } from '../../../../../redux/restReducers/baseurls';
import { Person } from '../../../../../models/person/person';
import { hentNavKontor } from '../../../../../redux/restReducers/navkontor';
import { isNotStarted, Loaded, DeprecatedRestResource } from '../../../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';

interface DispatchProps {
    hentBaseUrls: () => void;
    hentNavKontor: (person: Person) => void;
}

interface StateProps {
    baseUrlResource: DeprecatedRestResource<BaseUrlsResponse>;
    navKontorResource: DeprecatedRestResource<BrukersNavKontorResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = DispatchProps & StateProps & OwnProps;

class NavKontorContainer extends React.Component<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.baseUrlResource)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.navKontorResource)) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.person.fødselsnummer !== prevProps.person.fødselsnummer) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    render() {
        const baseUrlResponse = this.props.baseUrlResource;
        return (
            <Innholdslaster
                avhengigheter={[this.props.navKontorResource, this.props.baseUrlResource]}
                spinnerSize={'L'}
            >
                <NavKontorVisning
                    brukersNavKontorResponse={(this.props.navKontorResource as Loaded<BrukersNavKontorResponse>).data}
                    baseUrlsResponse={(baseUrlResponse as Loaded<BaseUrlsResponse>).data}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        navKontorResource: state.restResources.brukersNavKontor,
        baseUrlResource: state.restResources.baseUrl
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavKontorContainer);
