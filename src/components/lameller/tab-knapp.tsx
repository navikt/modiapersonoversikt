import * as React from 'react';
import styled from 'styled-components';
import { globalStyles } from '../styles/global-styles';

interface TabKnappProps {
    valgt: boolean;
    onClick: Function;
    children: React.ReactChildren;
}

function TabKnapp(props: TabKnappProps) {

    const Knapp = styled.button`
        width: 100%;
        box-sizing: border-box;
        background-color: transparent;
        padding: 0.5em;
        margin-top: 0.5em;
        border: none;
        border-bottom: 4px solid ${props.valgt ? globalStyles.color.selectedLink : 'white'};
        text-align: center;
        cursor: pointer;
        transition: 0.5s;
        font-weight: bold;
        &:hover {
          border-bottom: 4px solid ${globalStyles.color.hoverLink};
        }
    `;

    return (
        <Knapp onClick={() => props.onClick()}>
            {props.children}
        </Knapp>
    );
}

export default TabKnapp;
