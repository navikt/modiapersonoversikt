import * as React from 'react';
import { DokumentMetadata as DokumentInterface, Entitet } from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { getSaksdokument } from '../../../../utils/url-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Dokument from '../../../../svg/Dokument';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import DokumentIkkeTilgangMerket from '../../../../svg/DokumentIkkeTilgangMerket';
import ModalWrapper from 'nav-frontend-modal';

interface Props {
    dokument: DokumentInterface;
    harTilgang: boolean;
}

interface State {
    åpnet: boolean;
}

const Wrapper = styled<{ åpen: boolean }, 'div'>('div')`
  ${props => props.åpen && 'background-color: rgba(0, 0, 0, 0.03);'}
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
`;

const EmbedWrapper = styled.div`
  padding: 1rem;
  height: 90vh;
  width: 90vw;
  object {
    box-shadow: 0 0 2rem #888;
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

function visDokument(harTilgang: boolean, url: string) {
    if (harTilgang) {
        return <object data={url} width={'100%'} height={'500px'}/>;
    } else {
        return <AlertStripeAdvarsel>Du har ikke tilgang til dokument.</AlertStripeAdvarsel>;
    }
}

function visVedlegg(dokument: DokumentInterface) {
    if (dokument.vedlegg && dokument.vedlegg.length > 0) {
        const vedlegg = dokument.vedlegg.map((v) =>
            <li key={v.tittel}><Normaltekst>{v.tittel}</Normaltekst></li>);
        return (
            <VedleggStyle>
                <Normaltekst>Dokumentet har {dokument.vedlegg.length} vedlegg:</Normaltekst>
                <ul>
                    {vedlegg}
                </ul>
            </VedleggStyle>
        );
    } else {
        return null;
    }
}

class DokumentKomponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            åpnet: false
        };
    }

    toggle() {
        const åpnet = !this.state.åpnet;
        this.setState({åpnet: åpnet});
    }

    render() {
        const dokument = this.props.dokument;
        const saksid = dokument.tilhørendeFagsaksid ? dokument.tilhørendeFagsaksid : dokument.tilhørendeSaksid;
        const dokUrl = getSaksdokument(dokument.journalpostId, dokument.hoveddokument.dokumentreferanse);

        return (
            <Wrapper åpen={this.state.åpnet} onClick={() => this.toggle()}>
                <InfoWrapper>
                    {dokumentIkon(this.props.harTilgang)}
                    <div>
                        <Normaltekst>
                            {formaterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}
                        </Normaltekst>
                        <Element>{dokument.hoveddokument.tittel}</Element>
                        {visVedlegg(dokument)}
                        <Normaltekst>Saksid: {saksid}</Normaltekst>
                    </div>
                </InfoWrapper>
                <ModalWrapper
                    isOpen={this.state.åpnet}
                    contentLabel="Hei"
                    onRequestClose={() => this.setState({åpnet: false})}
                >
                    <EmbedWrapper>
                        {visDokument(this.props.harTilgang, dokUrl)}
                    </EmbedWrapper>
                </ModalWrapper>
            </Wrapper>
        );
    }
}

export default DokumentKomponent;