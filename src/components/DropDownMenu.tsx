import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import theme from '../styles/personOversiktTheme';
import NavFrontendChevron from 'nav-frontend-chevron';

const DropDownContainerStyle = styled.div`
    position: relative;
    display: inline-block;
    .dropdown {
        display: none;
    }
    &:hover,
    &:focus-within {
        .dropdown {
            display: block;
        }
    }
    cursor: pointer;
    align-self: flex-start;
    > *:first-child {
        padding: 0.2rem;
    }
`;

const OneLine = styled.div`
    display: inline-flex;
    align-items: center;
    > *:last-child {
        margin-top: 0.2rem;
        margin-left: 0.3rem;
    }
    &:focus {
        ${theme.focus}
    }
`;

const ScrollBar = styled.div`
    overflow-y: auto;
    max-height: 70vh;
`;

const DropDownContent = styled.div`
    z-index: 1000;
    position: absolute;
    box-shadow: 0 0.5rem 4rem rgba(0, 0, 0, 0.5);
    border-radius: ${theme.borderRadius.layout};
    overflow: hidden;
`;

function DropDownMenu(props: { header: ReactNode; children: ReactNode }) {
    return (
        <DropDownContainerStyle aria-haspopup={true}>
            <OneLine tabIndex={0}>
                {props.header}
                <NavFrontendChevron type="ned" />
            </OneLine>
            <DropDownContent>
                <ScrollBar className="dropdown" aria-label="dropdown menu">
                    {props.children}
                </ScrollBar>
            </DropDownContent>
        </DropDownContainerStyle>
    );
}

export default DropDownMenu;
