import * as React from 'react';
import { ITekst } from './tekster';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import EtikettGrå from '../EtikettGrå';
import { datoVerbose } from '../../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';

interface Props {
    tekst: ITekst;
}

const ContainerStyle = styled.div`
    &:nth-child(odd) {
        background-color: lightgray;
    }
    position: relative;
    &:hover {
        .content {
            display: block;
        }
    }
`;

const OneLine = styled.div`
    display: flex;
    padding: 0.4rem;
    align-items: center;
    justify-content: space-between;
`;

const Preview = styled.div`
    position: absolute;
    display: none;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    margin-left: 8rem;
    background-color: white;
    box-shadow: 0 1rem 2rem 0 gray;
    z-index: 1000;
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

function HurtigvelgerElement(props: Props) {
    return (
        <ContainerStyle>
            <OneLine>
                <Undertittel>{props.tekst.tittel}</Undertittel>
                <KnappBase type={'hoved'}>Send</KnappBase>
            </OneLine>
            <Preview className="content">
                <Undertittel>{props.tekst.tittel}</Undertittel>
                <EtikettGrå>{datoVerbose(new Date()).sammensattMedKlokke}</EtikettGrå>
                <Normaltekst>{props.tekst.tekst}</Normaltekst>
                <Normaltekst>Hilsen Nav</Normaltekst>
                <div>
                    <KnappBase type={'hoved'}>Send</KnappBase>
                    <KnappBase type={'hoved'}>Kopier</KnappBase>
                </div>
            </Preview>
        </ContainerStyle>
    );
}

export default HurtigvelgerElement;
