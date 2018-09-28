import * as React from 'react';
import { DokumentMetadata as DokumentInterface, Entitet } from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { UnmountClosed } from 'react-collapse';
import { getSaksdokument } from '../../../../utils/url-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';

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

const BoxShadow = styled.div`
  margin-top: 2rem;
  box-shadow: 0 0 2rem #888;
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
                <Normaltekst>
                    {formatterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}
                </Normaltekst>
                <Element>{dokument.navn}</Element>
                <Normaltekst>Saksid: {saksid}</Normaltekst>
                <UnmountClosed isOpened={this.state.åpnet}>
                    <BoxShadow>
                        <object data={dokUrl} width={'100%'} height={'500px'}/>
                    </BoxShadow>
                </UnmountClosed>
            </Wrapper>
        );
    }
}

export default DokumentKomponent;