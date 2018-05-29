import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import { AppState, Reducer } from '../../../redux/reducer';
import { hentKontaktinformasjon, kontaktinformasjonActionNames } from '../../../redux/kontaktinformasjon';
import { Kontaktinformasjon as KontaktinformasjonModel } from '../../../models/kontaktinformasjon';
import Innholdslaster from '../../../components/Innholdslaster';
import Kontaktinformasjon from './Kontaktinformasjon';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import { hentRetningsnummere, retningsnummerActionNames } from '../../../redux/kodeverk/retningsnummereReducer';

interface DispatchProps {
    hentKontaktinformasjon: (fødselsnummer: string) => void;
    hentRetningsnummer: () => void;
}

interface StateProps {
    kontaktinformasjonReducer: Reducer<KontaktinformasjonModel>;
    retningsnummerReducer: Reducer<KodeverkResponse>;
}

interface OwnProps {
    fødselsnummer: string;
    person: Person;
}

type Props = OwnProps & DispatchProps & StateProps;

interface KontaktinformasjonWrapperProps {
    kontaktinformasjon: KontaktinformasjonModel | undefined;
    retningsnummerKodeverk: KodeverkResponse | undefined;
    person: Person;
}

function KontaktinformasjonWrapper({kontaktinformasjon, person, retningsnummerKodeverk}:
                                       KontaktinformasjonWrapperProps) {
    if (!kontaktinformasjon || !retningsnummerKodeverk) {
        return <p>Kunne ikke hente kontaktinformasjon</p>;
    } else {
        return (
            <Kontaktinformasjon
                kontaktinformasjon={kontaktinformasjon}
                person={person}
                retningsnummerKodeverk={retningsnummerKodeverk}
            />
        );
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
        if (this.props.retningsnummerReducer.status ===  retningsnummerActionNames.INITIALIZED) {
            this.props.hentRetningsnummer();
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.kontaktinformasjonReducer, this.props.retningsnummerReducer]}>
                <KontaktinformasjonWrapper
                    kontaktinformasjon={this.props.kontaktinformasjonReducer.data}
                    retningsnummerKodeverk={this.props.retningsnummerReducer.data}
                    person={this.props.person}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps & OwnProps => {
    return ({
        kontaktinformasjonReducer: state.kontaktinformasjon,
        retningsnummerReducer: state.retningsnummerReducer,
        fødselsnummer: ownProps.fødselsnummer,
        person: ownProps.person
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentKontaktinformasjon: (fødselsnummer: string) => dispatch(hentKontaktinformasjon(fødselsnummer)),
        hentRetningsnummer: () => dispatch(hentRetningsnummere())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (KontaktinformasjonFormContainer);
