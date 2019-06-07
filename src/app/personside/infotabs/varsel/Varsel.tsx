import * as React from 'react';
import { useState } from 'react';
import { Varsel as VarselModell, Varseltype } from '../../../../models/varsel';
import { datoSynkende, formatterDatoMedMaanedsnavn } from '../../../../utils/dateUtils';
import { Bold } from '../../../../components/common-styled-components';
import VarselDetaljer from './varselDetaljer/VarselDetaljer';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';

const Style = styled.li`
    ${theme.hvittPanel};
`;

const HeaderStyle = styled.div`
    display: grid;
    grid-template-columns: 20% 55% 1fr auto;
    align-items: center;
    border-radius: ${theme.borderRadius.layout};
    cursor: pointer;
    &:hover {
        ${theme.hover}
    }
    > * {
        padding: 0.7rem;
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

function Varsel({ varsel }: { varsel: VarselModell }) {
    const [open, setOpen] = useState(false);
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende(melding => melding.utsendingsTidspunkt));

    const toggleOpen = () => setOpen(!open);

    const distinkteKommunikasjonsKanaler = new Set(sortertMeldingsliste.map(melding => melding.kanal));
    const kommunikasjonskanaler = (
        <Kommaliste>
            {Array.from(distinkteKommunikasjonsKanaler).map(kanal => (
                <Normaltekst tag="li" key={kanal}>
                    {kanal}
                </Normaltekst>
            ))}
        </Kommaliste>
    );

    return (
        <Style>
            <HeaderStyle onClick={toggleOpen}>
                <Normaltekst>{formatterDatoMedMaanedsnavn(varsel.mottattTidspunkt)}</Normaltekst>
                <Normaltekst>
                    <Bold>{Varseltype[varsel.varselType]}</Bold>
                </Normaltekst>
                {kommunikasjonskanaler}
                <VisMerChevron onClick={toggleOpen} open={open} title={(open ? 'Skul' : 'Vis') + ' detaljer'} />
            </HeaderStyle>
            <UnmountClosed isOpened={open}>
                <VarselDetaljer sortertMeldingsliste={sortertMeldingsliste} />
            </UnmountClosed>
        </Style>
    );
}

export default Varsel;
