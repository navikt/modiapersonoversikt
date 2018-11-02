import * as React from 'react';
import {
    Dokument as EnkeltDokument,
    DokumentMetadata as DokumentInterface,
    Entitet
} from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import Dokument from '../../../../svg/Dokument';
import DokumentIkkeTilgangMerket from '../../../../svg/DokumentIkkeTilgangMerket';
import DokumentOgVedlegg from './DokumentOgVedlegg';
import ModalWrapper from 'nav-frontend-modal';

interface Props {
    dokument: DokumentInterface;
    harTilgang: boolean;
}

interface State {
    åpnet: boolean;
    valgtDokument: EnkeltDokument;
}

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

class DokumentKomponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            åpnet: false,
            valgtDokument: this.props.dokument.hoveddokument
        };
        this.skjulModal = this.skjulModal.bind(this);
        this.visModal = this.visModal.bind(this);
        this.velgOgVisDokument = this.velgOgVisDokument.bind(this);
    }

    skjulModal() {
        this.setState({
            åpnet: false
        });
    }

    visModal() {
        const åpnet = !this.state.åpnet;
        this.setState({åpnet: åpnet});
    }

    velgOgVisDokument(dokument: EnkeltDokument) {
        this.setState({
            valgtDokument: dokument,
            åpnet: true
        });
    }

    render() {
        const dokument = this.props.dokument;
        const saksid = dokument.tilhørendeFagsaksid ? dokument.tilhørendeFagsaksid : dokument.tilhørendeSaksid;
        const vedlegg = dokument.vedlegg && dokument.vedlegg.length > 0 ?
            (
                <VedleggStyle>
                    <Normaltekst>Dokumentet har {dokument.vedlegg.length} vedlegg:</Normaltekst>
                    <ul>
                        {dokument.vedlegg.map(vlegg =>
                            <li key={vlegg.dokumentreferanse + dokument.journalpostId}>
                                <a href={'#'} onClick={() => this.velgOgVisDokument(vlegg)}>{vlegg.tittel}</a>
                            </li>)}
                    </ul>
                </VedleggStyle>
            ) : null;

        return (
            <>
                <Wrapper onClick={() => this.visModal()}>
                    <InfoWrapper>
                        {dokumentIkon(this.props.harTilgang)}
                        <div>
                            <Normaltekst>
                                {formaterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}
                            </Normaltekst>
                            <a href={'#'} onClick={() => this.velgOgVisDokument(dokument.hoveddokument)}>
                                {dokument.hoveddokument.tittel}
                            </a>
                            {vedlegg}
                            <Normaltekst>Saksid: {saksid}</Normaltekst>
                        </div>
                    </InfoWrapper>
                </Wrapper>
                {this.state.åpnet &&
                <ModalWrapper
                    isOpen={true}
                    contentLabel="Dokumentvisning"
                    onRequestClose={this.skjulModal}
                >
                    <DokumentOgVedlegg
                        dokument={dokument}
                        harTilgang={this.props.harTilgang}
                        valgtTab={this.state.valgtDokument}
                        onChange={this.velgOgVisDokument}
                    />
                </ModalWrapper>}
            </>
        );
    }
}

export default DokumentKomponent;