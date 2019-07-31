import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { Person } from '../../../../../models/person/person';
import { hentNavKontor } from '../../../../../redux/restReducers/navkontor';
import { DeprecatedRestResource, isNotStarted, Loaded } from '../../../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { isLoaded, RestResource } from '../../../../../rest/utils/restResource';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface DispatchProps {
    hentNavKontor: (person: Person) => void;
}

interface StateProps {
    baseUrlResource: RestResource<BaseUrlsResponse>;
    navKontorResource: DeprecatedRestResource<BrukersNavKontorResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = DispatchProps & StateProps & OwnProps;

class NavKontorContainer extends React.Component<Props> {
    componentDidMount() {
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
        if (!isLoaded(this.props.baseUrlResource)) {
            return <AlertStripeAdvarsel>Har ikke lastet base-url'er</AlertStripeAdvarsel>;
        }
        return (
            <Innholdslaster avhengigheter={[this.props.navKontorResource]} spinnerSize={'L'}>
                <NavKontorVisning
                    brukersNavKontorResponse={(this.props.navKontorResource as Loaded<BrukersNavKontorResponse>).data}
                    baseUrlsResponse={this.props.baseUrlResource.data}
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
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavKontorContainer);
