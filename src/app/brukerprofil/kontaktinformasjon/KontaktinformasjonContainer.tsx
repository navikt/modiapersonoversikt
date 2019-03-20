import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import { AppState } from '../../../redux/reducers';
import Innholdslaster from '../../../components/Innholdslaster';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import { hentRetningsnummere } from '../../../redux/restReducers/kodeverk/retningsnummereReducer';
import KontaktinformasjonForm from './KontaktinformasjonForm';
import { isNotStarted, Loaded, RestReducer } from '../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface DispatchProps {
    hentRetningsnummer: () => void;
}

interface StateProps {
    retningsnummerReducer: RestReducer<KodeverkResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = OwnProps & DispatchProps & StateProps;

const NavKontaktinformasjonWrapper = styled.div`
    margin-top: 2em;
`;

class KontaktinformasjonFormContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (isNotStarted(this.props.retningsnummerReducer)) {
            this.props.hentRetningsnummer();
        }
    }

    render() {
        return (
            <div>
                <Undertittel>Kontaktinformasjon</Undertittel>
                <Innholdslaster avhengigheter={[this.props.retningsnummerReducer]}>
                    <NavKontaktinformasjonWrapper>
                        <KontaktinformasjonForm
                            person={this.props.person}
                            retningsnummerKodeverk={(this.props.retningsnummerReducer as Loaded<KodeverkResponse>).data}
                        />
                    </NavKontaktinformasjonWrapper>
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps & OwnProps => {
    return {
        retningsnummerReducer: state.restEndepunkter.retningsnummerReducer,
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
