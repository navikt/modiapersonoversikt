import * as React from 'react';
import styled from 'styled-components';

import Radio from 'nav-frontend-skjema/lib/radio';

import { Valg } from './AdresseForm';

interface AdresseValgProps {
    label: string;
    valg: Valg;
    onAdresseValgChange: (valg: Valg) => void;
    checked: boolean;
    children?: JSX.Element;
}

const Wrapper = styled.div`
  margin-top: 2em;
`;

export function AdresseValg(props: AdresseValgProps) {
    const child = props.children ? props.children : <></>;
    return (
        <Wrapper>
            <Radio
                label={props.label}
                name={props.valg.toString()}
                onChange={() => props.onAdresseValgChange(props.valg)}
                checked={props.checked}
            />
            {props.checked && child}
        </Wrapper>
    );
}