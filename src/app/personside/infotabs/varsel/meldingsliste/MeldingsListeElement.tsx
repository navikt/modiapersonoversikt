import * as React from 'react';
import { Varselmelding } from '../../../../../models/varsel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Bold } from '../../../../../components/common-styled-components';

interface Props {
    melding: Varselmelding;
}

const ListeElementStyle = styled.li`
    padding: 1rem;
`;

const RowStyle = styled.div`
    display: flex;
    > * {
        &:last-child {
            flex-grow: 1;
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

function MeldingsListeElement(props: Props) {
    return (
        <ListeElementStyle>
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
        </ListeElementStyle>
    );
}

export default MeldingsListeElement;
