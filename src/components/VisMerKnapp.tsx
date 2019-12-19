import * as React from 'react';
import { pxToRem, theme } from '../styles/personOversiktTheme';
import styled, { css } from 'styled-components';
import { HoyreChevron } from 'nav-frontend-chevron';
import { RouteComponentProps, withRouter } from 'react-router';
import { isSelectingText } from '../utils/functionUtils';

const Wrapper = styled.div<{ valgt: boolean }>`
    position: relative;
    padding: ${theme.margin.layout};
    display: flex;
    align-items: center;
    cursor: pointer;
    ${props =>
        props.valgt &&
        css`
            background-color: ${theme.color.kategori};
        `}
    &:hover {
        ${theme.hover};
        > button:last-child {
            padding-left: 0.5rem;
        }
    }
    > *:first-child {
        flex-grow: 1;
    }
`;

const Knapp = styled.button`
    border: none;
    padding: 0;
    height: 2rem;
    width: 2rem;
    border-radius: ${theme.borderRadius.knapp};
    cursor: pointer;
    background-color: transparent;
    transition: padding-left 0.3s;
    .nav-frontend-chevron {
        width: ${pxToRem(25)};
    }
    &:focus {
        ${theme.focusOnRelativeParent};
    }
`;

interface Props extends RouteComponentProps {
    onClick?: (event: React.MouseEvent) => void;
    linkTo?: string;
    valgt: boolean;
    children: React.ReactNode;
    ariaDescription: string;
    className?: string;
}

function VisMerKnapp(props: Props) {
    const handleClick = (event: React.MouseEvent) => {
        if (isSelectingText()) {
            return;
        }
        if (props.onClick) {
            props.onClick(event);
        } else if (props.linkTo) {
            props.history.push(props.linkTo);
        } else {
            console.error('VisMerKnapp mangler onclick-funksjon eller router-path');
        }
    };

    return (
        <Wrapper valgt={props.valgt} onClick={handleClick} className={props.className}>
            <div>{props.children}</div>
            <Knapp onClick={props.onClick} aria-selected={props.valgt} aria-label={props.ariaDescription}>
                <HoyreChevron />
            </Knapp>
        </Wrapper>
    );
}

export default withRouter(VisMerKnapp);
