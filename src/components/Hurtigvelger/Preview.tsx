import { datoVerbose } from '../../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EtikettGrå from '../EtikettGrå';
import { Tekst } from './tekster';

interface Props {
    tekst: Tekst;
}

const PreviewStyle = styled.div`
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    background-color: white;
    > * {
        margin-bottom: 0.5rem;
    }
    > *:last-child {
        > * {
            margin-top: 0.5rem;
        }
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
`;

function Preview(props: Props) {
    return (
        <PreviewStyle>
            <Undertittel tag="h3">{props.tekst.tittel}</Undertittel>
            <EtikettGrå>{datoVerbose(new Date()).sammensattMedKlokke}</EtikettGrå>
            <EtikettGrå>Samtalereferat / Telefon</EtikettGrå>
            <Normaltekst>{props.tekst.tekst}</Normaltekst>
            <Normaltekst>Hilsen Nav</Normaltekst>
        </PreviewStyle>
    );
}

export default Preview;
