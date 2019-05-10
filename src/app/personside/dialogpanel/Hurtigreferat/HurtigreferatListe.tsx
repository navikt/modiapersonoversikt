import * as React from 'react';
import { Tekst, tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import styled from 'styled-components';

interface Props {
    send: (tekst: Tekst) => void;
}

const MarginBottom = styled.div`
    margin-bottom: 6rem;
`;

function HurtigreferatListe(props: Props) {
    return (
        <ul>
            {tekster.map(tekst => (
                <HurtigreferatElement key={tekst.tittel} tekst={tekst} sendTekst={() => props.send(tekst)} />
            ))}
            <MarginBottom />
        </ul>
    );
}

export default HurtigreferatListe;
