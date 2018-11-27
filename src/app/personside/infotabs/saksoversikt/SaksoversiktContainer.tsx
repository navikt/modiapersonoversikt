import * as React from 'react';
import { isLoaded, isNotStarted, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { hentSaksoversikt, reloadSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import Innholdslaster from '../../../../components/Innholdslaster';
import SakstemaVisning from './SakstemaVisning';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import DokumenterVisning from './DokumenterVisning';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import { lenkeNorg2Frontend } from './norgLenke';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { Person, PersonRespons } from '../../../../models/person/person';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import DokumentOgVedlegg from './DokumentOgVedlegg';
import { settValgtEnkeltdokument, settValgtSakstema } from '../../../../redux/saksoversikt/actions';
import { hentAllPersonData } from '../../../../redux/restReducers/personinformasjon';

export interface AvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

interface State {
    avsenderfilter: AvsenderFilter;
}

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    saksoversiktReducer: RestReducer<SakstemaResponse>;
    personReducer: RestReducer<PersonRespons>;
    visDokument: boolean;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltdokument?: Dokument;
    valgtSakstema?: Sakstema;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentSaksoversikt: (fødselsnummer: string) => void;
    reloadSaksoversikt: (fødselsnummer: string) => void;
    setEnkeltdokument: (enkeltdokument: Dokument) => void;
    setSakstema: (sakstema: Sakstema) => void;
    hentPerson: (fødselsnummer: string) => void;
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
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.saksoversiktReducer)) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.personReducer)) {
            this.props.hentPerson(this.props.fødselsnummer);
        }
    }

    oppdaterSakstema(sakstema: Sakstema) {
        this.props.setSakstema(sakstema);
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
        const norgUrl =
            (isLoaded(this.props.baseUrlReducer)
                && isLoaded(this.props.personReducer))
                ? lenkeNorg2Frontend(
                this.props.baseUrlReducer.data,
                (this.props.personReducer.data as Person).geografiskTilknytning,
                this.props.valgtSakstema)
                : '';

        if (this.props.visDokument && this.props.valgtDokument) {
            return (
                <DokumentOgVedlegg
                    harTilgang={true}
                    onChange={this.props.setEnkeltdokument}
                />
            );
        } else {
            return (
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
                                    sakstemaResponse={(this.props.saksoversiktReducer as Loaded<SakstemaResponse>).data}
                                    oppdaterSakstema={this.oppdaterSakstema}
                                />
                            </SakstemaListe>
                        </div>
                        <DokumentListe>
                            <span ref={this.dokumentListeRef} tabIndex={-1}/>
                            <DokumenterVisning
                                sakstema={this.props.valgtSakstema}
                                avsenderFilter={this.state.avsenderfilter}
                                toggleFilter={this.toggleAvsenderFilter}
                            />
                        </DokumentListe>
                    </Innholdslaster>
                </SaksoversiktArticle>
            );
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer,
        personReducer: state.restEndepunkter.personinformasjon,
        visDokument: state.saksoversikt.visDokument,
        valgtDokument: state.saksoversikt.valgtDokument,
        valgtEnkeltdokument: state.saksoversikt.valgtEnkeltdokument,
        valgtSakstema: state.saksoversikt.valgtSakstema
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () =>
            dispatch(hentBaseUrls()),
        hentSaksoversikt: (fødselsnummer: string) =>
            dispatch(hentSaksoversikt(fødselsnummer)),
        reloadSaksoversikt: (fødselsnummer: string) =>
            dispatch(reloadSaksoversikt(fødselsnummer)),
        setEnkeltdokument: (enkeltdokument: Dokument) =>
            dispatch(settValgtEnkeltdokument(enkeltdokument)),
        hentPerson: fødselsnummer =>
            hentAllPersonData(dispatch, fødselsnummer),
        setSakstema: (sakstema: Sakstema) =>
            dispatch(settValgtSakstema(sakstema))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaksoversiktContainer);
