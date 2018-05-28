import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import { AppState, Reducer } from '../../../redux/reducer';
import { hentKontaktinformasjon, kontaktinformasjonActionNames } from '../../../redux/kontaktinformasjon';
import { Kontaktinformasjon as KontaktinformasjonModel } from '../../../models/kontaktinformasjon';
import Innholdslaster from '../../../components/Innholdslaster';
import Kontaktinformasjon from './Kontaktinformasjon';
import { Person } from '../../../models/person/person';

interface DispatchProps {
    hentKontaktinformasjon: (fødselsnummer: string) => void;
}

interface StateProps {
    kontaktinformasjonReducer: Reducer<KontaktinformasjonModel>;
}

interface OwnProps {
    fødselsnummer: string;
    person: Person;
}

type Props = OwnProps & DispatchProps & StateProps;

interface KontaktinformasjonWrapperProps {
    kontaktinformasjon: KontaktinformasjonModel | undefined;
    person: Person;
}

function KontaktinformasjonWrapper({kontaktinformasjon, person}: KontaktinformasjonWrapperProps) {
    if (!kontaktinformasjon) {
        return <p>Kunne ikke hente kontaktinformasjon</p>;
    } else {
        return <Kontaktinformasjon kontaktinformasjon={kontaktinformasjon} person={person}/>;
    }
}

class KontaktinformasjonFormContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.kontaktinformasjonReducer.status ===  kontaktinformasjonActionNames.INITIALIZED) {
            this.props.hentKontaktinformasjon(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.kontaktinformasjonReducer]}>
                <KontaktinformasjonWrapper
                    kontaktinformasjon={this.props.kontaktinformasjonReducer.data}
                    person={this.props.person}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps & OwnProps => {
    return ({
        kontaktinformasjonReducer: state.kontaktinformasjon,
        fødselsnummer: ownProps.fødselsnummer,
        person: ownProps.person
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentKontaktinformasjon: (fødselsnummer: string) => dispatch(hentKontaktinformasjon(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonFormContainer);
