import * as React from 'react';
import { useState } from 'react';
import { Varsel, Varseltype } from '../../../../models/varsel';
import { datoSynkende, formatterDato } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { createTable } from '../../../../utils/tableUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import MeldingsListe from './meldingsliste/MeldingsListe';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';

interface VisningProps {
    varsler: Varsel[];
}

const TableStyle = styled.div`
    table {
        width: 100%;
        text-align: right;
        thead {
            text-transform: uppercase;
            th {
                margin-bottom: 0.5rem;
            }
            th:nth-child(3) ~ th {
                ${theme.visuallyHidden};
            }
        }
        tbody tr {
            ${theme.hvittPanel};
            margin-bottom: 0.5rem;
            display: block;
            td {
                &:last-child {
                    width: 100%;
                }
            }
        }
        th,
        td {
            display: inline-block;
            &:not(:last-child) {
                vertical-align: bottom;
                padding: 1rem 1rem 0;
            }
            &:first-child {
                text-align: left;
                width: 20%;
            }
            &:nth-child(2) {
                width: 50%;
            }
            &:nth-child(3) {
                width: 30%;
            }
        }
    }
`;

function lagVarselTabellRow(varsel: Varsel) {
    const [åpen, setÅpen] = useState(false);
    const dato = formatterDato(varsel.mottattTidspunkt);
    const varseltype = <Bold>{Varseltype[varsel.varselType]}</Bold>;
    const distinkteKommunikasjonsKanaler = Array.from(new Set(varsel.meldingListe.map(melding => melding.kanal))).join(
        ', '
    );
    const detaljer = (
        <Ekspanderbartpanel
            tittelProps="element"
            tittel={!åpen ? 'Vis detaljer' : 'Skjul Detaljer'}
            apen={åpen}
            onClick={() => setÅpen(!åpen)}
        >
            <MeldingsListe meldingsliste={varsel.meldingListe} />
        </Ekspanderbartpanel>
    );
    return [dato, varseltype, distinkteKommunikasjonsKanaler, detaljer];
}

function Varsler(props: VisningProps) {
    const tittelRekke = ['Dato', 'Type', 'Sendt i kanal', 'Detaljer'].map((text, index) => (
        <Element key={index}>{text}</Element>
    ));
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));
    const tabellInnhold = sortertPåDato.map(varsel => lagVarselTabellRow(varsel));
    const table = createTable(tittelRekke, tabellInnhold);

    return (
        <article>
            <VisuallyHiddenAutoFokusHeader tittel="Varsler" />
            <Normaltekst tag={'div'}>
                <TableStyle>{table}</TableStyle>
            </Normaltekst>
        </article>
    );
}

export default Varsler;
