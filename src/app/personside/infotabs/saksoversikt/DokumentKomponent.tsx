import * as React from 'react';
import { DokumentMetadata as DokumentInterface, Entitet } from '../../../../models/saksoversikt/dokumentmetadata';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

interface Props {
    dokument: DokumentInterface;
}

const Wrapper = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px10};
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

function DokumentKomponent(props: Props) {
    const dokument = props.dokument;
    const saksid = dokument.tilhørendeFagsaksid ? dokument.tilhørendeFagsaksid : dokument.tilhørendeSaksid;
    return (
        <Wrapper>
            <Undertekst>{formatterDatoOgAvsender(saksdatoSomDate(dokument.dato), dokument.avsender)}</Undertekst>
            <UndertekstBold>{dokument.navn}</UndertekstBold>
            <Undertekst>Saksid: {saksid}</Undertekst>
        </Wrapper>
    );
}

export default DokumentKomponent;