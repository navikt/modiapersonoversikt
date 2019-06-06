import * as React from 'react';
import { Varsel, Varseltype } from '../../../../models/varsel';
import { datoSynkende, formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Table } from '../../../../utils/table/Table';
import VarselDetaljer from './varselDetaljer/VarselDetaljer';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';
import { useState } from 'react';
import { Collapse } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';

interface Props {
    varsler: Varsel[];
}

const Style = styled.article`
    table {
        width: 100%;
        text-align: left;
        tr {
            display: grid;
            grid-template-columns: 15% 50% 25% 10%;
            grid-template-rows: auto auto;
        }
        td,
        th {
            &:nth-child(1) {
                grid-column: 1 / 2;
            }
            &:nth-child(2) {
                grid-column: 2 / 3;
            }
            &:nth-child(3) {
                grid-column: 3 / 4;
            }
            &:nth-child(4) {
                grid-column: 4 / 5;
                text-align: right;
            }
            &:last-child {
                grid-row: 2 / 3;
                grid-column: 1 / end;
            }
            &:not(:last-child) {
                padding: 0.7rem;
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
    const dato = formatterDatoMedMaanedsnavn(varsel.mottattTidspunkt);
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
            <VarselDetaljer sortertMeldingsliste={sortertMeldingsliste} />
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

    return (
        <Style>
            <VisuallyHiddenAutoFokusHeader tittel="Varsler" />
            <Normaltekst tag={'div'}>
                <Table tittelRekke={tittelRekke} rows={tabellInnhold} />
            </Normaltekst>
        </Style>
    );
}

export default Varsler;
