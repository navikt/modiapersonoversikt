import * as React from 'react';
import { RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaWrapper } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AppState } from '../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentSaksoversikt, reloadSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import DokumenterVisning from './DokumenterVisning';
import SakstemaVisning from './SakstemaVisning';

interface State {
    valgtSakstema?: Sakstema;
}

interface StateProps {
    saksoversiktReducer: RestReducer<SakstemaWrapper>;
}

interface DispatchProps {
    hentSaksoversikt: (fødselsnummer: string) => void;
    reloadSaksoversikt: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export const saksoversiktMediaTreshold = '80rem';

const SaksoversiktArticle = styled.article`
  display: flex;
  align-items: flex-start;
  @media(max-width: ${saksoversiktMediaTreshold}) {
    display: block;
  }
  .visually-hidden {
    ${theme.visuallyHidden}
  }
  > * {
    margin-bottom: ${theme.margin.layout};
  }
`;

const SakstemaSection = styled.section`
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
  min-width: 18rem;
  flex-basis: 18rem;
`;

const SakSection = styled.section`
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
  position: relative;
  flex-grow: 1;
  @media not all and (max-width: ${saksoversiktMediaTreshold}) {
      margin-left: ${theme.margin.layout};
  }
`;

class SaksoversiktContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            valgtSakstema: undefined
        };
        this.oppdaterSakstema = this.oppdaterSakstema.bind(this);
    }

    componentDidMount() {
        if (this.props.saksoversiktReducer.status === STATUS.NOT_STARTED) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
    }

    oppdaterSakstema(sakstema: Sakstema) {
        this.setState({valgtSakstema: sakstema });
    }

    render() {
        return (
            <ErrorBoundary>
                <SaksoversiktArticle>
                    <Innholdstittel className="visually-hidden">Brukerens saker</Innholdstittel>
                    <SakstemaSection>
                        <Innholdslaster avhengigheter={[this.props.saksoversiktReducer]}>
                            <SakstemaVisning
                                sakstema={this.props.saksoversiktReducer.data.resultat}
                                oppdaterSakstema={this.oppdaterSakstema}
                            />
                        </Innholdslaster>
                    </SakstemaSection>
                    <SakSection>
                        <DokumenterVisning sakstema={this.state.valgtSakstema}/>
                    </SakSection>
                </SaksoversiktArticle>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
          saksoversiktReducer: state.restEndepunkter.saksoversiktReducer
        });
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentSaksoversikt: (fødselsnummer: string) =>
            dispatch(hentSaksoversikt(fødselsnummer)),
        reloadSaksoversikt: (fødselsnummer: string) =>
            dispatch(reloadSaksoversikt(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaksoversiktContainer);