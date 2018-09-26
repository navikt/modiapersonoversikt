import * as React from 'react';
import { DokumentMetadata as DokumentInterface, Entitet } from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';
import { UnmountClosed } from 'react-collapse';
import { getSaksdokument } from '../../../../utils/url-utils';

interface Props {
    dokument: DokumentInterface;
}

interface State {
    åpnet: boolean;
}

const Wrapper = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px10};
  cursor: pointer;
`;

function formatterEntitet(fra: Entitet) {
    if (fra === Entitet.Nav) {
        return 'NAV';
    }
    if (fra === Entitet.Sluttbruker) {
        return 'bruker';
    }
    return 'andre';
}

function formatterDatoOgAvsender(date: Date, fra: Entitet) {
    return `${moment(date).format('DD.MM.YYYY')} / Fra ${formatterEntitet(fra)}`;
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
            <Wrapper onClick={() => this.toggle()}>
                <Undertekst>{formatterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}</Undertekst>
                <UndertekstBold>{dokument.navn}</UndertekstBold>
                <Undertekst>Saksid: {saksid}</Undertekst>
                <UnmountClosed isOpened={this.state.åpnet}>
                    <object data={dokUrl} width={'100%'} height={'500px'}/>
                </UnmountClosed>
            </Wrapper>
        );
    }
}

export default DokumentKomponent;