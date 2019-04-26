import * as React from 'react';
import { SyfoPunkt } from '../../../../models/oppfolging';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { datoSynkende, formatterDato } from '../../../../utils/dateUtils';
import { createTable } from '../../../../utils/tableUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    syfoPunkter: SyfoPunkt[];
}

const TableStyle = styled.div`
    border-top: ${theme.border.skille};
    ${theme.table}
`;

function SykefravarsoppfolgingTabell(props: { syfoPunkter: SyfoPunkt[] }) {
    const sortertPåDato = props.syfoPunkter.sort(datoSynkende(syfoPunkt => syfoPunkt.dato));

    const tableHeaders = ['Innen', 'Hendelse', 'Status'];
    const tableRows = sortertPåDato.map((syfopunkt, index) => [
        formatterDato(syfopunkt.dato),
        syfopunkt.syfoHendelse,
        syfopunkt.status
    ]);

    return (
        <TableStyle>
            <Normaltekst tag="div">{createTable(tableHeaders, tableRows)}</Normaltekst>
        </TableStyle>
    );
}

function SykefravarsoppfolgingEkspanderbartPanel(props: Props) {
    if (props.syfoPunkter.length === 0) {
        return <AlertStripeInfo>Det finnes ikke oppfølgingsinformasjon om bruker i Arena</AlertStripeInfo>;
    }

    return (
        <EkspanderbartYtelserPanel tittel="Sykefraværsoppfølging">
            <SykefravarsoppfolgingTabell syfoPunkter={props.syfoPunkter} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykefravarsoppfolgingEkspanderbartPanel;
