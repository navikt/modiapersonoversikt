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

const Style = styled.div`
    border: ${theme.border.skille};
    border-radius: ${theme.borderRadius.layout};
`;

const TableStyle = styled.div`
    padding: ${theme.margin.px20};
    table {
        width: 100%;
        text-align: right;
        th,
        td {
            padding: 0.7rem 0;
            &:not(:first-child) {
                padding-left: 1rem;
            }
        }
        td {
            vertical-align: bottom;
        }
        td:first-child,
        th:first-child {
            text-align: left;
            font-weight: bold;
        }
        thead {
            border-bottom: 0.2rem solid ${theme.color.bakgrunn};
            text-transform: uppercase;
        }
    }
`;
const UUOrder = styled.div`
    display: flex;
    flex-direction: column;
    .first {
        order: 1;
    }
    .second {
        order: 2;
    }
`;

function formaterPeriode(vedtak: OppfolgingsVedtak) {
    return datoEllerTomString(vedtak.aktivFra) + ' - ' + datoEllerTomString(vedtak.aktivTil);
}

function OppfolgingsVedtakListe(props: Props) {
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
        <Style>
            <Undertittel className="visually-hidden">Vedtak</Undertittel>
            <TableStyle>
                <Normaltekst tag="div">{createTable(tittelrekke, listekomponenter)}</Normaltekst>
            </TableStyle>
        </Style>
    );
}

export default OppfolgingsVedtakListe;
