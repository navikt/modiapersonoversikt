import * as React from 'react';
import { Tekst } from './tekster';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import InformasjonSVG from '../../../../svg/InformasjonSVG';
import theme from '../../../../styles/personOversiktTheme';
import Preview from './Preview';
import { Undertittel } from 'nav-frontend-typografi';
import { isPosting, PostResource } from '../../../../rest/utils/postResource';
import { SendMeldingRequest } from '../../../../models/meldinger/meldinger';

interface Props {
    tekst: Tekst;
    send: () => void;
    spinner: boolean;
}

const ContainerStyle = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem;
    background-color: white;
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
    &:not(:hover):not(:focus-within) {
        .content {
            ${theme.visuallyHidden};
        }
    }
    &:focus {
        ${theme.focus};
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
    > * {
        margin-left: 0.5rem;
    }
`;

function HurtigreferatElement(props: Props) {
    return (
        <ContainerStyle>
            <Undertittel>{props.tekst.tittel}</Undertittel>
            <KnappOgIkon>
                <PreviewContainer tabIndex={0}>
                    <InformasjonSVG alt="Vis hurtigsvar" />
                    <DropDown className="content">
                        <Preview tekst={props.tekst} />
                    </DropDown>
                </PreviewContainer>
                <KnappBase type={'hoved'} onClick={props.send} spinner={props.spinner}>
                    Send
                </KnappBase>
            </KnappOgIkon>
        </ContainerStyle>
    );
}

export default HurtigreferatElement;
