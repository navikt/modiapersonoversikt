import * as React from 'react';
import { Varsel, Varseltype } from '../../../../models/varsel';
import { datoSynkende, formatterDato } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Table } from '../../../../utils/table/Table';
import MeldingsListe from './meldingsliste/MeldingsListe';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';
import { useState } from 'react';
import { Collapse } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';

interface Props {
    varsler: Varsel[];
}

const TableStyle = styled.div`
    table {
        width: 100%;
        text-align: right;
        tr {
            display: grid;
            grid-template-columns: 15% 50% 25% 10%;
            grid-template-rows: auto auto;
        }
        td,
        th {
            &:not(:last-child) {
                padding: 0.7rem;
            }
            &:last-child {
                grid-row: 2 / 3;
                grid-column: 1 / end;
            }
        }
        thead {
            text-transform: uppercase;
            th:nth-child(3) ~ th {
                ${theme.visuallyHidden};
            }
        }
        tbody tr {
            ${theme.hvittPanel};
            margin-bottom: 0.5rem;
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

function lagVarselTabellRow(varsel: Varsel, open: boolean, toggleOpen: () => void) {
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
        <Collapse isOpened={open}>
            <MeldingsListe sortertMeldingsliste={sortertMeldingsliste} />
        </Collapse>
    );

    const visDetaljerKnapp = (
        <VisMerChevron onClick={toggleOpen} open={open} title={(open ? 'Skul' : 'Vis') + ' detaljer'} />
    );

    return [dato, varseltype, kommunikasjonskanaler, visDetaljerKnapp, detaljer];
}

function Varsler(props: Props) {
    const [openVarsler, setOpenVarsler] = useState<Varsel[]>([]);

    const toggleOpenVarsler = (varsel: Varsel) => {
        if (openVarsler.includes(varsel)) {
            setOpenVarsler(openVarsler.filter(it => it != varsel));
        } else {
            setOpenVarsler([...openVarsler, varsel]);
        }
    };

    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));
    const tittelRekke = ['Dato', 'Type', 'Sendt i kanal', 'Vis detaljer', 'Detaljer'].map((text, index) => (
        <Element key={index}>{text}</Element>
    ));
    const tabellInnhold = sortertPåDato.map(varsel =>
        lagVarselTabellRow(varsel, openVarsler.includes(varsel), () => toggleOpenVarsler(varsel))
    );
    const table = <Table tittelRekke={tittelRekke} rows={tabellInnhold} />;

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
