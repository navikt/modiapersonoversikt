import * as React from 'react';
import { Varsel, Varseltype } from '../../../../models/varsel';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import MeldingsListeKomponent from './MeldingsListeKomponent';

interface Props {
    varsel: Varsel;
}

const TittelStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    > * {
        flex-grow: 1;
        &:nth-child(2) {
            flex-grow: 2;
        }
    }
`;

const CustomStyling = styled.div`
    ${theme.hvittPanel};
`;

const FjernPadding = styled.div`
    .ekspanderbartPanel__innhold {
        padding: 0;
    }
    .ekspanderbartPanel__hode:hover {
        ${theme.hover}
    }
`;

function EkspanderbartVarselPanel(props: Props) {
    const kanaler = props.varsel.meldingListe.map(melding => melding.kanal).join(', ');
    const varseltype = Varseltype[props.varsel.varselType];
    const tittel = (
        <TittelStyle>
            <Normaltekst>{props.varsel.mottattTidspunkt}</Normaltekst>
            <Normaltekst>{varseltype}</Normaltekst>
            <Normaltekst>{kanaler}</Normaltekst>
        </TittelStyle>
    );
    return (
        <FjernPadding>
            <CustomStyling>
                <EkspanderbartpanelBase heading={tittel} ariaTittel={props.varsel.varselType}>
                    <MeldingsListeKomponent meldingsliste={props.varsel.meldingListe} />
                </EkspanderbartpanelBase>
            </CustomStyling>
        </FjernPadding>
    );
}

export default EkspanderbartVarselPanel;
