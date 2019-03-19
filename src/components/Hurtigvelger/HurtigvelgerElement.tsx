import * as React from 'react';
import { Tekst } from './tekster';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import EtikettGrå from '../EtikettGrå';
import { datoVerbose } from '../../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import Informasjon from '../../svg/Informasjon';
import theme from '../../styles/personOversiktTheme';

interface Props {
    tekst: Tekst;
}

const ContainerStyle = styled.div`
    &:nth-child(odd) {
        background-color: lightgray;
    }
    position: relative;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

const OneLine = styled.div`
    display: flex;
    padding: 0.7rem;
    align-items: center;
    justify-content: space-between;
    svg {
        height: 2rem;
        width: 2rem;
        &:hover {
            opacity: 0.7;
        }
    }
`;

const Preview = styled.div`
    position: absolute;
    ${theme.animation.fadeIn};
    display: none;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    left: 2rem;
    width: 80%;
    margin-top: 2rem;
    background-color: white;
    box-shadow: 0 1rem 4rem 0 black;
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

const PreviewContainer = styled.div`
    &:hover,
    &:focus-within {
        .content {
            display: block;
        }
    }
    &:focus {
        ${theme.focus};
    }
`;

const KnappOgIkon = styled.div`
    display: flex;
    align-items: center;
    > * {
        margin-left: 0.5rem;
    }
`;

function HurtigvelgerElement(props: Props) {
    return (
        <ContainerStyle>
            <OneLine>
                <Undertittel>{props.tekst.tittel}</Undertittel>
                <KnappOgIkon>
                    <PreviewContainer tabIndex={0}>
                        <Informasjon />
                        <div className="visually-hidden">Vis hurtigsvar</div>
                        <Preview className="content">
                            <Undertittel>{props.tekst.tittel}</Undertittel>
                            <EtikettGrå>{datoVerbose(new Date()).sammensattMedKlokke}</EtikettGrå>
                            <Normaltekst>{props.tekst.tekst}</Normaltekst>
                            <Normaltekst>Hilsen Nav</Normaltekst>
                        </Preview>
                    </PreviewContainer>
                    <KnappBase type={'hoved'}>Send</KnappBase>
                </KnappOgIkon>
            </OneLine>
        </ContainerStyle>
    );
}

export default HurtigvelgerElement;
