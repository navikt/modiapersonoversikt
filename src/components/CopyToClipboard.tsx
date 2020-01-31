import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import CopyIcon from '../svg/copyIcon';

interface Props {
    stringToCopy: string;
    ariaLabel: string;
}

const HiddenTextarea = styled.textarea`
    position: absolute;
    ${theme.visuallyHidden};
`;

const StyledButton = styled.button`
    ${theme.resetButtonStyle};
    border-radius: 0.2rem;
    svg {
        width: 1rem;
        color: #005b82;
        stroke-width: 1.4;
    }
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.2);
    }
    &:active {
        opacity: 0.5;
    }
    &:focus {
        ${theme.focus};
    }
`;

function CopyToClipboard(props: Props) {
    const copyRef = useRef<HTMLTextAreaElement>(null);

    const copyToClipboard = (event: React.MouseEvent) => {
        event.stopPropagation();
        copyRef.current?.select();
        document.execCommand('copy');
    };

    return (
        <span>
            <StyledButton onClick={copyToClipboard}>
                <CopyIcon />
                <span className="sr-only">{props.ariaLabel}</span>
            </StyledButton>
            <HiddenTextarea aria-hidden={true} ref={copyRef}>
                {props.stringToCopy}
            </HiddenTextarea>
        </span>
    );
}

export default CopyToClipboard;
