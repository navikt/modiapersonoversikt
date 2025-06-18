import { HStack } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import type * as StandardTekster from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';
import { twMerge } from 'tailwind-merge';

interface Props {
    tekst: StandardTekster.Tekst;
    valgt: boolean;
    onChange: (value: string) => void;
}

function TekstListeElement({ tekst, valgt, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [keyboardFocused, setKeyboardFocused] = useState(true);

    return (
        <li className="list-none m-1">
            <HStack
                className={twMerge(
                    'p-1.5 w-full focus-within:bg-ax-bg-accent-moderate-pressed-a hover:bg-ax-bg-accent-moderate-hover rounded-sm',
                    keyboardFocused && 'focus-within:outline-2  focus-within:outline-ax-accent-800',
                    valgt && 'bg-ax-bg-accent-moderate-pressed'
                )}
                onClick={() => {
                    onChange(tekst.id);
                    if (!inputRef.current) return;
                    inputRef.current.focus();
                    setKeyboardFocused(false);
                }}
            >
                <input
                    ref={inputRef}
                    className="w-0 h-0"
                    type="radio"
                    name="tekstvalg"
                    id={tekst.id}
                    value={tekst.id}
                    onChange={() => {
                        onChange(tekst.id);
                        setKeyboardFocused(true);
                    }}
                    checked={valgt}
                />
                <label htmlFor={tekst.id}>
                    <span>{tekst.overskrift}</span>
                </label>
            </HStack>
        </li>
    );
}

export default TekstListeElement;
