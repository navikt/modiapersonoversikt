import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Action } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import { paths } from '../routes/routing';
import BrukerprofilForm from './BrukerprofilForm';
import { AppState } from '../../redux/reducers';
import { Person, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import { hentAllPersonData } from '../../redux/restReducers/personinformasjon';
import { VeilederRoller } from '../../models/veilederRoller';
import { getVeilederRoller } from '../../redux/restReducers/veilederRoller';
import { STATUS } from '../../redux/restReducers/utils';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';
import { RestReducer } from '../../redux/restReducers/restReducer';

const BrukerprofilWrapper = styled.section`
  flex-grow: 1;
  margin: 2em auto 3em;
  max-width: 720px;
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  animation: ${props => props.theme.animation.fadeIn};
  > *:not(:first-child):not(:nth-child(2)) {
    background-color: white;
    border-radius: ${props => props.theme.borderRadius.layout};
    margin: 1em 0;
    padding: 2em;
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: 1em;
`;

interface RoutingProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPersonData: (fødselsnummer: string) => void;
    hentVeilederRoller: () => void;
}

interface OwnProps {
    fødselsnummer: string;
    personReducer: RestReducer<PersonRespons>;
    veilederRollerReducer: RestReducer<VeilederRoller>;
}

type Props = RouteComponentProps<RoutingProps> & OwnProps & DispatchProps ;

class BrukerprofilSide extends React.Component<Props> {

    componentDidMount() {
        if (this.props.personReducer.status === STATUS.NOT_STARTED) {
            this.props.hentPersonData(this.props.fødselsnummer);
        }

        if (this.props.veilederRollerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentVeilederRoller();
        }
    }

    render() {
        return (
            <BrukerprofilWrapper>
                <Innholdslaster
                    avhengigheter={[this.props.personReducer, this.props.veilederRollerReducer]}
                >
                    <LinkWrapper>
                        <Link
                            className={'lenke'}
                            to={`${paths.personUri}/${this.props.fødselsnummer}`}
                        >
                            {'<'} Tilbake
                        </Link>
                    </LinkWrapper>
                    <Sidetittel>Endre brukerprofil</Sidetittel>
                    <BrukerprofilForm
                        person={this.props.personReducer.data as Person}
                        veilderRoller={this.props.veilederRollerReducer.data}
                    />
                </Innholdslaster>
            </BrukerprofilWrapper>
        );
    }

}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RoutingProps>): OwnProps => {
    return ({
        fødselsnummer: ownProps.match.params.fodselsnummer,
        personReducer: state.restEndepunkter.personinformasjon,
        veilederRollerReducer: state.restEndepunkter.veilederRoller
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPersonData: (fødselsnummer: string) => hentAllPersonData(dispatch, fødselsnummer),
        hentVeilederRoller: () => dispatch(getVeilederRoller())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrukerprofilSide));
