import styled from 'styled-components';

interface Props {
    valgt: boolean;
}

const TabKnapp = styled<Props, 'button'>('button')`
        width: 100%;
        box-sizing: border-box;
        background-color: transparent;
        padding: 0.5em;
        margin-top: 0.5em;
        border: none;
        border-bottom: 4px solid ${props => props.valgt ? props.theme.color.selectedLink : 'transparent'};
        text-align: center;
        cursor: pointer;
        transition: 0.5s;
        font-weight: bold;
        &:hover {
          border-bottom: 4px solid ${props => props.theme.color.hoverLink};
        }
    `;

export default TabKnapp;
