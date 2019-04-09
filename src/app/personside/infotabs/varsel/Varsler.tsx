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

interface Props {
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

const Kommaliste = styled.ul`
    li {
        display: inline-block;
    }
    li:not(:last-child) {
        &:after {
            content: ',';
            margin-right: 0.5em;
        }
    }
`;

function lagVarselTabellRow(varsel: Varsel) {
    const [åpen, setÅpen] = useState(false);
    const dato = formatterDato(varsel.mottattTidspunkt);
    const varseltype = <Bold>{Varseltype[varsel.varselType]}</Bold>;
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende(melding => melding.utsendingsTidspunkt));
    const distinkteKommunikasjonsKanaler = new Set(sortertMeldingsliste.map(melding => melding.kanal));
    const kommunikasjonskanaler = (
        <Kommaliste>
            {Array.from(distinkteKommunikasjonsKanaler).map(kanal => (
                <li key={kanal}>{kanal}</li>
            ))}
        </Kommaliste>
    );
    const detaljer = (
        <Ekspanderbartpanel
            tittelProps="element"
            tittel={!åpen ? 'Vis detaljer' : 'Skjul Detaljer'}
            apen={åpen}
            onClick={() => setÅpen(!åpen)}
        >
            <MeldingsListe sortertMeldingsliste={sortertMeldingsliste} />
        </Ekspanderbartpanel>
    );
    return [dato, varseltype, kommunikasjonskanaler, detaljer];
}

function Varsler(props: Props) {
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));
    const tittelRekke = ['Dato', 'Type', 'Sendt i kanal', 'Detaljer'].map((text, index) => (
        <Element key={index}>{text}</Element>
    ));
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
