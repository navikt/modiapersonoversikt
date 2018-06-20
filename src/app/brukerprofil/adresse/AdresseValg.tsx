import * as React from 'react';

import Radio from 'nav-frontend-skjema/lib/radio';

import { Valg } from './AdresseForm';

interface AdresseValgProps {
    label: string;
    valg: Valg;
    onAdresseValgChange: (valg: Valg) => void;
    checked: boolean;
    children?: JSX.Element;
}

export function AdresseValg(props: AdresseValgProps) {
    const child = props.children ? props.children : <></>;
    return (
        <>
            <Radio
                label={props.label}
                name={props.valg.toString()}
                onChange={() => props.onAdresseValgChange(props.valg)}
                checked={props.checked}
            />
            {props.checked && child}
        </>
    );
}