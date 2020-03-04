import * as React from 'react';
import { ChangeEvent, ReactNode, useRef } from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled, { css } from 'styled-components/macro';
import { pxToRem, theme } from '../../../../../styles/personOversiktTheme';
import { useInfotabsDyplenker } from '../../dyplenker';
import { meldingerTest } from '../../dyplenkeTest/utils';
import { useHistory } from 'react-router';
import { HoyreChevron } from 'nav-frontend-chevron';
import TraadSammendrag from './TraadSammendrag';
import { guid } from 'nav-frontend-js-utils';
import { valgtMeldingKlasse } from './TraadListe';

interface Props {
    traad: Traad;
    erValgt: boolean;
    onClick?: (event: React.ChangeEvent) => void;
    tillegskomponent?: ReactNode;
    listeId: string;
}

const StyledLabel = styled.label`
    padding: ${theme.margin.layout};
    display: flex;
    cursor: pointer;
`;

const FlexGrow = styled.div`
    flex-grow: 1;
`;

const StyledLi = styled.li<{ valgt: boolean }>`
    &:focus-within {
        ${theme.focusOverlay};
    }
    ${props =>
        props.valgt &&
        css`
            background-color: ${theme.color.kategori};
        `};
    .hover-animation {
        transition: transform 0.3s;
    }
    &:hover {
        ${theme.hover};
        .hover-animation {
            transform: translateX(0.5rem);
        }
    }
`;

const ChevronStyling = styled.div`
    align-self: center;
    .nav-frontend-chevron {
        width: ${pxToRem(25)};
    }
`;

function TraadListeElement(props: Props) {
    const dyplenker = useInfotabsDyplenker();
    const id = useRef(guid());
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.onClick) {
            props.onClick(e);
            return;
        }
        history.push(dyplenker.meldinger.link(props.traad));
    };

    return (
        <StyledLi valgt={props.erValgt}>
            <input
                className={`sr-only ${meldingerTest.melding} ${props.erValgt ? valgtMeldingKlasse : ''}  `}
                type="radio"
                name={props.listeId}
                value={props.traad.traadId}
                id={id.current}
                onChange={handleChange}
                checked={props.erValgt}
            />
            <StyledLabel htmlFor={id.current}>
                {props.tillegskomponent}
                <FlexGrow>
                    <TraadSammendrag traad={props.traad} />
                </FlexGrow>
                <ChevronStyling className="hover-animation">
                    <HoyreChevron />
                </ChevronStyling>
            </StyledLabel>
        </StyledLi>
    );
}

export default React.memo(TraadListeElement);
