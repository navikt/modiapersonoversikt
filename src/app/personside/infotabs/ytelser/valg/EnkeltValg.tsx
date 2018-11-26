import * as React from 'react';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface Props {
    children: string;
    valgt: boolean;
    onClick: () => void;
    sistEndret?: Date;
}

const Style = styled.li`
  display: flex;
  flex-direction: column;
  .order_first {
    order: -1;
  }
`;

function EnkeltValg(props: Props) {
    return (
        <VisMerKnapp onClick={props.onClick} valgt={props.valgt}>
            <Style>
                <Element tag={'h3'}>{props.children}</Element>
                <Normaltekst className="order_first">01.01.0001</Normaltekst>
            </Style>
        </VisMerKnapp>
    );
}

export default EnkeltValg;
