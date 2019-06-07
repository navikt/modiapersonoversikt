import * as React from 'react';
import { Kanal, Varselmelding } from '../../../../../models/varsel';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Bold } from '../../../../../components/common-styled-components';
import { formatterDatoMedMaanedsnavn } from '../../../../../utils/dateUtils';

interface Props {
    melding: Varselmelding;
}

const Style = styled.li`
    padding: 0.7rem;
    display: flex;
    > *:first-child {
        flex: 0 0 15%;
    }
    > *:last-child {
        max-width: 30rem;
    }
`;

function MeldingsInnhold(props: Props) {
    switch (props.melding.kanal) {
        case Kanal.EPOST:
            return (
                <div>
                    <Normaltekst>
                        <Bold>{props.melding.epostemne}</Bold>
                    </Normaltekst>
                    <Normaltekst>{props.melding.innhold}</Normaltekst>
                </div>
            );
        default:
            return <Normaltekst>{props.melding.innhold}</Normaltekst>;
    }
}

function Mottakerinformasjon(props: Props) {
    switch (props.melding.kanal) {
        case Kanal.EPOST:
            return (
                <Normaltekst>
                    <Bold>Epost: {props.melding.mottakerInformasjon}</Bold>
                </Normaltekst>
            );
        case Kanal.SMS:
            return (
                <Normaltekst>
                    <Bold>Tlf: {props.melding.mottakerInformasjon}</Bold>
                </Normaltekst>
            );
        case Kanal.NAVNO:
        default:
            return null;
    }
}

function VarselDetaljerElement(props: Props) {
    return (
        <Style>
            <div>
                <Normaltekst>
                    <Bold>{props.melding.kanal}</Bold>
                </Normaltekst>
                <Normaltekst>{formatterDatoMedMaanedsnavn(props.melding.utsendingsTidspunkt)}</Normaltekst>
            </div>
            <div>
                <MeldingsInnhold melding={props.melding} />
                <Mottakerinformasjon melding={props.melding} />
            </div>
        </Style>
    );
}

export default VarselDetaljerElement;
