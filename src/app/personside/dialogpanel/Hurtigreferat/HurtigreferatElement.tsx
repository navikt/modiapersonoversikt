import * as React from 'react';
import { Hurtigreferat } from './tekster';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import InformasjonSVG from '../../../../svg/InformasjonSVG';
import theme from '../../../../styles/personOversiktTheme';
import Preview from './Preview';
import { Element } from 'nav-frontend-typografi';

interface Props {
    tekst: Hurtigreferat;
    sendMelding: () => void;
    spinner: boolean;
}

const Style = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    flex-wrap: wrap;
    padding: 0.15rem 0.35rem;
    > * {
        flex-grow: 1;
        margin: 0.15rem;
    }
    &:nth-child(odd) {
        background-color: #dedede;
    }
    svg {
        height: 2rem;
        width: 2rem;
        &:hover {
            opacity: 0.7;
        }
    }
`;

const PreviewContainer = styled.div`
    &:not(:hover):not(:focus-within):not(:focus) {
        .content {
            ${theme.visuallyHidden};
        }
    }
    &:focus {
        ${theme.focus};
        border-radius: ${theme.borderRadius.layout};
    }
`;

const DropDown = styled.div`
    position: absolute;
    z-index: 1000;
    left: 10%;
    width: 80%;
    padding-top: 0.5rem;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
`;

const KnappOgIkon = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > *:last-child {
        margin-left: 0.5rem;
    }
`;

function HurtigreferatElement(props: Props) {
    return (
        <Style>
            <Element tag="h4">{props.tekst.tittel}</Element>
            <KnappOgIkon>
                <PreviewContainer tabIndex={0}>
                    <InformasjonSVG alt="Vis hurtigsvar" />
                    <DropDown className="content">
                        <Preview fritekst={props.tekst.fritekst} tittel="Samtalereferat / Telefon" />
                    </DropDown>
                </PreviewContainer>
                <KnappBase type="flat" onClick={props.sendMelding} spinner={props.spinner}>
                    Send<span className="sr-only"> hurtigreferat {props.tekst.tittel}</span>
                </KnappBase>
            </KnappOgIkon>
        </Style>
    );
}

export default HurtigreferatElement;
