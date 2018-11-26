import * as React from 'react';
import {
    Dokument as Enkeltdokument,
    DokumentMetadata,
    Entitet,
    KategoriNotat,
    Kommunikasjonsretning
} from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import Dokument from '../../../../svg/Dokument';
import DokumentIkkeTilgangMerket from '../../../../svg/DokumentIkkeTilgangMerket';
import { sakstemakodeAlle } from './SakstemaVisning';
import { AnyAction, Dispatch } from 'redux';
import {
    settVisDokument
} from '../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import { cancelIfHighlighting } from '../../../../utils/functionUtils';
import { AppState } from '../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../models/person/person';
import { isLoaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { settValgtDokument, settValgtEnkeltdokument } from '../../../../redux/saksoversikt/actions';

interface OwnProps {
    dokument: DokumentMetadata;
    harTilgang: boolean;
    sakstemakode: string;
    sakstemanavn: string;
}

interface DispatchProps {
    velgOgVisDokument: (enkeltdokument: Enkeltdokument) => void;
}

interface StateProps {
    bruker: RestReducer<PersonRespons>;
}

type Props = OwnProps & DispatchProps & StateProps;

const Wrapper = styled.div`

`;

const InfoWrapper = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px10};
  display: flex;
  svg {
    padding-right: 1rem;
    height: ${theme.margin.px30};
    width: auto;
  }
  cursor: pointer;
  &:hover {
      background-color: ${theme.color.objektlisteHover};
    }
`;

const VedleggStyle = styled.div`
  margin: 1rem 0;
`;

function tekstBasertPåRetning(brukernavn: string, dokument: DokumentMetadata) {
    switch (dokument.retning) {
        case Kommunikasjonsretning.Inn:
            return dokument.avsender === Entitet.Sluttbruker ? `Fra ${brukernavn}` : `Fra ${dokument.navn}`;
        case Kommunikasjonsretning.Ut:
            return utgåendeTekst(dokument.mottaker, dokument.navn);
        case Kommunikasjonsretning.Intern:
            return dokument.kategoriNotat === KategoriNotat.Forvaltningsnotat ? 'Samtalereferat' : 'Notat';
        default:
            return 'Ukjent kommunikasjonsretning';
    }
}

function utgåendeTekst(mottaker: Entitet, mottakernavn: string) {
    const dokumentmottaker = mottaker === Entitet.Sluttbruker ? '' : `(Sendt til ${mottakernavn})`;
    return `Fra NAV ${dokumentmottaker}`;
}

function formaterDatoOgAvsender(brukernavn: string, dokument: DokumentMetadata) {
    const dato = moment(saksdatoSomDate(dokument.dato)).format('DD.MM.YYYY');
    return `${dato} / ${tekstBasertPåRetning(brukernavn, dokument)}`;
}

function dokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <Dokument/>;
    } else {
        return <DokumentIkkeTilgangMerket/>;
    }
}

class DokumentKomponent extends React.Component<Props> {
    private vedleggLinkRef = React.createRef<HTMLAnchorElement>();
    private hoveddokumentLinkRef = React.createRef<HTMLAnchorElement>();
    private dokumentRef = React.createRef<HTMLDivElement>();

    handleClickOnDokument(event: React.MouseEvent<HTMLElement>) {
        if (!this.hoveddokumentLinkRef.current) {
            return;
        }

        const lenkeTrykket = (event.target instanceof Node)
            && (this.hoveddokumentLinkRef.current.contains(event.target)
                || this.vedleggLinkRef.current && this.vedleggLinkRef.current.contains(event.target));

        if (!lenkeTrykket) {
            this.visDokumentHvisTilgang(this.props.dokument, this.props.dokument.hoveddokument);
        }
    }

    visDokumentHvisTilgang(dokument: DokumentMetadata, enkeltdokument: Enkeltdokument) {
        if (this.props.harTilgang) {
            this.props.velgOgVisDokument(enkeltdokument);
        }
    }

    render() {
        const dokument = this.props.dokument;
        const brukersNavn = isLoaded(this.props.bruker)
            ? (this.props.bruker.data as Person).navn.sammensatt
            : '';

        const saksid = dokument.tilhørendeFagsaksid ? dokument.tilhørendeFagsaksid : dokument.tilhørendeSaksid;
        const saksvisning = this.props.sakstemakode === sakstemakodeAlle ?
            (
                <Normaltekst>Saksid: {saksid} / Sakstema: {this.props.sakstemanavn}</Normaltekst>
            ) :
            (
                <Normaltekst>Saksid: {saksid}</Normaltekst>
            );

        const vedlegg = dokument.vedlegg && dokument.vedlegg.length > 0 ?
            (
                <VedleggStyle>
                    <Normaltekst>Dokumentet har {dokument.vedlegg.length} vedlegg:</Normaltekst>
                    <ul>
                        {dokument.vedlegg.map(vlegg =>
                            <li key={vlegg.dokumentreferanse + dokument.journalpostId}>
                                <a
                                    href={'#'}
                                    onClick={() => this.visDokumentHvisTilgang(dokument, vlegg)}
                                    ref={this.vedleggLinkRef}
                                >
                                    {vlegg.tittel}
                                </a>
                            </li>)}
                    </ul>
                </VedleggStyle>
            ) : null;

        return (
            <>
                <Wrapper
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                        cancelIfHighlighting(() => this.handleClickOnDokument(event))}
                    innerRef={this.dokumentRef}
                >
                    <InfoWrapper>
                        {dokumentIkon(this.props.harTilgang)}
                        <div>
                            <Innholdslaster avhengigheter={[this.props.bruker]}>
                                <Normaltekst>
                                    {formaterDatoOgAvsender(brukersNavn, dokument)}
                                </Normaltekst>
                            </Innholdslaster>
                            <a
                                href={'#'}
                                onClick={() => this.visDokumentHvisTilgang(dokument, dokument.hoveddokument)}
                                ref={this.hoveddokumentLinkRef}
                            >
                                {dokument.hoveddokument.tittel}
                            </a>
                            {vedlegg}
                            {saksvisning}
                        </div>
                    </InfoWrapper>
                </Wrapper>
            </>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
    return {
        velgOgVisDokument: enkeltdokument => {
            dispatch(settValgtDokument(ownProps.dokument));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        bruker: state.restEndepunkter.personinformasjon
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DokumentKomponent);