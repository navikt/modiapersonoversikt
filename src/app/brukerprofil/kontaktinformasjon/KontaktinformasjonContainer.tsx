import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { AppState, Reducer } from '../../../redux/reducer';
import Innholdslaster from '../../../components/Innholdslaster';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import { hentRetningsnummere, retningsnummerActionNames } from '../../../redux/kodeverk/retningsnummereReducer';
import KontaktinformasjonForm from './KontaktinformasjonForm';

interface DispatchProps {
    hentRetningsnummer: () => void;
}

interface StateProps {
    retningsnummerReducer: Reducer<KodeverkResponse>;
}

interface OwnProps {
    fødselsnummer: string;
    person: Person;
}

type Props = OwnProps & DispatchProps & StateProps;

interface KontaktinformasjonWrapperProps {
    retningsnummerKodeverk: KodeverkResponse | undefined;
    person: Person;
}

const NavKontaktinformasjonWrapper = styled.div`
  margin-top: 2em;
`;

function KontaktinformasjonWrapper({ person, retningsnummerKodeverk}:
                                       KontaktinformasjonWrapperProps) {
    if (!retningsnummerKodeverk) {
        return <Undertekst>Kunne ikke hente kodeverk for retningsnummere</Undertekst>;
    } else {
        return (
            <NavKontaktinformasjonWrapper>
                <KontaktinformasjonForm person={person} retningsnummerKodeverk={retningsnummerKodeverk} />
            </NavKontaktinformasjonWrapper>
        );
    }
}

class KontaktinformasjonFormContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.retningsnummerReducer.status ===  retningsnummerActionNames.INITIALIZED) {
            this.props.hentRetningsnummer();
        }
    }

    render() {
        return (
            <>
                <Undertittel>Kontaktinformasjon</Undertittel>
                <Innholdslaster
                    avhengigheter={[this.props.retningsnummerReducer]}
                >
                    <KontaktinformasjonWrapper
                        retningsnummerKodeverk={this.props.retningsnummerReducer.data}
                        person={this.props.person}
                    />
                </Innholdslaster>
            </>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps & OwnProps => {
    return ({
        retningsnummerReducer: state.retningsnummerReducer,
        fødselsnummer: ownProps.fødselsnummer,
        person: ownProps.person
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentRetningsnummer: () => dispatch(hentRetningsnummere())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonFormContainer);
