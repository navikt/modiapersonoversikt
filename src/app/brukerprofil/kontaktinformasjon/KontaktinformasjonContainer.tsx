import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import { AppState } from '../../../redux/reducers';
import Innholdslaster from '../../../components/Innholdslaster';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import { hentRetningsnummere } from '../../../redux/restReducers/kodeverk/retningsnummereReducer';
import KontaktinformasjonForm from './KontaktinformasjonForm';
import { isNotStarted, Loaded, DeprecatedRestResource } from '../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface DispatchProps {
    hentRetningsnummer: () => void;
}

interface StateProps {
    retningsnummerResource: DeprecatedRestResource<KodeverkResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = OwnProps & DispatchProps & StateProps;

const NavKontaktinformasjonWrapper = styled.div`
    margin-top: 2em;
`;

class KontaktinformasjonFormContainer extends React.Component<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.retningsnummerResource)) {
            this.props.hentRetningsnummer();
        }
    }

    render() {
        return (
            <div>
                <Undertittel>Kontaktinformasjon</Undertittel>
                <Innholdslaster avhengigheter={[this.props.retningsnummerResource]}>
                    <NavKontaktinformasjonWrapper>
                        <KontaktinformasjonForm
                            person={this.props.person}
                            retningsnummerKodeverk={
                                (this.props.retningsnummerResource as Loaded<KodeverkResponse>).data
                            }
                        />
                    </NavKontaktinformasjonWrapper>
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps & OwnProps => {
    return {
        retningsnummerResource: state.restResources.retningsnummer,
        person: ownProps.person
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentRetningsnummer: () => dispatch(hentRetningsnummere())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KontaktinformasjonFormContainer);
