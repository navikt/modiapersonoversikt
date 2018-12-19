import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold } from './common-styled-components';
import ShowThenHide from './ShowThenHide';

interface Props {
    children: string;
}

const Style = styled.div`
  position: fixed;
  top: 5rem;
  left: 50vw;
  transform: translateX(-50%);
  background-color: #333;
  border: .2rem white solid;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  color: white;
  box-shadow: 0 .2rem .5rem rgba(0, 0, 0, 0.5);
  opacity: .8;
  z-index: 1000;
`;

function ToolTip(props: Props) {
    return (
        <ShowThenHide>
            <Style>
                <Normaltekst><Bold>{props.children || ''}</Bold></Normaltekst>
            </Style>
        </ShowThenHide>
    );
}

export default ToolTip;
