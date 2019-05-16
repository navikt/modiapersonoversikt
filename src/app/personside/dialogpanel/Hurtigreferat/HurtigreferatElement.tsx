import * as React from 'react';
import { useState } from 'react';
import { Tekst } from './tekster';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import InformasjonSVG from '../../../../svg/InformasjonSVG';
import theme from '../../../../styles/personOversiktTheme';
import Preview from './Preview';
import { Undertittel } from 'nav-frontend-typografi';
import { useClickOutside } from '../../../../utils/customHooks';
import TemaGruppeValg from './TemaGruppevalg';

interface Props {
    tekst: Tekst;
    sendMelding: (tekst: string, temaGruppe: string) => void;
}

const ContainerStyle = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    flex-wrap: wrap;
    padding: 0.35rem;
    > * {
        flex-grow: 1;
        margin: 0.35rem;
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
    &:not(:hover):not(:focus-within) {
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
    const ref = React.createRef<HTMLDivElement>();
    const [visTemagruppeValg, setVisTemagruppeValg] = useState(false);
    const [sender, setSender] = useState(false);
    useClickOutside(ref, () => setVisTemagruppeValg(false));
    const handleSend = (temagruppe: string) => {
        setVisTemagruppeValg(false);
        setSender(true);
        const tekstMedTemagruppe = props.tekst.fritekst.replace('$TEMA$', temagruppe);
        props.sendMelding(tekstMedTemagruppe, temagruppe);
    };
    return (
        <ContainerStyle>
            <Undertittel>{props.tekst.tittel}</Undertittel>
            <KnappOgIkon>
                <PreviewContainer tabIndex={0}>
                    <InformasjonSVG alt="Vis hurtigsvar" />
                    <DropDown className="content">
                        <Preview fritekst={props.tekst.fritekst} />
                    </DropDown>
                </PreviewContainer>
                <KnappBase type={'hoved'} onClick={() => setVisTemagruppeValg(true)} spinner={sender}>
                    Send
                </KnappBase>
                {visTemagruppeValg && (
                    <div ref={ref}>
                        <TemaGruppeValg handleSend={handleSend} />
                    </div>
                )}
            </KnappOgIkon>
        </ContainerStyle>
    );
}

export default HurtigreferatElement;
