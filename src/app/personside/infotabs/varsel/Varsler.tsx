import * as React from 'react';
import { Varsel as VarselModell } from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import Varsel from './Varsel';

interface Props {
    varsler: VarselModell[];
}

export enum VarslerLabelIds {
    Dato = 'VarselDatoLabel',
    Type = 'VarselTypeLabel',
    Kanal = 'VarselKanalLabel'
}

const HeaderStyle = styled.div`
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 20% 55% 1fr;
    grid-template-columns: 20% 55% 1fr;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > *:nth-child(4) {
        -ms-grid-column: 4;
    }
    font-weight: bold;
    > * {
        padding: 0.7rem 0.7rem 0.3rem;
    }
`;

const ListStyle = styled.ol`
    > * {
        margin-top: 0.5rem;
    }
`;

function Varsler(props: Props) {
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));
    return (
        <article>
            <VisuallyHiddenAutoFokusHeader tittel="Varsler" />
            <HeaderStyle>
                <p>Dato</p>
                <p>Type</p>
                <p>Kanal</p>
            </HeaderStyle>
            <ListStyle>
                {sortertPåDato.map((varsel, index) => (
                    <Varsel key={index} varsel={varsel} />
                ))}
            </ListStyle>
        </article>
    );
}

export default Varsler;
