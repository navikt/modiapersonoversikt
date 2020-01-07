import * as React from 'react';
import { Varsel as VarselModell } from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components/macro';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import Varsel from './Varsel';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import { Element } from 'nav-frontend-typografi';

interface Props {
    varsler: VarselModell[];
}

const Style = styled.article`
    padding: ${theme.margin.layout};
`;

const HeaderStyle = styled.div`
    ${theme.hvittPanel};
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 6rem 55% 1fr;
    grid-template-columns: 6rem minmax(35%, 55%) 1fr;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > * {
        padding: 0.7rem;
    }
    margin-bottom: 1rem;
`;

const ListStyle = styled.ol`
    > * {
        margin-top: 0.5rem;
    }
`;

function Varsler(props: Props) {
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt));
    return (
        <Style>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Varsler" />}
            <HeaderStyle>
                <Element>Dato</Element>
                <Element>Type</Element>
                <Element>Kanal</Element>
            </HeaderStyle>
            <ListStyle aria-label="Brukerens varsler">
                {sortertPåDato.map((varsel, index) => (
                    <Varsel key={index} varsel={varsel} />
                ))}
            </ListStyle>
        </Style>
    );
}

export default Varsler;
