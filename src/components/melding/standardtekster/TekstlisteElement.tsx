import { HStack } from '@navikt/ds-react';
import {} from 'nav-frontend-tekstomrade';
import React, { useRef } from 'react';
import type * as StandardTekster from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { twMerge } from 'tailwind-merge';

interface Props {
    tekst: StandardTekster.Tekst;
    valgt: boolean;
    onChange: (value: string) => void;
    locale: StandardTekster.Locale;
    index: number;
}

function TekstListeElement(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [keyboardFocused, setKeyboardFocused] = React.useState(true);

    return (
        <li className="list-none m-1">
            <HStack
                className={twMerge(
                    'py-3 px-2 w-full  focus-within:bg-ax-bg-accent-moderate-pressed-a hover:bg-ax-bg-accent-moderate-hover rounded-sm',
                    keyboardFocused && 'focus-within:outline-2  focus-within:outline-ax-accent-800',
                    props.valgt && 'bg-ax-bg-accent-moderate-pressed'
                )}
                onClick={() => {
                    props.onChange(props.tekst.id);
                    if (!inputRef.current) return;
                    inputRef.current.focus();
                    setKeyboardFocused(false);
                }}
            >
                <input
                    ref={inputRef}
                    className="w-0"
                    type="radio"
                    name="tekstvalg"
                    id={props.tekst.id}
                    value={props.tekst.id}
                    onChange={() => {
                        props.onChange(props.tekst.id);
                        setKeyboardFocused(true);
                    }}
                    checked={props.valgt}
                />
                <label htmlFor={props.tekst.id}>
                    <span>{props.tekst.overskrift}</span>
                </label>
            </HStack>
        </li>
    );
}

export default React.memo(TekstListeElement);
