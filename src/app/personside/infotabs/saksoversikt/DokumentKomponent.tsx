import * as React from 'react';
import {
    Dokument as Enkeltdokument,
    DokumentMetadata,
    Entitet
} from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import Dokument from '../../../../svg/Dokument';
import DokumentIkkeTilgangMerket from '../../../../svg/DokumentIkkeTilgangMerket';
import { sakstemakodeAlle } from './SakstemaVisning';
import { Dispatch } from 'redux';
import {
    settValgtDokument,
    settValgtEnkeltdokument,
    settVisDokument
} from '../../../../redux/saksoversikt/saksoversiktStateReducer';
import { connect } from 'react-redux';
import { cancelIfHighlighting } from '../../../../utils/functionUtils';

interface OwnProps {
    dokument: DokumentMetadata;
    harTilgang: boolean;
    sakstemakode: string;
    sakstemanavn: string;
}

interface DispatchProps {
    velgOgVisDokument: (dokument: DokumentMetadata, enkeltdokument: Enkeltdokument) => void;
}

type Props = OwnProps & DispatchProps;

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

function formaterEntitet(fra: Entitet) {
    if (fra === Entitet.Nav) {
        return 'NAV';
    }
    if (fra === Entitet.Sluttbruker) {
        return 'bruker';
    }
    return 'andre';
}

function formaterDatoOgAvsender(date: Date, fra: Entitet) {
    return `${moment(date).format('DD.MM.YYYY')} / Fra ${formaterEntitet(fra)}`;
}

function dokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <Dokument/>;
    } else {
        return <DokumentIkkeTilgangMerket/>;
    }
}

class DokumentKomponent extends React.Component<Props> {
    private vedleggLinkRef = React.createRef<HTMLElement>();
    private hoveddokumentLinkRef = React.createRef<HTMLElement>();
    private dokumentRef = React.createRef<HTMLDivElement>();

    handleClickOnDokument(event: React.MouseEvent<HTMLElement>) {
        if (!this.hoveddokumentLinkRef.current || !this.vedleggLinkRef.current) {
            return;
        }

        const lenkeTrykket = (event.target instanceof Node)
            && (this.hoveddokumentLinkRef.current.contains(event.target)
                || this.vedleggLinkRef.current.contains(event.target));

        if (!lenkeTrykket) {
            this.props.velgOgVisDokument(this.props.dokument, this.props.dokument.hoveddokument);
        }
    }

    render() {
        const dokument = this.props.dokument;
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
                                <span ref={this.vedleggLinkRef}>
                                    <a href={'#'} onClick={() => this.props.velgOgVisDokument(dokument, vlegg)}>
                                        {vlegg.tittel}
                                    </a>
                                </span>
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
                            <Normaltekst>
                                {formaterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}
                            </Normaltekst>
                            <span ref={this.hoveddokumentLinkRef}>
                                <a
                                    href={'#'}
                                    onClick={() => this.props.velgOgVisDokument(dokument, dokument.hoveddokument)}
                                >
                                    {dokument.hoveddokument.tittel}
                                </a>
                            </span>
                            {vedlegg}
                            <Normaltekst>{saksvisning}</Normaltekst>
                        </div>
                    </InfoWrapper>
                </Wrapper>
            </>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        velgOgVisDokument: (dokument, enkeltdokument) => {
            dispatch(settValgtDokument(dokument));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

export default connect(null, mapDispatchToProps)(DokumentKomponent);