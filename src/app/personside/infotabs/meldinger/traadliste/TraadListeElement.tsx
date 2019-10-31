import * as React from 'react';
import { ChangeEvent, ReactNode, useRef } from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled, { css } from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../../dyplenker';
import { meldingerTest } from '../../dyplenkeTest/utils';
import { useHistory } from 'react-router';
import { HoyreChevron } from 'nav-frontend-chevron';
import TraadSammendrag from './TraadSammendrag';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    traad: Traad;
    erValgt: boolean;
    taFokusOnMount?: boolean;
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
`;

function TraadListeElement(props: Props) {
    const ref = React.createRef<HTMLInputElement>();
    const dyplenker = useInfotabsDyplenker();
    const id = useRef(guid());
    const history = useHistory();

    useOnMount(() => {
        if (props.taFokusOnMount) {
            ref.current && ref.current.focus();
        }
    });

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
                className={'sr-only ' + meldingerTest.melding}
                type="radio"
                name={props.listeId}
                value={props.traad.traadId}
                id={id.current}
                onChange={handleChange}
                checked={props.erValgt}
                ref={ref}
            />
            <StyledLabel htmlFor={id.current}>
                {props.tillegskomponent}
                <FlexGrow>
                    <TraadSammendrag traad={props.traad} />
                </FlexGrow>
                <ChevronStyling className="hover-animation">
                    <HoyreChevron stor={true} />
                </ChevronStyling>
            </StyledLabel>
        </StyledLi>
    );
}

export default React.memo(TraadListeElement);
