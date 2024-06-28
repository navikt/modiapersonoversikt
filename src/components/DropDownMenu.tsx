import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import theme from '../styles/personOversiktTheme';
import NavFrontendChevron from 'nav-frontend-chevron';

const DropDownContainerStyle = styled.div`
    position: relative;
    &:not(:hover):not(:focus-within) {
        .content {
            ${theme.visuallyHidden};
        }
    }
`;

const Header = styled.div`
    display: inline-flex;
    align-items: center;
    &:focus {
        ${theme.focus};
    }
    cursor: pointer;
`;

const ChevronStyling = styled.div`
    margin-top: 0.2rem;
    margin-left: 0.3rem;
`;

const DropDownContent = styled.div`
    z-index: 1000;
    position: absolute;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
    border-radius: ${theme.borderRadius.layout};
    overflow-y: auto;
    max-height: 70vh;
`;

function DropDownMenu({
    header,
    children,
    chevron = true
}: {
    header: ReactNode;
    children: ReactNode;
    chevron?: boolean;
}) {
    return (
        <DropDownContainerStyle>
            <Header tabIndex={0}>
                {header}
                {chevron && (
                    <ChevronStyling>
                        <NavFrontendChevron type="ned" />
                    </ChevronStyling>
                )}
            </Header>
            <DropDownContent className="content">{children}</DropDownContent>
        </DropDownContainerStyle>
    );
}

export default DropDownMenu;
