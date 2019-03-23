import * as React from 'react';
import { Varselmelding } from '../../../../models/varsel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Bold } from '../../../../components/common-styled-components';

interface Props {
    melding: Varselmelding;
}

const KomponentStyle = styled.div`
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
`;

const RowStyle = styled.div`
    display: flex;
    align-items: flex-start;
    > * {
        flex-grow: 1;
        :last-child {
            flex-grow: 4;
        }
    }
`;

const MottakerInformasjonStyle = styled.div`
    color: ${theme.color.lenke};
`;

function MeldingsInnhold(props: Props) {
    return props.melding.kanal === 'EPOST' ? (
        <div>
            <Normaltekst>
                <Bold>{props.melding.epostemne}</Bold>
            </Normaltekst>
            <Normaltekst>{props.melding.innhold}</Normaltekst>
        </div>
    ) : (
        <Normaltekst>{props.melding.innhold}</Normaltekst>
    );
}

function Mottakerinformasjon(props: Props) {
    return props.melding.kanal === 'NAV.NO' ? null : props.melding.kanal === 'EPOST' ? (
        <Normaltekst>Epost: {props.melding.mottakerInformasjon}</Normaltekst>
    ) : (
        <Normaltekst>Tlf: {props.melding.mottakerInformasjon}</Normaltekst>
    );
}

function Meldingskomponent(props: Props) {
    return (
        <KomponentStyle>
            <RowStyle>
                <Normaltekst>
                    <Bold>{props.melding.kanal}</Bold>
                </Normaltekst>
                <MeldingsInnhold melding={props.melding} />
            </RowStyle>
            <RowStyle>
                <Normaltekst>{props.melding.utsendingsTidspunkt}</Normaltekst>
                <MottakerInformasjonStyle>
                    <Mottakerinformasjon melding={props.melding} />
                </MottakerInformasjonStyle>
            </RowStyle>
        </KomponentStyle>
    );
}

export default Meldingskomponent;
