import * as React from 'react';
import { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { datoEllerTomString } from '../../../../utils/stringFormatting';
import { createTable } from '../../../../utils/tableUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import EtikettGrå from '../../../../components/EtikettGrå';

interface Props {
    ytelseVedtak: OppfolgingsVedtak[];
}

const TableStyle = styled.div`
    ${theme.table}
`;
const UUOrder = styled.div`
    display: flex;
    flex-direction: column;
    .first {
        order: 1;
    }
    .second {
        order: 2;
        font-weight: bold;
    }
`;

function formaterPeriode(vedtak: OppfolgingsVedtak) {
    return datoEllerTomString(vedtak.aktivFra) + ' - ' + datoEllerTomString(vedtak.aktivTil);
}

function OppfolgingsVedtakTabell(props: Props) {
    const sortertPåDato = props.ytelseVedtak.sort(datoSynkende(vedtak => vedtak.aktivFra));
    const tittelrekke = ['Vedtak', 'Status', 'Aktivitetsfase'];
    const listekomponenter = sortertPåDato.map((vedtak, index) => [
        <UUOrder key={index}>
            <h4 className="second">{vedtak.vedtakstype}</h4>
            <EtikettGrå className="first">{formaterPeriode(vedtak)}</EtikettGrå>
        </UUOrder>,
        vedtak.vedtakstatus,
        vedtak.aktivitetsfase
    ]);

    return (
        <section>
            <Undertittel className="visually-hidden">Vedtak</Undertittel>
            <TableStyle>
                <Normaltekst tag="div">{createTable(tittelrekke, listekomponenter)}</Normaltekst>
            </TableStyle>
        </section>
    );
}

export default OppfolgingsVedtakTabell;
