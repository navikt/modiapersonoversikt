import * as React from 'react';
import { OppfolgingsVedtak } from '../../../../models/oppfolging';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { datoEllerTomString } from '../../../../utils/stringFormatting';
import { datoEllerNull } from '../../../../utils/stringFormatting';
import { createTable } from '../../../../utils/tableUtils';

interface Props {
    ytelseVedtak: OppfolgingsVedtak[];
}

const ListePanelStyle = styled.div`
    border: ${theme.border.skille};
    border-radius: ${theme.borderRadius.layout};
`;

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const ElementStyle = styled.div`
    padding: ${theme.margin.layout};
`;

const HeaderStyle = styled.div`
    background-color: ${theme.color.bakgrunn};
    text-align: center;
    padding: ${theme.margin.layout};
`;

const TableStyle = styled.div`
    table {
        width: 100%;
        text-align: left;
        th,
        td {
            padding: 0.7rem 0;
            &:not(:first-child) {
                padding-left: 1rem;
            }
        }
        td {
            font-weight: bold;
        }
    }
`;

function VedtakElement(props: { vedtak: OppfolgingsVedtak }) {
    const datoInterval = datoEllerTomString(props.vedtak.aktivFra) + ' - ' + datoEllerTomString(props.vedtak.aktivTil);

    const tittelrekke = [datoInterval, 'STATUS', 'AKTIVITETSFASE'];
    let tabellElementer: Array<Array<number | string | undefined>> = [];

    tabellElementer.push([props.vedtak.vedtakstype, props.vedtak.vedtakstatus, props.vedtak.aktivitetsfase]);

    return (
        <ElementStyle>
            <TableStyle>{createTable(tittelrekke, tabellElementer)}</TableStyle>
        </ElementStyle>
    );
}

function OppfolgingsVedtakListe(props: Props) {
    const sortertPåDato = props.ytelseVedtak.sort(datoSynkende(vedtak => vedtak.aktivFra));

    const listekomponenter = sortertPåDato.map(vedtak => <VedtakElement vedtak={vedtak} />);

    return (
        <ListePanelStyle>
            <HeaderStyle>
                <Undertittel>Vedtak</Undertittel>
            </HeaderStyle>
            <ListeStyle>{listekomponenter}</ListeStyle>
        </ListePanelStyle>
    );
}

export default OppfolgingsVedtakListe;
