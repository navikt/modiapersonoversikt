import * as React from 'react';
import { Kanal, Varselmelding } from '../../../../../models/varsel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { formatterDatoMedMaanedsnavn } from '../../../../../utils/dateUtils';

interface Props {
    melding: Varselmelding;
}

const Style = styled.li`
    padding: 0.7rem;
    display: flex;
    > *:first-child {
        flex: 0 0 20%;
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
                    <Element>{props.melding.epostemne}</Element>
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
            return <Element>Epost: {props.melding.mottakerInformasjon}</Element>;
        case Kanal.SMS:
            return <Element>Tlf: {props.melding.mottakerInformasjon}</Element>;
        case Kanal.NAVNO:
        default:
            return null;
    }
}

function VarselMelding(props: Props) {
    return (
        <Style aria-label={props.melding.kanal}>
            <div>
                <Element>{props.melding.kanal}</Element>
                <Normaltekst>{formatterDatoMedMaanedsnavn(props.melding.utsendingsTidspunkt)}</Normaltekst>
            </div>
            <div>
                <MeldingsInnhold melding={props.melding} />
                <Mottakerinformasjon melding={props.melding} />
            </div>
        </Style>
    );
}

export default VarselMelding;
