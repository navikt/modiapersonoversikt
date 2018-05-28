import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Action } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';

import { paths } from '../routes/routing';
import BrukerprofilForm from './BrukerprofilForm';
import { connect, Dispatch } from 'react-redux';
import { AppState, Reducer } from '../../redux/reducer';
import { Person, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import { hentPerson, personinformasjonActionNames } from '../../redux/personinformasjon';

const BrukerprofilWrapper = styled.div`
  margin-top: 2em;
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const LinkWrapper = styled.div`
  display: flex;
`;

interface RoutingProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPersonData: (fødselsnummer: string) => void;
}

interface Props {
    fødselsnummer: string;
    personReducer: Reducer<PersonRespons>;
}

type props = RouteComponentProps<RoutingProps> & Props & DispatchProps ;

class BrukerprofilSide extends React.Component<props> {

    componentDidMount() {
        if (this.props.personReducer.status === personinformasjonActionNames.INITIALIZED) {
            this.props.hentPersonData(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <BrukerprofilWrapper>
                <Innholdslaster avhengigheter={[this.props.personReducer]}>
                    <>
                        <LinkWrapper>
                            <Filler/>
                            <Link
                                className={'lenke'}
                                to={`${paths.personUri}/${this.props.fødselsnummer}`}
                            >
                                Tilbake
                            </Link>
                        </LinkWrapper>
                        <BrukerprofilForm person={this.props.personReducer.data as Person}/>
                    </>
                </Innholdslaster>
            </BrukerprofilWrapper>
        );
    }

}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RoutingProps>): Props => {
    return ({
        fødselsnummer: ownProps.match.params.fodselsnummer,
        personReducer: state.personinformasjon
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPersonData: (fødselsnummer: string) => dispatch(hentPerson(fødselsnummer, dispatch))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (BrukerprofilSide));