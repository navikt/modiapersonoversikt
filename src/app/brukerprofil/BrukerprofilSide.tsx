import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Action } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import { paths } from '../routes/routing';
import BrukerprofilForm from './BrukerprofilForm';
import { AppState, Reducer } from '../../redux/reducer';
import { Person, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import { hentPerson, personinformasjonActionNames } from '../../redux/personinformasjon';
import { VeilederRoller } from '../../models/veilederRoller';
import { getVeilederRoller, veilederRollerReducerActionNames } from '../../redux/veilederRoller';

const BrukerprofilWrapper = styled.div`
  margin: 2em auto 5em;
  max-width: 640px;
  width: 100%;
`;

const LinkWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

interface RoutingProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPersonData: (fødselsnummer: string) => void;
    hentVeilederRoller: () => void;
}

interface Props {
    fødselsnummer: string;
    personReducer: Reducer<PersonRespons>;
    veilederRollerReducer: Reducer<VeilederRoller>;
}

type props = RouteComponentProps<RoutingProps> & Props & DispatchProps ;

class BrukerprofilSide extends React.Component<props> {

    componentDidMount() {
        if (this.props.personReducer.status === personinformasjonActionNames.INITIALIZED) {
            this.props.hentPersonData(this.props.fødselsnummer);
        }

        if (this.props.veilederRollerReducer.status === veilederRollerReducerActionNames.INITIALIZED) {
            this.props.hentVeilederRoller();
        }
    }

    render() {
        return (
            <BrukerprofilWrapper>
                <Innholdslaster avhengigheter={[this.props.personReducer, this.props.veilederRollerReducer]}>
                    <LinkWrapper>
                        <Link
                            className={'lenke'}
                            to={`${paths.personUri}/${this.props.fødselsnummer}`}
                        >
                            {'<'} Tilbake
                        </Link>
                    </LinkWrapper>
                    <BrukerprofilForm
                        person={this.props.personReducer.data as Person}
                        veilderRoller={this.props.veilederRollerReducer.data}
                    />
                </Innholdslaster>
            </BrukerprofilWrapper>
        );
    }

}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RoutingProps>): Props => {
    return ({
        fødselsnummer: ownProps.match.params.fodselsnummer,
        personReducer: state.personinformasjon,
        veilederRollerReducer: state.veilederRoller
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPersonData: (fødselsnummer: string) => dispatch(hentPerson(fødselsnummer, dispatch)),
        hentVeilederRoller: () => dispatch(getVeilederRoller())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrukerprofilSide));
