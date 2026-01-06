import { useNavigate } from '@tanstack/react-router';
import { HoyreChevron } from 'nav-frontend-chevron';
import { guid } from 'nav-frontend-js-utils';
import * as React from 'react';
import { type ChangeEvent, type ReactNode, useRef } from 'react';
import { trackingEvents } from 'src/utils/analytics';
import styled, { css } from 'styled-components';
import type { Traad } from '../../../../../models/meldinger/meldinger';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { meldingerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { valgtMeldingKlasse } from './TraadListe';
import TraadSammendrag from './TraadSammendrag';

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
    ${(props) =>
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
    const id = useRef(guid());
    const navigate = useNavigate({ from: '/person/meldinger' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.onClick) {
            props.onClick(e);
            return;
        }
        navigate({
            search: { traadId: props.traad.traadId },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: {
                        fane: 'meldinger',
                        tekst: 'åpne melding'
                    }
                }
            }
        });
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
