import * as React from 'react';
import { isLoaded, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaWrapper } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { hentSaksoversikt, reloadSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import Innholdslaster from '../../../../components/Innholdslaster';
import { STATUS } from '../../../../redux/restReducers/utils';
import SakstemaVisning from './SakstemaVisning';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import DokumenterVisning from './DokumenterVisning';
import { ThunkDispatch } from 'redux-thunk';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import { lenkeNorg2Frontend } from './norgLenke';

export interface AvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

interface State {
    valgtSakstema?: Sakstema;
    avsenderfilter: AvsenderFilter;
}

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    saksoversiktReducer: RestReducer<SakstemaWrapper>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
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

const SakstemaListe = styled.section`
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
  min-width: 24rem;
  flex-basis: 24rem;
`;

const DokumentListe = styled.section`
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
  position: relative;
  flex-grow: 1;
  @media not all and (max-width: ${saksoversiktMediaTreshold}) {
      margin-left: ${theme.margin.layout};
  }
`;

class SaksoversiktContainer extends React.Component<Props, State> {

    private dokumentListeRef = React.createRef<HTMLHeadingElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            valgtSakstema: undefined,
            avsenderfilter: {
                fraBruker: true,
                fraNav: true,
                fraAndre: true
            }
        };
        this.oppdaterSakstema = this.oppdaterSakstema.bind(this);
        this.toggleAvsenderFilter = this.toggleAvsenderFilter.bind(this);
    }

    componentDidMount() {
        if (this.props.baseUrlReducer.status === STATUS.NOT_STARTED) {
            this.props.hentBaseUrls();
        }
        if (this.props.saksoversiktReducer.status === STATUS.NOT_STARTED) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
    }

    oppdaterSakstema(sakstema: Sakstema) {
        this.setState({valgtSakstema: sakstema});
        if (this.dokumentListeRef.current) {
            this.dokumentListeRef.current.focus();
        }
    }

    toggleAvsenderFilter(key: keyof AvsenderFilter) {
        this.setState({
            avsenderfilter: {
                ...this.state.avsenderfilter,
                [key]: !this.state.avsenderfilter[key]
            }
        });
    }

    render() {
        const norgUrl =  isLoaded(this.props.baseUrlReducer)
            ? lenkeNorg2Frontend(this.props.baseUrlReducer.data, this.state.valgtSakstema)
            : '';
        return (
            <ErrorBoundary>
                <SaksoversiktArticle>
                    <Innholdstittel className="visually-hidden">Brukerens saker</Innholdstittel>
                    <Innholdslaster avhengigheter={[this.props.saksoversiktReducer, this.props.baseUrlReducer]}>
                        <div>
                            <LenkepanelPersonoversikt
                                url={norgUrl}
                            >
                                Oversikt over enheter og tema
                            </LenkepanelPersonoversikt>
                            <SakstemaListe>
                                <SakstemaVisning
                                    sakstemaWrapper={(this.props.saksoversiktReducer as Loaded<SakstemaWrapper>).data}
                                    oppdaterSakstema={this.oppdaterSakstema}
                                    valgtSakstema={this.state.valgtSakstema}
                                />
                            </SakstemaListe>
                        </div>
                        <DokumentListe>
                            <h1 ref={this.dokumentListeRef} tabIndex={-1}/>
                            <DokumenterVisning
                                sakstema={this.state.valgtSakstema}
                                avsenderFilter={this.state.avsenderfilter}
                                toggleFilter={this.toggleAvsenderFilter}
                            />
                        </DokumentListe>
                    </Innholdslaster>
                </SaksoversiktArticle>
            </ErrorBoundary>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer
    });
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, AnyAction>): DispatchProps {
    return {
        hentBaseUrls: () =>
            dispatch(hentBaseUrls()),
        hentSaksoversikt: (fødselsnummer: string) =>
            dispatch(hentSaksoversikt(fødselsnummer)),
        reloadSaksoversikt: (fødselsnummer: string) =>
            dispatch(reloadSaksoversikt(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaksoversiktContainer);